import type { Material, TipoMaterial } from '../data/trilha'

const rotuloTipo: Record<TipoMaterial, string> = {
  artigo: 'Artigo',
  pdf: 'PDF',
  video: 'Vídeo',
  repo: 'Repositório',
}

const iconeTipo: Record<TipoMaterial, string> = {
  // caminhos de um viewBox 16x16
  artigo: 'M3 2h7l3 3v9H3zM10 2v3h3',
  pdf: 'M3 2h7l3 3v9H3zM10 2v3h3M5.5 8h5M5.5 11h3',
  video: 'M2 4h12v8H2zM6.5 6.5l3.5 1.5-3.5 1.5z',
  repo: 'M3 3h10v10H3zM6 6l-2 2 2 2M10 6l2 2-2 2',
}

/** Arquivos em `public/` precisam do prefixo do repositório em produção. */
function resolverUrl(url: string) {
  return url.startsWith('http') ? url : `${import.meta.env.BASE_URL}${url}`
}

function Icone({ tipo }: { tipo: TipoMaterial }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconeTipo[tipo]} />
    </svg>
  )
}

function Conteudo({ material }: { material: Material }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-slate-400">
          <Icone tipo={material.tipo} />
          {rotuloTipo[material.tipo]}
        </span>
        {material.fonte && <span className="text-xs text-slate-500">{material.fonte}</span>}
      </div>

      <h3 className="mt-3 font-semibold text-slate-100">{material.titulo}</h3>

      {material.descricao && (
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{material.descricao}</p>
      )}
    </>
  )
}

export function Materiais({ materiais }: { materiais: Material[] }) {
  if (materiais.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center">
        <p className="text-slate-400">Os materiais deste módulo ainda não foram publicados.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {materiais.map((material) => {
        const pendente = material.url === ''

        if (pendente) {
          return (
            <li
              key={material.titulo}
              className="rounded-2xl border border-white/10 bg-ink-soft p-6 opacity-70"
            >
              <Conteudo material={material} />
              <p className="mt-4 text-xs text-slate-500">Link ainda não disponibilizado.</p>
            </li>
          )
        }

        const externo = material.url.startsWith('http')

        return (
          <li key={material.titulo}>
            <a
              href={resolverUrl(material.url)}
              target={externo ? '_blank' : undefined}
              rel={externo ? 'noreferrer' : undefined}
              className="group block rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors hover:border-violet-500/40"
            >
              <Conteudo material={material} />
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-violet-400">
                {externo ? 'Abrir' : 'Baixar'}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
