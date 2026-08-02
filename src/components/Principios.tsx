import { principios } from '../data/conteudo'

export function Principios() {
  return (
    <section id="principios" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Princípios</h2>

      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {principios.map((principio) => (
          <li key={principio.titulo} className="border-l-2 border-violet-500/30 pl-5">
            <h3 className="font-semibold text-slate-100">{principio.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{principio.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
