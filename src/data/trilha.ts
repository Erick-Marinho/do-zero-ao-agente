export type Status = 'concluido' | 'em-andamento' | 'planejado'

export type Modulo = {
  id: string
  numero: string
  titulo: string
  resumo: string
  topicos: string[]
  status: Status
}

export const trilha: Modulo[] = [
  {
    id: 'antes-do-codigo',
    numero: '00',
    titulo: 'Antes do código',
    resumo:
      'Entender o problema, gerar alternativas e acordar uma decisão antes de abrir o editor.',
    topicos: ['Levantamento', 'Alternativas de solução', 'Spec-driven', 'ADR', 'Ambiente'],
    status: 'em-andamento',
  },
  {
    id: 'fundacao',
    numero: '01',
    titulo: 'Fundação',
    resumo:
      'Do dado bruto ao primeiro agente: um modelo dentro de um laço, que se corrige quando erra e pergunta quando não entende.',
    topicos: [
      'Contratos e validação',
      'Tokens e custo',
      'Saída estruturada',
      'Loop agêntico',
      'Observabilidade',
    ],
    status: 'planejado',
  },
  {
    id: 'conhecimento',
    numero: '02',
    titulo: 'Conhecimento',
    resumo:
      'Como o agente encontra o que não estava no prompt — e como se mede se ele encontrou certo.',
    topicos: ['Embeddings', 'Busca híbrida', 'Precisão e recall', 'Ontologia', 'GraphRAG'],
    status: 'planejado',
  },
  {
    id: 'estrutura',
    numero: '03',
    titulo: 'Estrutura',
    resumo:
      'Quando o código deixa de caber na cabeça: máquinas de estado, hierarquia e coordenação entre especialistas.',
    topicos: ['Máquina de estado', 'LangGraph', 'Checkpoint', 'Subgrafos', 'Multiagente'],
    status: 'planejado',
  },
  {
    id: 'rigor',
    numero: '04',
    titulo: 'Rigor',
    resumo: 'Como saber que está certo, descobrir por que falhou e não deixar o custo escapar.',
    topicos: [
      'Suíte de avaliação',
      'LLM as judge',
      'OpenTelemetry',
      'Diagnóstico',
      'Segurança',
      'Custo',
    ],
    status: 'planejado',
  },
  {
    id: 'fronteira',
    numero: '05',
    titulo: 'Fronteira',
    resumo:
      'O que existe além do que escolhemos — e como defender (ou enterrar) um investimento técnico.',
    topicos: [
      'Modelo local',
      'Quantização',
      'Fine-tuning',
      'Alinhamento',
      'Governança',
      'ROI',
    ],
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
