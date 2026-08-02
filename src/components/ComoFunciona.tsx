const etapas = [
  {
    titulo: 'Estuda antes',
    descricao:
      'O material do módulo fica aqui no site. Você chega no encontro com o conteúdo lido e as dúvidas anotadas.',
  },
  {
    titulo: 'Constrói junto',
    descricao:
      'No encontro a gente escreve código de verdade — decisões de arquitetura, trade-offs e os erros que aparecem no caminho.',
  },
  {
    titulo: 'Entrega e revisa',
    descricao:
      'Cada módulo fecha com um artefato rodando. A revisão é sobre o código que você escreveu, não sobre slides.',
  },
]

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-y border-white/5 bg-ink-soft/50 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-slate-400">O ciclo se repete a cada módulo.</p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {etapas.map((etapa, i) => (
            <li key={etapa.titulo}>
              <span className="font-mono text-sm text-violet-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-100">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{etapa.descricao}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
