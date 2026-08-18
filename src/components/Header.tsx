import { Link } from 'react-router'
import { site } from '../data/conteudo'

/** Âncoras da home — só fazem sentido com espaço sobrando. */
const ancoras = [
  { to: '/#trilha', label: 'Trilha' },
  { to: '/#como-funciona', label: 'Como funciona' },
]

/** Páginas de consulta — alcançáveis também no celular. */
const paginas = [
  { to: '/o-caso', label: 'O caso', classe: 'hidden sm:block' },
  { to: '/livro', label: 'Livro', classe: '' },
  { to: '/glossario', label: 'Glossário', classe: '' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-ink" aria-hidden="true">
              <g fill="currentColor">
                <circle cx="8" cy="3" r="2" />
                <circle cx="3.5" cy="12" r="2" />
                <circle cx="12.5" cy="12" r="2" />
              </g>
              <g stroke="currentColor" strokeWidth="1.2">
                <path d="M8 3 3.5 12M8 3l4.5 9M3.5 12h9" />
              </g>
            </svg>
          </span>
          {/* no celular sobra só a marca, para caber a navegação */}
          <span className="hidden truncate text-sm font-semibold tracking-tight text-slate-100 lg:inline">
            {site.nome}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {ancoras.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hidden rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100 md:block"
            >
              {link.label}
            </Link>
          ))}
          {paginas.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${link.classe} rounded-lg px-2.5 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100 sm:px-3`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.repositorio}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-lg border border-white/10 px-2.5 py-2 text-sm text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:px-3"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
