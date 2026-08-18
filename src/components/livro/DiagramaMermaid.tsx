import { useEffect, useId, useState } from 'react'

let mermaidInicializado = false
let sequenciaDeRender = 0

type EstadoDiagrama =
  | { tipo: 'carregando' }
  | { tipo: 'pronto'; svg: string }
  | { tipo: 'erro'; mensagem: string }

export function DiagramaMermaid({ codigo }: { codigo: string }) {
  const idReact = useId().replace(/:/g, '')
  const [estado, setEstado] = useState<EstadoDiagrama>({ tipo: 'carregando' })

  useEffect(() => {
    let cancelado = false

    async function renderizar() {
      try {
        const { default: mermaid } = await import('mermaid')

        if (!mermaidInicializado) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            // O conteúdo é autorado e versionado no próprio repositório. `loose`
            // preserva os <br/> usados nos rótulos dos diagramas do livro.
            securityLevel: 'loose',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            themeVariables: {
              background: '#0b0e17',
              primaryColor: '#19142e',
              primaryTextColor: '#e2e8f0',
              primaryBorderColor: '#8b5cf6',
              lineColor: '#64748b',
              secondaryColor: '#0f172a',
              tertiaryColor: '#07151c',
              clusterBkg: '#0b0e17',
              clusterBorder: '#334155',
              edgeLabelBackground: '#0b0e17',
              fontSize: '15px',
            },
            flowchart: { curve: 'basis', htmlLabels: true },
          })
          mermaidInicializado = true
        }

        const id = `livro-mermaid-${idReact}-${++sequenciaDeRender}`
        const { svg } = await mermaid.render(id, codigo)
        if (!cancelado) {
          setEstado({ tipo: 'pronto', svg })
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

  return (
    <figure
      className="diagrama-mermaid my-8 overflow-x-auto rounded-2xl border border-white/10 bg-ink-soft p-4 sm:p-6"
      tabIndex={0}
      aria-label="Diagrama do capítulo"
    >
      <div dangerouslySetInnerHTML={{ __html: estado.svg }} />
    </figure>
  )
}
