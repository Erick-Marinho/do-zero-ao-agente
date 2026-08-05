import { useEffect } from 'react'
import { Link } from 'react-router'
import { caso } from '../data/caso'
import { aviso, site } from '../data/conteudo'

const url = (caminho: string) => `${import.meta.env.BASE_URL}${caminho}`

export function OCaso() {
  useEffect(() => {
    document.title = `O caso — ${site.nome}`
    return () => {
      document.title = site.nome
    }
  }, [])

  return (
    <article>
      {/* ---------- abertura com a foto ---------- */}
      <header className="relative">
        <div className="relative h-[22rem] overflow-hidden sm:h-[30rem]">
          <img
            src={url(caso.foto.grande)}
            alt={caso.foto.alt}
            width={1408}
            height={768}
            className="h-full w-full object-cover object-top"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
          />
        </div>

        <div className="relative mx-auto -mt-40 max-w-4xl px-6 sm:-mt-48">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {caso.selo}
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {caso.nome}
          </h1>
          <p className="mt-2 text-lg text-slate-300 sm:text-xl">{caso.mercado}</p>
          <p className="mt-4 max-w-xl text-slate-400">{caso.chamada}</p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-5">
            {caso.ficha.map((item, i) => (
              <div
                key={item.rotulo}
                // Em duas colunas, o último item ocupa a linha inteira quando a
                // contagem é ímpar — evita uma célula vazia.
                className={`bg-ink px-4 py-4 ${
                  i === caso.ficha.length - 1 && caso.ficha.length % 2 === 1
                    ? 'max-lg:col-span-2'
                    : ''
                }`}
              >
                <dt className="text-xl font-semibold text-white">{item.valor}</dt>
                <dd className="mt-0.5 text-xs leading-snug text-slate-500">{item.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* ---------- quem ele é ---------- */}
        <section className="space-y-5">
          {caso.abertura.map((paragrafo) => (
            <p key={paragrafo.slice(0, 24)} className="text-lg leading-relaxed text-slate-300">
              {paragrafo}
            </p>
          ))}
          <p className="border-l-2 border-violet-500/60 pl-5 text-lg leading-relaxed font-medium text-white">
            {caso.destaqueAbertura}
          </p>
        </section>

        {/* ---------- o que ele tem ---------- */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {caso.oQueTem.titulo}
          </h2>
          <div className="mt-6 space-y-5">
            {caso.oQueTem.paragrafos.map((paragrafo, i) => (
              <p
                key={paragrafo.slice(0, 24)}
                className={
                  i === 1
                    ? 'text-xl leading-relaxed font-medium text-white'
                    : 'leading-relaxed text-slate-400'
                }
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </section>

        {/* ---------- a semana dele ---------- */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {caso.semana.titulo}
          </h2>
          <p className="mt-6 leading-relaxed text-slate-400">{caso.semana.intro}</p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {caso.semana.passos.map((passo) => (
              <li
                key={passo.dia}
                className={`rounded-2xl border p-5 ${
                  passo.problema
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : 'border-white/10 bg-ink-soft'
                }`}
              >
                <p
                  className={`font-mono text-xs tracking-wide uppercase ${
                    passo.problema ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {passo.dia}
                  {passo.hora && <span className="text-slate-600"> · {passo.hora}</span>}
                </p>
                <h3 className="mt-3 font-semibold text-slate-100">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{passo.texto}</p>
              </li>
            ))}
          </ol>

          {/* o sobrinho */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-ink-soft p-6">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="font-semibold text-slate-100">{caso.juninho.nome}</h3>
              <span className="text-sm text-slate-500">{caso.juninho.papel}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
              {caso.juninho.numeros.map((n) => (
                <div key={n.rotulo}>
                  <p className="text-lg font-semibold text-white">{n.valor}</p>
                  <p className="text-xs text-slate-500">{n.rotulo}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">{caso.juninho.ressalva}</p>
          </div>

          <p className="mt-8 leading-relaxed text-slate-400">{caso.semana.fechamento}</p>
        </section>

        {/* ---------- a frase ---------- */}
        <section className="mt-20">
          <figure className="rounded-2xl border border-violet-500/25 bg-violet-500/5 p-8 sm:p-10">
            <blockquote className="text-2xl leading-snug font-medium text-balance text-white sm:text-3xl">
              <span aria-hidden className="text-violet-400/60">
                “
              </span>
              {caso.frase.texto}
              <span aria-hidden className="text-violet-400/60">
                ”
              </span>
            </blockquote>
            <figcaption className="mt-6 text-sm text-slate-400">
              {caso.nome} — {caso.frase.contexto}
            </figcaption>
          </figure>
          <p className="mt-5 text-slate-400">{caso.frase.nota}</p>
        </section>

        {/* ---------- como ele é ---------- */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {caso.tracos.titulo}
          </h2>
          <p className="mt-4 text-slate-400">{caso.tracos.subtitulo}</p>

          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {caso.tracos.itens.map((traco) => (
              <li key={traco.titulo} className="border-l-2 border-violet-500/30 pl-5">
                <h3 className="font-semibold text-slate-100">{traco.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{traco.texto}</p>
                {traco.fala && (
                  <p className="mt-3 font-medium text-slate-300 italic">“{traco.fala}”</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- saídas ---------- */}
        <div className="mt-20 flex flex-wrap gap-3 border-t border-white/10 pt-10">
          <Link
            to="/#trilha"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Ver a trilha
          </Link>
          <Link
            to="/glossario"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/25 hover:text-white"
          >
            Glossário
          </Link>
        </div>

        <p className="mt-10 text-sm text-slate-600 italic">{aviso}</p>
      </div>
    </article>
  )
}
