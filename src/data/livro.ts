export type CapituloLivro = {
  slug: string
  arquivo: string
  numero: string
  grupo: string
  titulo: string
  descricao: string
  leitura: string
}

type CarregadorMarkdown = () => Promise<string>

const modulosMarkdown = import.meta.glob(
  ['/docs/livro/*.md', '!/docs/livro/README.md', '!/docs/livro/REVISAO.md'],
  {
    query: '?raw',
    import: 'default',
  },
) as Record<string, CarregadorMarkdown>

export const capitulosLivro: CapituloLivro[] = [
  {
    slug: 'introducao',
    arquivo: '00-introducao.md',
    numero: '00',
    grupo: 'Comece aqui',
    titulo: 'Do prompt ao sistema',
    descricao: 'Modelo, agente, harness e a mudança de perspectiva que orienta o livro.',
    leitura: '6 min',
  },
  {
    slug: 'fundamentos',
    arquivo: '01-fundamentos.md',
    numero: '01',
    grupo: 'Parte 1',
    titulo: 'Fundamentos',
    descricao: 'Janela de contexto, Smart e Dumb Zone, AGENTS.md e divulgação progressiva.',
    leitura: '18 min',
  },
  {
    slug: 'memoria',
    arquivo: '02-memoria.md',
    numero: '02',
    grupo: 'Parte 2',
    titulo: 'Arquitetura da memória',
    descricao: 'Memória durável, procedural, executável e efêmera — e em qual fonte confiar.',
    leitura: '16 min',
  },
  {
    slug: 'especificacao-e-planejamento',
    arquivo: '03-especificacao-e-planejamento.md',
    numero: '03',
    grupo: 'Parte 3',
    titulo: 'Especificação e planejamento',
    descricao: 'SDD, Research, fatias verticais, grafo de tarefas e o quadro kanban da jornada.',
    leitura: '24 min',
  },
  {
    slug: 'engenharia-de-contexto',
    arquivo: '04-engenharia-de-contexto.md',
    numero: '04',
    grupo: 'Parte 4',
    titulo: 'Engenharia de contexto operacional',
    descricao: 'Montagem, ciclo de vida e subagentes como fronteiras de contexto.',
    leitura: '21 min',
  },
  {
    slug: 'harness',
    arquivo: '05-harness.md',
    numero: '05',
    grupo: 'Parte 5',
    titulo: 'Engenharia de harness',
    descricao: 'Guias, sensores, harnessability e conhecimento executável.',
    leitura: '16 min',
  },
  {
    slug: 'autonomia-e-coordenacao',
    arquivo: '06-autonomia-e-coordenacao.md',
    numero: '06',
    grupo: 'Parte 6',
    titulo: 'Autonomia e coordenação',
    descricao: 'Atenção humana, autoridade, handoffs e orquestração de agentes.',
    leitura: '14 min',
  },
  {
    slug: 'lifecycle-e-aprendizagem',
    arquivo: '07-lifecycle-e-aprendizagem.md',
    numero: '07',
    grupo: 'Parte 7',
    titulo: 'Fechamento e aprendizagem',
    descricao: 'Feature closure, promoção de memória, métricas e melhoria do harness.',
    leitura: '17 min',
  },
  {
    slug: 'estudo-de-caso',
    arquivo: '08-estudo-de-caso.md',
    numero: '08',
    grupo: 'Prática',
    titulo: 'Recuperação de senha',
    descricao: 'Um caso completo da intenção ao fechamento, com uma ponte para OpenSpec.',
    leitura: '20 min',
  },
  {
    slug: 'estado-da-arte',
    arquivo: '09-estado-da-arte.md',
    numero: '09',
    grupo: 'Prática',
    titulo: 'Estado da arte',
    descricao:
      'O ciclo de vida completo na prática: fases, autoridade, sensores, evidência e um prompt base por etapa.',
    leitura: '40 min',
  },
  {
    slug: 'glossario',
    arquivo: '10-glossario-essencial.md',
    numero: '10',
    grupo: 'Consulta',
    titulo: 'Glossário essencial',
    descricao: 'Os termos centrais do livro em português e inglês.',
    leitura: '8 min',
  },
  {
    slug: 'fontes',
    arquivo: '11-fontes.md',
    numero: '11',
    grupo: 'Consulta',
    titulo: 'Fontes e leituras',
    descricao: 'Referências principais, contribuições e um roteiro de leitura crítica.',
    leitura: '7 min',
  },
]

export const dadosLivro = {
  titulo: 'Do zero ao agente',
  subtitulo: 'Engenharia de contexto, especificações e harnesses para sistemas de IA confiáveis.',
  edicao: 'Edição 0.1',
  partes: 7,
  capitulosConceituais: 17,
  diagramas: 54,
}

export function encontrarCapitulo(slug: string | undefined) {
  return capitulosLivro.find((capitulo) => capitulo.slug === slug)
}

export function slugDoArquivo(arquivo: string) {
  if (arquivo === 'README.md') return ''
  return capitulosLivro.find((capitulo) => capitulo.arquivo === arquivo)?.slug
}

export function vizinhosDoCapitulo(slug: string) {
  const indice = capitulosLivro.findIndex((capitulo) => capitulo.slug === slug)
  if (indice < 0) return {}
  return {
    anterior: capitulosLivro[indice - 1],
    proximo: capitulosLivro[indice + 1],
  }
}

export async function carregarCapitulo(capitulo: CapituloLivro) {
  const chave = `/docs/livro/${capitulo.arquivo}`
  const carregar = modulosMarkdown[chave]
  if (!carregar) throw new Error(`Markdown não encontrado: ${capitulo.arquivo}`)
  return carregar()
}
