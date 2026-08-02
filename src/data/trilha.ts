export type Status = 'concluido' | 'em-andamento' | 'planejado'

export type Modulo = {
  id: string
  numero: string
  /** Fala do cliente. Renderizado entre aspas pelo card — não incluir aqui. */
  titulo: string
  /** Nome temático do módulo. Não aparece no card; serve de rótulo interno. */
  tema: string
  resumo: string
  topicos: string[]
  status: Status
}

export const trilha: Modulo[] = [
  {
    id: 'antes-do-codigo',
    numero: '00',
    titulo: 'Dá pra fazer até sexta?',
    tema: 'Antes do código',
    resumo:
      'Antes de escrever código: entender o problema, comparar sete formas de resolvê-lo e registrar a decisão.',
    topicos: [
      'Levantamento',
      'Harness',
      'Guias e sensores',
      'Alternativas',
      'OpenSpec',
      'ADR',
    ],
    status: 'em-andamento',
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
