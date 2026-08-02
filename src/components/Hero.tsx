export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* brilho de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Mentoria em Engenharia de IA
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Do zero ao{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
            agente
          </span>
          .
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          Uma trilha prática para sair do consumo de API e chegar a sistemas de IA que rodam em
          produção — construindo, quebrando e medindo cada etapa.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#trilha"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Ver a trilha
          </a>
          <a
            href="#como-funciona"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/25 hover:text-white"
          >
            Como funciona
          </a>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { valor: '6', rotulo: 'Módulos' },
            { valor: '2', rotulo: 'Mentorados' },
            { valor: '100%', rotulo: 'Mão na massa' },
          ].map((item) => (
            <div key={item.rotulo} className="bg-ink px-6 py-5">
              <dt className="text-2xl font-semibold text-white">{item.valor}</dt>
              <dd className="mt-1 text-sm text-slate-500">{item.rotulo}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
