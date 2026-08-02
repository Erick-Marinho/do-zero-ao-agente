import { secaoTrilha } from '../data/conteudo'
import { statusLabel, statusStyle, trilha } from '../data/trilha'

export function Trilha() {
  return (
    <section id="trilha" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {secaoTrilha.titulo}
        </h2>
        <p className="mt-4 text-slate-400">{secaoTrilha.subtitulo}</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trilha.map((modulo) => (
          <article
            key={modulo.id}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors hover:border-violet-500/40"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm text-slate-600 transition-colors group-hover:text-violet-400">
                {modulo.numero}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle[modulo.status]}`}
              >
                {statusLabel[modulo.status]}
              </span>
            </div>

            <h3 className="mt-4 text-lg leading-snug font-semibold text-balance text-slate-100">
              <span aria-hidden className="text-violet-400/60">
                “
              </span>
              {modulo.titulo}
              <span aria-hidden className="text-violet-400/60">
                ”
              </span>
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{modulo.resumo}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {modulo.topicos.map((topico) => (
                <li
                  key={topico}
                  className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-slate-400"
                >
                  {topico}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
