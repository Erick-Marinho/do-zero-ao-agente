const links = [
  { href: '#trilha', label: 'Trilha' },
  { href: '#como-funciona', label: 'Como funciona' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#topo" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 font-mono text-sm font-bold text-ink">
            0
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            Do Zero ao Agente
          </span>
        </a>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Erick-Marinho/do-zero-ao-agente"
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
