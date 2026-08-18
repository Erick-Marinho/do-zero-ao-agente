import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { NavegacaoCapitulo } from '../components/livro/NavegacaoCapitulo'
import { RenderizadorMarkdown } from '../components/livro/RenderizadorMarkdown'
import { SumarioLivro } from '../components/livro/SumarioLivro'
import { site } from '../data/conteudo'
import {
  carregarCapitulo,
  encontrarCapitulo,
  vizinhosDoCapitulo,
  type CapituloLivro,
} from '../data/livro'
import { NaoEncontrada } from './NaoEncontrada'

type EstadoConteudo =
  | { tipo: 'carregando' }
  | { tipo: 'pronto'; markdown: string }
  | { tipo: 'erro' }

function CarregandoCapitulo() {
  return (
    <div className="animate-pulse" aria-label="Carregando capítulo">
      <div className="h-4 w-28 rounded bg-white/5" />
      <div className="mt-8 h-10 w-4/5 rounded bg-white/5" />
      <div className="mt-5 h-4 w-full rounded bg-white/5" />
      <div className="mt-3 h-4 w-11/12 rounded bg-white/5" />
      <div className="mt-12 h-64 rounded-2xl bg-white/5" />
    </div>
  )
}

function CabecalhoCapitulo({ capitulo }: { capitulo: CapituloLivro }) {
  return (
    <header className="mb-10 border-b border-white/10 pb-8">
      <Link
        to="/livro"
        className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-200"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
        Sumário do livro
      </Link>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-violet-400">{capitulo.numero}</span>
        <span className="text-sm text-slate-500">{capitulo.grupo}</span>
        <span className="text-slate-700">·</span>
        <span className="font-mono text-xs text-slate-600">{capitulo.leitura} de leitura</span>
      </div>
    </header>
  )
}

export function LivroCapitulo() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const capitulo = encontrarCapitulo(slug)
  const [estado, setEstado] = useState<EstadoConteudo>({ tipo: 'carregando' })

  useEffect(() => {
    if (!capitulo) return
    document.title = `${capitulo.titulo} — Do zero ao agente`
    return () => {
      document.title = site.nome
    }
  }, [capitulo])

  useEffect(() => {
    let cancelado = false
    if (!capitulo) return

    setEstado({ tipo: 'carregando' })
    carregarCapitulo(capitulo)
      .then((markdown) => {
        if (!cancelado) setEstado({ tipo: 'pronto', markdown })
      })
      .catch(() => {
        if (!cancelado) setEstado({ tipo: 'erro' })
      })

    return () => {
      cancelado = true
    }
  }, [capitulo])

  useEffect(() => {
    if (estado.tipo !== 'pronto' || !hash) return
    const id = decodeURIComponent(hash.slice(1))

    function rolarParaAncora() {
      const alvo = document.getElementById(id)
      if (!alvo) return

      // Diagramas acima da âncora ganham altura depois do primeiro paint. O
      // salto precisa ser imediato para não acumular animações enquanto cada
      // SVG informa que o layout foi atualizado.
      const comportamentoAnterior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      alvo.scrollIntoView({ block: 'start' })
      document.documentElement.style.scrollBehavior = comportamentoAnterior
    }

    requestAnimationFrame(rolarParaAncora)
    window.addEventListener('livro:layout-atualizado', rolarParaAncora)
    const encerrarAjustes = window.setTimeout(
      () => window.removeEventListener('livro:layout-atualizado', rolarParaAncora),
      3000,
    )

    return () => {
      window.clearTimeout(encerrarAjustes)
      window.removeEventListener('livro:layout-atualizado', rolarParaAncora)
    }
  }, [estado.tipo, hash])

  if (!capitulo) return <NaoEncontrada />

  const { anterior, proximo } = vizinhosDoCapitulo(capitulo.slug)

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-24 xl:grid xl:grid-cols-[16rem_minmax(0,48rem)] xl:justify-center xl:gap-14">
        <SumarioLivro slugAtual={capitulo.slug} />

        <main className="min-w-0">
          <CabecalhoCapitulo capitulo={capitulo} />

          {estado.tipo === 'carregando' && <CarregandoCapitulo />}
          {estado.tipo === 'erro' && (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
              <h1 className="font-semibold text-rose-200">Não foi possível carregar o capítulo</h1>
              <p className="mt-2 text-sm text-rose-200/70">
                O arquivo existe no sumário, mas não entrou no build. Tente atualizar a página.
              </p>
            </div>
          )}
          {estado.tipo === 'pronto' && <RenderizadorMarkdown conteudo={estado.markdown} />}

          <NavegacaoCapitulo anterior={anterior} proximo={proximo} />
        </main>
      </div>
    </div>
  )
}
