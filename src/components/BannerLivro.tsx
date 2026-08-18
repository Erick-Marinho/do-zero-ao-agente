import { Link } from 'react-router'

export function BannerLivro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/12 via-ink-soft to-cyan-500/8 p-7 sm:p-10">
        <div
          aria-hidden
          className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"
        />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-xl ring-1 ring-inset ring-violet-500/25" aria-hidden>
                ◫
              </span>
              <span className="font-mono text-xs tracking-[0.16em] text-violet-400 uppercase">
                Livro digital
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Do zero ao agente
            </h2>
            <p className="mt-4 leading-relaxed text-slate-400">
              Uma introdução visual a SDD, engenharia de contexto, AGENTS.md, orquestração e harnesses — com analogias, exemplos e perguntas de revisão.
            </p>
            <p className="mt-4 font-mono text-xs text-slate-600">7 partes · 17 capítulos · 35 diagramas</p>
          </div>
          <Link
            to="/livro"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Abrir o livro →
          </Link>
        </div>
      </div>
    </section>
  )
}
