import { Link } from 'react-router'
import { site } from '../data/conteudo'

const links = [
  { to: '/#trilha', label: 'Trilha' },
  { to: '/#como-funciona', label: 'Como funciona' },
  { to: '/#principios', label: 'Princípios' },
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
          {/* no celular sobra só a marca, para caber Glossário e GitHub */}
          <span className="hidden truncate text-sm font-semibold tracking-tight text-slate-100 sm:inline">
            {site.nome}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hidden rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100 md:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/glossario"
            className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Glossário
          </Link>
          <a
            href={site.repositorio}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
