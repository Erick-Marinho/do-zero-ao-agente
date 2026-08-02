import { aviso, site } from '../data/conteudo'

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="max-w-xl text-sm text-slate-500">{aviso}</p>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">{site.nome} — mentoria.</p>
          <a
            href={site.repositorio}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Código no GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
