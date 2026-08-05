import { Link } from 'react-router'
import { glossario, totalDeTermos } from '../data/glossario'

export function BannerGlossario() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20">
      <Link
        to="/glossario"
        className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors hover:border-violet-500/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
      >
        <div>
          <h3 className="font-semibold text-slate-100">Glossário</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {totalDeTermos} termos em {glossario.length} áreas, de token a ROI. Para consultar
            quando um nome aparecer no meio do caminho.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-violet-400">
          Abrir
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </div>
  )
}
