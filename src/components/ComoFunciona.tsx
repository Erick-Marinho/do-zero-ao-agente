import { Link } from 'react-router'
import { caso } from '../data/caso'
import { comoFunciona } from '../data/conteudo'

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-y border-white/5 bg-ink-soft/50 py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {comoFunciona.titulo}
          </h2>

          <div className="mt-8 max-w-2xl space-y-6">
            {comoFunciona.paragrafos.map((paragrafo, i) => (
              <p
                key={paragrafo.slice(0, 24)}
                className={
                  i === 0
                    ? 'text-lg leading-relaxed text-slate-200'
                    : 'leading-relaxed text-slate-400'
                }
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        {/* o cliente, com rosto — leva para a história completa */}
        <Link
          to="/o-caso"
          className="group self-start overflow-hidden rounded-2xl border border-white/10 bg-ink transition-colors hover:border-violet-500/40"
        >
          <img
            src={`${import.meta.env.BASE_URL}${caso.foto.pequena}`}
            alt={caso.foto.alt}
            width={704}
            height={384}
            loading="lazy"
            className="h-44 w-full object-cover object-top"
          />
          <div className="p-5">
            <p className="font-semibold text-slate-100">{caso.nome}</p>
            <p className="mt-1 text-sm text-slate-400">{caso.mercado}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-violet-400">
              Conhecer o cliente
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
