import { Link } from 'react-router'
import { capitulosLivro } from '../../data/livro'

function ItensSumario({ slugAtual }: { slugAtual?: string }) {
  let grupoAnterior = ''

  return (
    <ul className="space-y-1">
      {capitulosLivro.map((capitulo) => {
        const novoGrupo = capitulo.grupo !== grupoAnterior
        grupoAnterior = capitulo.grupo
        const ativo = capitulo.slug === slugAtual

        return (
          <li key={capitulo.slug}>
            {novoGrupo && (
              <p className="mt-5 mb-2 px-3 font-mono text-[0.68rem] tracking-[0.16em] text-slate-600 uppercase first:mt-0">
                {capitulo.grupo}
              </p>
            )}
            <Link
              to={`/livro/${capitulo.slug}`}
              aria-current={ativo ? 'page' : undefined}
              className={`flex gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                ativo
                  ? 'bg-violet-500/10 text-violet-200 ring-1 ring-inset ring-violet-500/20'
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <span className={`font-mono text-xs ${ativo ? 'text-violet-400' : 'text-slate-700'}`}>
                {capitulo.numero}
              </span>
              <span>{capitulo.titulo}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
export function SumarioLivro({ slugAtual }: { slugAtual?: string }) {
  return (
    <>
      <details className="mb-8 rounded-xl border border-white/10 bg-ink-soft p-4 xl:hidden">
        <summary className="cursor-pointer text-sm font-medium text-slate-200">
          Sumário do livro
        </summary>
        <nav aria-label="Capítulos do livro" className="mt-4 border-t border-white/5 pt-4">
          <ItensSumario slugAtual={slugAtual} />
        </nav>
      </details>

      <aside className="hidden xl:block">
        <nav aria-label="Capítulos do livro" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3">
          <Link to="/livro" className="mb-5 block px-3">
            <span className="block text-sm font-semibold text-slate-200">Do zero ao agente</span>
            <span className="mt-1 block text-xs text-slate-600">Sumário e apresentação</span>
          </Link>
          <ItensSumario slugAtual={slugAtual} />
        </nav>
      </aside>
    </>
  )
}
