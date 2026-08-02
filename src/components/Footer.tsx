export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Do Zero ao Agente — mentoria em engenharia de IA.
        </p>
        <a
          href="https://github.com/Erick-Marinho/do-zero-ao-agente"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          Código no GitHub
        </a>
      </div>
    </footer>
  )
}
