import { useEffect } from 'react'
import { Link } from 'react-router'
import { capitulosLivro, dadosLivro } from '../data/livro'
import { site } from '../data/conteudo'

export function LivroInicio() {
  useEffect(() => {
    document.title = `${dadosLivro.titulo} — ${site.nome}`
    return () => {
      document.title = site.nome
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24">
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 font-mono text-xs text-violet-300">
              Livro digital
            </span>
            <span className="font-mono text-xs text-slate-600">{dadosLivro.edicao}</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
            {dadosLivro.titulo}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            {dadosLivro.subtitulo}
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-500">
            Uma referência para quem quer entender agentes de IA partindo do básico, com analogias,
            exemplos, diagramas e perguntas de revisão.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/livro/introducao"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Começar a leitura
            </Link>
            <Link
              to="/livro/estudo-de-caso"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            >
              Ver estudo de caso
            </Link>
          </div>
        </header>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {[
            { valor: dadosLivro.partes, rotulo: 'partes' },
            { valor: dadosLivro.capitulosConceituais, rotulo: 'capítulos' },
            { valor: dadosLivro.diagramas, rotulo: 'diagramas' },
          ].map((item) => (
            <div key={item.rotulo} className="bg-ink px-4 py-5 sm:px-6">
              <dt className="text-2xl font-semibold text-white">{item.valor}</dt>
              <dd className="mt-1 text-xs text-slate-500 sm:text-sm">{item.rotulo}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-20" aria-labelledby="sumario-livro">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.16em] text-violet-400 uppercase">Sumário</p>
            <h2 id="sumario-livro" className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Da primeira pergunta ao sistema que aprende
            </h2>
            <p className="mt-4 leading-relaxed text-slate-500">
              Leia em ordem no primeiro contato ou entre diretamente no conceito que precisa consultar.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {capitulosLivro.map((capitulo) => (
              <li key={capitulo.slug}>
                <Link
                  to={`/livro/${capitulo.slug}`}
                  className="group flex h-full gap-5 rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors hover:border-violet-500/35"
                >
                  <span className="font-mono text-sm text-violet-400/70">{capitulo.numero}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-slate-100 transition-colors group-hover:text-white">
                        {capitulo.titulo}
                      </span>
                      <span className="font-mono text-xs text-slate-600">{capitulo.leitura}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-500">
                      {capitulo.descricao}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-7 sm:p-10">
          <p className="font-mono text-xs tracking-[0.16em] text-violet-400 uppercase">Três ideias-mãe</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            <li>
              <span className="font-mono text-sm text-violet-400">01</span>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Minimize o conhecimento ativo, não o conhecimento disponível.
              </p>
            </li>
            <li>
              <span className="font-mono text-sm text-violet-400">02</span>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Transforme intenção em feedback executável.
              </p>
            </li>
            <li>
              <span className="font-mono text-sm text-violet-400">03</span>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Faça o sistema aprender com falhas recorrentes.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
