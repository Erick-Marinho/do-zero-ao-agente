import { Link } from 'react-router'
import type { CapituloLivro } from '../../data/livro'

function Destino({ capitulo, direcao }: { capitulo: CapituloLivro; direcao: 'anterior' | 'proximo' }) {
  const anterior = direcao === 'anterior'
  return (
    <Link
      to={`/livro/${capitulo.slug}`}
      className={`group min-w-0 flex-1 rounded-2xl border border-white/10 bg-ink-soft p-5 transition-colors hover:border-violet-500/35 ${
        anterior ? 'text-left' : 'text-right'
      }`}
    >
      <span className="text-xs text-slate-600">{anterior ? '← Anterior' : 'Próximo →'}</span>
      <span className="mt-2 block truncate text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
        {capitulo.titulo}
      </span>
    </Link>
  )
}
export function NavegacaoCapitulo({
  anterior,
  proximo,
}: {
  anterior?: CapituloLivro
  proximo?: CapituloLivro
}) {
  return (
    <nav aria-label="Navegação entre capítulos" className="mt-16 grid grid-cols-2 gap-3 border-t border-white/10 pt-8">
      {anterior ? <Destino capitulo={anterior} direcao="anterior" /> : <span />}
      {proximo ? <Destino capitulo={proximo} direcao="proximo" /> : <span />}
    </nav>
  )
}
