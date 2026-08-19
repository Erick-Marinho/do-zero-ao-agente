import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as EventoDePonteiro,
  type ReactNode,
} from 'react'

let mermaidInicializado = false
let sequenciaDeRender = 0

const FONTE_DO_DIAGRAMA = 'ui-sans-serif, system-ui, sans-serif'
const ZOOM_MINIMO = 0.25
const ZOOM_MAXIMO = 4

type Diagrama = { id: string; svg: string; largura: number; altura: number }

type EstadoDiagrama =
  | { tipo: 'carregando' }
  | { tipo: 'pronto'; diagrama: Diagrama }
  | { tipo: 'erro'; mensagem: string }

/**
 * O Mermaid publica as medidas reais do desenho no `viewBox`. Guardá-las
 * permite exibir o diagrama no tamanho em que ele foi calculado, em vez de
 * espremê-lo na largura da coluna de leitura — era esse encolhimento que
 * deixava os rótulos ilegíveis.
 */
function medirSvg(svg: string) {
  const medidas = /viewBox="[-\d.]+ [-\d.]+ ([\d.]+) ([\d.]+)"/.exec(svg)
  return {
    largura: Number(medidas?.[1]) || 640,
    altura: Number(medidas?.[2]) || 360,
  }
}

function limitarZoom(valor: number) {
  return Math.min(ZOOM_MAXIMO, Math.max(ZOOM_MINIMO, valor))
}

function seCruzam(a: DOMRect, b: DOMRect) {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
}

/** Uma autotransição começa e termina dentro da mesma forma. */
function ehAutotransicao(caminho: SVGPathElement, nos: DOMRect[]) {
  const matriz = caminho.getScreenCTM()
  if (!matriz) return false

  const pontas = [0, caminho.getTotalLength()].map((distancia) =>
    caminho.getPointAtLength(distancia).matrixTransform(matriz),
  )
  const folga = 2
  return nos.some((no) =>
    pontas.every(
      (ponta) =>
        ponta.x >= no.left - folga &&
        ponta.x <= no.right + folga &&
        ponta.y >= no.top - folga &&
        ponta.y <= no.bottom + folga,
    ),
  )
}

/**
 * O Mermaid desenha o laço de uma autotransição depois do layout e não reserva
 * espaço para o rótulo dele, que acaba caindo por cima do rótulo da transição
 * vizinha. Com o SVG já na página dá para medir os dois e descer o rótulo do
 * laço até ele ficar livre. Encurtar o texto não resolve: rótulos menores
 * encolhem o desenho inteiro na mesma proporção.
 */
function afastarRotuloDeAutotransicao(svg: SVGSVGElement) {
  const escala = svg.getBoundingClientRect().width / (svg.viewBox.baseVal.width || 1)
  if (!escala) return

  const nos = [...svg.querySelectorAll('g.node')].map((no) => no.getBoundingClientRect())
  const rotulos = [...svg.querySelectorAll<SVGGElement>('g.edgeLabel')]
  const idDoRotulo = (rotulo: SVGGElement) =>
    rotulo.querySelector('[data-id]')?.getAttribute('data-id')

  const lacos = [...svg.querySelectorAll<SVGPathElement>('g.edgePaths path')]
    .filter((caminho) => ehAutotransicao(caminho, nos))
    .map((caminho) => rotulos.find((rotulo) => idDoRotulo(rotulo) === caminho.dataset.id))
    .filter((rotulo) => rotulo !== undefined)

  for (const laco of lacos) {
    // A posição original vem do atributo `transform`, que a propriedade CSS
    // substitui por inteiro — por isso ela precisa ser somada, não trocada.
    const origem = laco.transform.baseVal.consolidate()?.matrix
    if (!origem) continue

    const vizinhos = rotulos.filter((outro) => outro !== laco)
    let descida = 0

    for (let tentativa = 0; tentativa < 4; tentativa++) {
      const caixa = laco.getBoundingClientRect()
      const invasores = vizinhos
        .map((vizinho) => vizinho.getBoundingClientRect())
        .filter((outra) => outra.width > 0 && seCruzam(caixa, outra))
      if (invasores.length === 0) break

      const base = Math.max(...invasores.map((outra) => outra.bottom))
      descida += (base - caixa.top) / escala + 6
      laco.style.transform = `translate(${origem.e}px, ${origem.f + descida}px)`
    }
  }
}

function BotaoDaBarra({
  children,
  rotulo,
  aoClicar,
}: {
  children: ReactNode
  rotulo: string
  aoClicar: () => void
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={rotulo}
      title={rotulo}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-100"
    >
      {children}
    </button>
  )
}

/**
 * Visor em tela cheia: o diagrama continua no tamanho natural, mas com zoom e
 * arrasto para leitura de perto. Os identificadores do SVG são renomeados
 * porque o original permanece na página e ids repetidos quebrariam as setas.
 */
function VisorDeDiagrama({ diagrama, aoFechar }: { diagrama: Diagrama; aoFechar: () => void }) {
  const refDialogo = useRef<HTMLDialogElement>(null)
  const refArea = useRef<HTMLDivElement>(null)
  const arrasto = useRef<{ x: number; y: number; esquerda: number; topo: number } | null>(null)
  const [zoom, setZoom] = useState(1)

  const svgAmpliado = useMemo(
    () => diagrama.svg.replaceAll(diagrama.id, `${diagrama.id}-visor`),
    [diagrama.id, diagrama.svg],
  )

  const ajustarNaTela = useCallback(() => {
    const area = refArea.current
    if (!area) return
    const folga = 48
    const escala = Math.min(
      1,
      (area.clientWidth - folga) / diagrama.largura,
      (area.clientHeight - folga) / diagrama.altura,
    )
    setZoom(limitarZoom(escala))
  }, [diagrama.altura, diagrama.largura])

  useEffect(() => {
    refDialogo.current?.showModal()
    ajustarNaTela()
  }, [ajustarNaTela])

  function aoPressionar(evento: EventoDePonteiro<HTMLDivElement>) {
    const area = refArea.current
    // No toque, a rolagem nativa já faz o trabalho de arrastar.
    if (!area || evento.pointerType === 'touch') return
    arrasto.current = {
      x: evento.clientX,
      y: evento.clientY,
      esquerda: area.scrollLeft,
      topo: area.scrollTop,
    }
    area.setPointerCapture(evento.pointerId)
  }

  function aoArrastar(evento: EventoDePonteiro<HTMLDivElement>) {
    const area = refArea.current
    const inicio = arrasto.current
    if (!area || !inicio) return
    area.scrollLeft = inicio.esquerda - (evento.clientX - inicio.x)
    area.scrollTop = inicio.topo - (evento.clientY - inicio.y)
  }

  function aoSoltar(evento: EventoDePonteiro<HTMLDivElement>) {
    arrasto.current = null
    refArea.current?.releasePointerCapture(evento.pointerId)
  }

  return (
    <dialog
      ref={refDialogo}
      onClose={aoFechar}
      onClick={(evento) => {
        if (evento.target === refDialogo.current) aoFechar()
      }}
      onKeyDown={(evento) => {
        if (evento.key === '+' || evento.key === '=') setZoom((atual) => limitarZoom(atual * 1.25))
        if (evento.key === '-') setZoom((atual) => limitarZoom(atual / 1.25))
        if (evento.key === '0') ajustarNaTela()
      }}
      aria-label="Diagrama ampliado"
      className="h-dvh max-h-none w-screen max-w-none border-0 bg-ink p-0 text-slate-300 backdrop:bg-black/80"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <BotaoDaBarra rotulo="Reduzir" aoClicar={() => setZoom((z) => limitarZoom(z / 1.25))}>
              −
            </BotaoDaBarra>
            <span className="w-14 text-center font-mono text-xs text-slate-500">
              {Math.round(zoom * 100)}%
            </span>
            <BotaoDaBarra rotulo="Ampliar" aoClicar={() => setZoom((z) => limitarZoom(z * 1.25))}>
              +
            </BotaoDaBarra>
            <BotaoDaBarra rotulo="Ajustar à tela" aoClicar={ajustarNaTela}>
              Ajustar
            </BotaoDaBarra>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-600 sm:inline">
              arraste para navegar · Esc fecha
            </span>
            <BotaoDaBarra rotulo="Fechar diagrama ampliado" aoClicar={aoFechar}>
              Fechar
            </BotaoDaBarra>
          </div>
        </div>

        <div
          ref={refArea}
          onPointerDown={aoPressionar}
          onPointerMove={aoArrastar}
          onPointerUp={aoSoltar}
          onPointerCancel={aoSoltar}
          className="flex-1 cursor-grab overflow-auto p-6 active:cursor-grabbing"
        >
          {/* `min-w-max` impede que a centralização corte a lateral esquerda
              quando o desenho é maior do que a área visível. */}
          <div className="flex min-h-full min-w-max items-center justify-center">
            <div
              className="visor-diagrama"
              style={{ width: diagrama.largura * zoom, height: diagrama.altura * zoom }}
              dangerouslySetInnerHTML={{ __html: svgAmpliado }}
            />
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function DiagramaMermaid({ codigo }: { codigo: string }) {
  const idReact = useId().replace(/:/g, '')
  const [estado, setEstado] = useState<EstadoDiagrama>({ tipo: 'carregando' })
  const [ampliado, setAmpliado] = useState<Diagrama | null>(null)
  const [precisaRolar, setPrecisaRolar] = useState(false)
  const refRolagem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelado = false

    async function renderizar() {
      try {
        const { default: mermaid } = await import('mermaid')

        if (!mermaidInicializado) {
          mermaid.initialize({
            startOnLoad: false,
            // O tema `base` é o único que respeita as variáveis abaixo; o tema
            // `dark` ignora as cores e devolve o cinza padrão do Mermaid.
            theme: 'base',
            // O conteúdo é autorado e versionado no próprio repositório. `loose`
            // preserva os <br/> usados nos rótulos dos diagramas do livro.
            securityLevel: 'loose',
            fontFamily: FONTE_DO_DIAGRAMA,
            themeVariables: {
              darkMode: true,
              background: '#0b0e17',
              fontFamily: FONTE_DO_DIAGRAMA,
              fontSize: '16px',
              primaryColor: '#181435',
              primaryTextColor: '#e9edf5',
              primaryBorderColor: '#8b5cf6',
              secondaryColor: '#101a2e',
              secondaryTextColor: '#e9edf5',
              secondaryBorderColor: '#38bdf8',
              tertiaryColor: '#101527',
              tertiaryTextColor: '#e9edf5',
              tertiaryBorderColor: '#475569',
              mainBkg: '#181435',
              nodeBorder: '#8b5cf6',
              nodeTextColor: '#e9edf5',
              textColor: '#dbe3ef',
              titleColor: '#f1f5f9',
              lineColor: '#94a3b8',
              edgeLabelBackground: '#0b0e17',
              clusterBkg: '#0a0d18',
              clusterBorder: '#3d3866',
              // Estados e quadrantes usam a mesma família de tons do site.
              transitionColor: '#94a3b8',
              transitionLabelColor: '#dbe3ef',
              stateBkg: '#181435',
              // Sem esta variável o Mermaid pinta o rótulo do estado com a cor
              // de fundo do próprio estado — texto invisível dentro da caixa.
              stateLabelColor: '#e9edf5',
              altBackground: '#101527',
              compositeBackground: '#0a0d18',
              compositeTitleBackground: '#0a0d18',
              compositeBorder: '#3d3866',
              innerEndBackground: '#8b5cf6',
              specialStateColor: '#c4b5fd',
              quadrant1Fill: '#161331',
              quadrant2Fill: '#12172c',
              quadrant3Fill: '#0d1122',
              quadrant4Fill: '#141130',
              quadrant1TextFill: '#e9edf5',
              quadrant2TextFill: '#e9edf5',
              quadrant3TextFill: '#e9edf5',
              quadrant4TextFill: '#e9edf5',
              quadrantPointFill: '#c4b5fd',
              quadrantPointTextFill: '#f1f5f9',
              quadrantXAxisTextFill: '#a5b4cf',
              quadrantYAxisTextFill: '#a5b4cf',
              quadrantInternalBorderStrokeFill: '#3d3866',
              quadrantExternalBorderStrokeFill: '#6d5bb5',
              quadrantTitleFill: '#f1f5f9',
            },
            // `useMaxWidth: false` evita que o SVG seja reduzido para caber na
            // coluna; o tamanho de leitura passa a ser controlado no CSS.
            flowchart: {
              curve: 'basis',
              htmlLabels: true,
              useMaxWidth: false,
              diagramPadding: 12,
              nodeSpacing: 46,
              rankSpacing: 52,
              padding: 16,
            },
            state: { useMaxWidth: false, padding: 12 },
            journey: {
              useMaxWidth: false,
              // Caixas mais largas e mais altas: com o padrão (150 × 50) os
              // rótulos de duas linhas vazavam para fora da tarefa.
              width: 190,
              height: 64,
              taskFontSize: 14,
              taskFontFamily: FONTE_DO_DIAGRAMA,
              taskMargin: 40,
              titleFontFamily: FONTE_DO_DIAGRAMA,
              titleFontSize: '3ex',
              titleColor: '#f1f5f9',
            },
            quadrantChart: {
              useMaxWidth: false,
              chartWidth: 620,
              chartHeight: 560,
              titleFontSize: 18,
              quadrantLabelFontSize: 15,
              xAxisLabelFontSize: 14,
              yAxisLabelFontSize: 14,
              pointLabelFontSize: 13,
              pointRadius: 6,
            },
          })
          mermaidInicializado = true
        }

        const id = `livro-mermaid-${idReact}-${++sequenciaDeRender}`
        const { svg } = await mermaid.render(id, codigo)
        if (!cancelado) {
          setEstado({ tipo: 'pronto', diagrama: { id, svg, ...medirSvg(svg) } })
          requestAnimationFrame(() => {
            requestAnimationFrame(() => window.dispatchEvent(new Event('livro:layout-atualizado')))
          })
        }
      } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : 'Não foi possível renderizar.'
        if (!cancelado) setEstado({ tipo: 'erro', mensagem })
      }
    }

    setEstado({ tipo: 'carregando' })
    void renderizar()

    return () => {
      cancelado = true
    }
  }, [codigo, idReact])

  useEffect(() => {
    if (estado.tipo !== 'pronto') return
    const svg = refRolagem.current?.querySelector('svg')
    if (svg) afastarRotuloDeAutotransicao(svg)
  }, [estado])

  // O aviso de arrasto só aparece quando o desenho realmente não cabe.
  useEffect(() => {
    const area = refRolagem.current
    if (estado.tipo !== 'pronto' || !area) return

    function conferirTransbordo() {
      if (area) setPrecisaRolar(area.scrollWidth - area.clientWidth > 4)
    }

    conferirTransbordo()
    const observador = new ResizeObserver(conferirTransbordo)
    observador.observe(area)
    return () => observador.disconnect()
  }, [estado])

  if (estado.tipo === 'carregando') {
    return (
      <div className="my-8 flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-ink-soft text-sm text-slate-500">
        Desenhando diagrama…
      </div>
    )
  }

  if (estado.tipo === 'erro') {
    return (
      <details className="my-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
        <summary className="cursor-pointer text-sm font-medium text-rose-300">
          O diagrama não pôde ser renderizado
        </summary>
        <p className="mt-3 text-sm text-rose-200/70">{estado.mensagem}</p>
        <pre className="mt-4 overflow-x-auto text-xs text-slate-400">
          <code>{codigo}</code>
        </pre>
      </details>
    )
  }

  const { diagrama } = estado

  return (
    <>
      <figure
        className="diagrama-mermaid group relative my-8 rounded-2xl border border-white/10 bg-ink-soft"
        aria-label="Diagrama do capítulo"
      >
        <div
          ref={refRolagem}
          tabIndex={0}
          style={{ '--largura-natural': `${diagrama.largura}px` } as CSSProperties}
          className="overflow-x-auto rounded-2xl p-4 sm:p-6"
          dangerouslySetInnerHTML={{ __html: diagrama.svg }}
        />

        <button
          type="button"
          onClick={() => {
            const svg = refRolagem.current?.querySelector('svg')
            setAmpliado(svg ? { ...diagrama, svg: svg.outerHTML } : diagrama)
          }}
          className="absolute top-3 right-3 rounded-lg border border-white/10 bg-ink/80 px-2.5 py-1 text-xs font-medium text-slate-400 backdrop-blur transition-colors hover:border-violet-400/40 hover:text-violet-200"
        >
          Ampliar
        </button>

        {precisaRolar && (
          <span className="pointer-events-none absolute bottom-3 left-4 rounded-lg bg-ink/80 px-2 py-1 text-[0.7rem] text-slate-500 backdrop-blur">
            arraste na horizontal para ver o diagrama inteiro
          </span>
        )}
      </figure>

      {ampliado && <VisorDeDiagrama diagrama={ampliado} aoFechar={() => setAmpliado(null)} />}
    </>
  )
}
