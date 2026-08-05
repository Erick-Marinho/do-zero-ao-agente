export type Status = 'concluido' | 'em-andamento' | 'planejado'

export type TipoMaterial = 'artigo' | 'pdf' | 'video' | 'repo'

export type Material = {
  titulo: string
  tipo: TipoMaterial
  /**
   * URL externa (começando com `http`) ou caminho de um arquivo em `public/` —
   * por exemplo `materiais/bloco-00/plano.pdf`. Deixe vazio enquanto o link
   * não existir: o item aparece na lista marcado como pendente, sem virar
   * um link quebrado.
   */
  url: string
  /** Autor, veículo e data. Ex.: 'Martin Fowler · abr/2026'. */
  fonte?: string
  descricao?: string
}

export type Modulo = {
  id: string
  numero: string
  /** Fala do cliente. Renderizado entre aspas pelo card — não incluir aqui. */
  titulo: string
  /** Nome temático do módulo. Rótulo curto, usado na página do módulo. */
  tema: string
  resumo: string
  topicos: string[]
  status: Status
  materiais: Material[]
}

export const trilha: Modulo[] = [
  {
    id: 'antes-do-codigo',
    numero: '00',
    titulo: 'Dá pra fazer até sexta?',
    tema: 'Antes do código',
    resumo:
      'Antes de escrever código: entender o problema, montar o ambiente por script, comparar sete formas de resolvê-lo e registrar a decisão.',
    topicos: [
      'Levantamento',
      'Harness',
      'Guias e sensores',
      'Alternativas',
      'OpenSpec',
      'ADR',
    ],
    status: 'em-andamento',
    materiais: [
      {
        titulo: 'Harness engineering for coding agent users',
        tipo: 'artigo',
        url: '',
        fonte: 'Birgitta Böckeler e Martin Fowler · abr/2026',
        descricao:
          'A fonte do vocabulário do dia 2: guias e sensores, computacional e inferencial, o loop de direção e a ideia de manter a qualidade à esquerda. Vale reler no Bloco IV, quando avaliação virar o tema.',
      },
      {
        titulo: 'Alavancando o Codex em um mundo centrado no agente',
        tipo: 'artigo',
        url: '',
        fonte: 'Ryan Lopopolo, OpenAI · fev/2026',
        descricao:
          'Um produto inteiro construído sem código escrito à mão. É de onde vem o argumento do dia 4: o que o agente não lê no contexto não existe. Traz também a crítica ao arquivo monolítico de instruções e a ideia de docs/ como sistema de registro.',
      },
      {
        titulo: 'The Anatomy of an Agent Harness',
        tipo: 'artigo',
        url: '',
        fonte: 'Vivek Trivedy, LangChain · mar/2026',
        descricao:
          'Aqui "harness" significa outra coisa: tudo que não é o modelo, dentro de um agente. É o vocabulário do Bloco III em diante — guarde para lá, mas vale saber que o mesmo termo tem dois sentidos.',
      },
    ],
  },
  {
    id: 'fundacao',
    numero: '01',
    titulo: 'Eu queria digitar a pergunta',
    tema: 'Fundação',
    resumo:
      'Do dado sujo ao agente que traduz português em consulta, se corrige quando erra e pergunta quando não entende.',
    topicos: ['Pydantic', 'Tokens', 'Saída estruturada', 'Loop agêntico', 'Tracing'],
    status: 'planejado',
    materiais: [],
  },
  {
    id: 'conhecimento',
    numero: '02',
    titulo: 'Eu vendo Omo, mas ele não acha',
    tema: 'Conhecimento',
    resumo:
      'Recuperação de ponta a ponta, medida — e o vocabulário do domínio virando estrutura.',
    topicos: ['Embeddings', 'Busca híbrida', 'Precisão e recall', 'Ontologia', 'GraphRAG'],
    status: 'planejado',
    materiais: [],
  },
  {
    id: 'estrutura',
    numero: '03',
    titulo: 'Dá pra ele fazer mais coisa?',
    tema: 'Estrutura',
    resumo:
      'O código não cabe mais na cabeça. Máquinas de estado, hierarquia e especialistas coordenados.',
    topicos: ['FSM e HSM', 'LangGraph', 'Checkpoint', 'Subgrafos', 'Multiagente'],
    status: 'planejado',
    materiais: [],
  },
  {
    id: 'rigor',
    numero: '04',
    titulo: 'Mas como eu sei que melhorou?',
    tema: 'Rigor',
    resumo:
      'Medir, investigar e conter. O que separa um sistema que funciona de um sistema em que se confia.',
    topicos: ['Evals', 'LLM as judge', 'OpenTelemetry', 'Forense', 'Segurança', 'Custo'],
    status: 'planejado',
    materiais: [],
  },
  {
    id: 'fronteira',
    numero: '05',
    titulo: 'Quanto isso me custa por mês?',
    tema: 'Fronteira',
    resumo:
      'As alternativas que não escolhemos, por que o modelo se comporta assim, e como se defende um investimento.',
    topicos: ['Modelo local', 'Fine-tuning', 'Alinhamento', 'Governança', 'ROI'],
    status: 'planejado',
    materiais: [],
  },
]

export const statusLabel: Record<Status, string> = {
  concluido: 'Concluído',
  'em-andamento': 'Em andamento',
  planejado: 'Planejado',
}

export const statusStyle: Record<Status, string> = {
  concluido: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
  'em-andamento': 'bg-violet-500/10 text-violet-300 ring-violet-500/30',
  planejado: 'bg-slate-500/10 text-slate-400 ring-slate-500/25',
}
