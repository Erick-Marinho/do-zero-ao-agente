import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { site } from '../data/conteudo'
import { glossario, introGlossario, totalDeTermos, type Termo } from '../data/glossario'

/** Sem acento e em minúsculas, para que "acao" encontre "ação". */
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function combina(termo: Termo, busca: string) {
  const alvo = normalizar(
    [termo.termo, termo.original, termo.traducao, termo.definicao, termo.nota]
      .filter(Boolean)
      .join(' '),
  )
  return busca.split(/\s+/).every((palavra) => alvo.includes(palavra))
}

const chaveDe = (secaoId: string, termo: Termo) => `${secaoId}-${termo.termo}`

const todasAsChaves = glossario.flatMap((secao) =>
  secao.termos.map((termo) => chaveDe(secao.id, termo)),
)

function Verbete({
  termo,
  aberto,
  onAlternar,
}: {
  termo: Termo
  aberto: boolean
  onAlternar: () => void
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onAlternar}
          aria-expanded={aberto}
          className="group flex w-full items-baseline gap-3 py-3 text-left"
        >
          <span
            aria-hidden
            className={`mt-0.5 shrink-0 font-mono text-xs transition-transform ${
              aberto ? 'rotate-90 text-violet-400' : 'text-slate-600 group-hover:text-slate-400'
            }`}
          >
            ▸
          </span>
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span
              className={`font-medium transition-colors ${
                aberto ? 'text-white' : 'text-slate-200 group-hover:text-white'
              }`}
            >
              {termo.termo}
            </span>
            {termo.original && (
              <span className="font-mono text-xs text-violet-400/70">
                {termo.original}
                {termo.traducao && <span className="text-slate-500">, {termo.traducao}</span>}
              </span>
            )}
          </span>
        </button>
      </h3>

      {aberto && (
        <div className="pb-4 pl-7">
          <p className="text-sm leading-relaxed text-slate-400">{termo.definicao}</p>
          {termo.nota && (
            <p className="mt-3 border-l-2 border-violet-500/25 pl-4 text-sm leading-relaxed text-slate-500 italic">
              {termo.nota}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function Glossario() {
  const [busca, setBusca] = useState('')
  const [abertos, setAbertos] = useState<ReadonlySet<string>>(new Set())
  const buscaAdiada = useDeferredValue(busca)

  useEffect(() => {
    document.title = `Glossário — ${site.nome}`
    return () => {
      document.title = site.nome
    }
  }, [])

  const secoes = useMemo(() => {
    const alvo = normalizar(buscaAdiada.trim())
    if (!alvo) return glossario
    return glossario
      .map((secao) => ({ ...secao, termos: secao.termos.filter((t) => combina(t, alvo)) }))
      .filter((secao) => secao.termos.length > 0)
  }, [buscaAdiada])

  const encontrados = secoes.reduce((soma, secao) => soma + secao.termos.length, 0)
  const filtrando = buscaAdiada.trim().length > 0
  const tudoAberto = abertos.size === totalDeTermos

  function alternar(chave: string) {
    setAbertos((atual) => {
      const proximo = new Set(atual)
      if (!proximo.delete(chave)) proximo.add(chave)
      return proximo
    })
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Glossário
          </h1>
          <p className="mt-5 leading-relaxed text-slate-400">{introGlossario}</p>
          <p className="mt-3 font-mono text-sm text-slate-500">
            {totalDeTermos} termos · {glossario.length} áreas
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-start gap-x-6 gap-y-3">
          <div className="min-w-0 flex-1 basis-80">
            <label htmlFor="busca-glossario" className="sr-only">
              Buscar termo
            </label>
            <input
              id="busca-glossario"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por termo, tradução ou definição…"
              className="w-full max-w-xl rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none"
            />
          </div>

          {/* durante a busca os resultados já vêm abertos, então o botão não cabe */}
          {!filtrando && (
            <button
              type="button"
              onClick={() => setAbertos(tudoAberto ? new Set() : new Set(todasAsChaves))}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400 transition-colors hover:border-white/25 hover:text-slate-100"
            >
              {tudoAberto ? 'Recolher tudo' : 'Expandir tudo'}
            </button>
          )}
        </div>

        {filtrando && (
          <p className="mt-3 text-sm text-slate-500" role="status">
            {encontrados === 0
              ? 'Nenhum termo encontrado.'
              : `${encontrados} ${encontrados === 1 ? 'termo' : 'termos'} em ${secoes.length} ${secoes.length === 1 ? 'área' : 'áreas'}.`}
          </p>
        )}

        {/*
          Durante a busca o índice sai e o grid vai junto: com apenas um filho,
          o conteúdo cairia na coluna estreita de 13rem.
        */}
        <div className={filtrando ? 'mt-12' : 'mt-12 gap-12 lg:grid lg:grid-cols-[13rem_1fr]'}>
          <nav
            aria-label="Áreas do glossário"
            className={filtrando ? 'hidden' : 'hidden lg:block'}
          >
            <ul className="sticky top-24 space-y-1">
              {glossario.map((secao) => (
                <li key={secao.id}>
                  <a
                    href={`#${secao.id}`}
                    className="flex gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
                  >
                    <span className="font-mono text-slate-600">{secao.numero}</span>
                    {secao.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-12">
            {secoes.map((secao) => (
              <section key={secao.id} id={secao.id} className="scroll-mt-24">
                <h2 className="flex items-baseline gap-3 border-b border-white/10 pb-3 text-xl font-semibold text-white">
                  <span className="font-mono text-sm text-violet-400">{secao.numero}</span>
                  {secao.titulo}
                  <span className="ml-auto font-mono text-sm font-normal text-slate-600">
                    {secao.termos.length}
                  </span>
                </h2>
                <div className="mt-2">
                  {secao.termos.map((termo) => {
                    const chave = chaveDe(secao.id, termo)
                    return (
                      <Verbete
                        key={chave}
                        termo={termo}
                        aberto={filtrando || abertos.has(chave)}
                        onAlternar={() => alternar(chave)}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
