import { comoFunciona } from '../data/conteudo'

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-y border-white/5 bg-ink-soft/50 py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {comoFunciona.titulo}
        </h2>

        <div className="max-w-2xl space-y-6">
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
    </section>
  )
}
