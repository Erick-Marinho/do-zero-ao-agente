import { oQueFica } from '../data/conteudo'

export function OQueFica() {
  return (
    <section id="o-que-fica" className="scroll-mt-20 border-t border-white/5 bg-ink-soft/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {oQueFica.titulo}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">{oQueFica.chamada}</p>

        <ul className="mt-10 max-w-3xl space-y-4">
          {oQueFica.itens.map((item) => (
            <li key={item.destaque} className="flex gap-4">
              <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-violet-500/50" />
              <p className="leading-relaxed text-slate-400">
                Saber <strong className="font-semibold text-slate-100">{item.destaque}</strong>{' '}
                {item.resto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
