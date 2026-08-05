import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { Materiais } from '../components/Materiais'
import { site } from '../data/conteudo'
import { statusLabel, statusStyle, trilha } from '../data/trilha'
import { NaoEncontrada } from './NaoEncontrada'

export function ModuloPage() {
  const { id } = useParams()
  const modulo = trilha.find((m) => m.id === id)

  useEffect(() => {
    if (!modulo) return
    document.title = `${modulo.numero} · ${modulo.tema} — ${site.nome}`
    return () => {
      document.title = site.nome
    }
  }, [modulo])

  if (!modulo) return <NaoEncontrada />

  return (
    <article className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-20">
        <Link
          to="/#trilha"
          className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-100"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          A trilha
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-violet-400">{modulo.numero}</span>
          <span className="text-sm text-slate-500">{modulo.tema}</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle[modulo.status]}`}
          >
            {statusLabel[modulo.status]}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
          <span aria-hidden className="text-violet-400/60">
            “
          </span>
          {modulo.titulo}
          <span aria-hidden className="text-violet-400/60">
            ”
          </span>
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-400">{modulo.resumo}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {modulo.topicos.map((topico) => (
            <li
              key={topico}
              className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-slate-400"
            >
              {topico}
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
            <h2 className="text-xl font-semibold text-white">Materiais</h2>
            {modulo.materiais.length > 0 && (
              <span className="font-mono text-sm text-slate-500">
                {modulo.materiais.length}
              </span>
            )}
          </div>

          <div className="mt-6">
            <Materiais materiais={modulo.materiais} />
          </div>
        </section>
      </div>
    </article>
  )
}
