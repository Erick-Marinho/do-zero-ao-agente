export type Status = 'concluido' | 'em-andamento' | 'planejado'

export type Modulo = {
  id: string
  numero: string
  titulo: string
  resumo: string
  topicos: string[]
  status: Status
}

/**
 * Conteúdo placeholder da trilha — substituir pelo material real da mentoria.
 */
export const trilha: Modulo[] = [
  {
    id: 'fundamentos',
    numero: '01',
    titulo: 'Fundamentos de LLMs',
    resumo:
      'Como um modelo de linguagem realmente funciona por trás da API: tokens, contexto, amostragem e custo.',
    topicos: ['Tokenização', 'Janela de contexto', 'Temperatura e sampling', 'Custo e latência'],
    status: 'em-andamento',
  },
  {
    id: 'prompting',
    numero: '02',
    titulo: 'Prompt Engineering aplicado',
    resumo:
      'Sair do "prompt que funciona às vezes" para instruções versionadas, testáveis e previsíveis.',
    topicos: ['Estrutura de prompt', 'Few-shot', 'Chain-of-thought', 'Saída estruturada'],
    status: 'planejado',
  },
  {
    id: 'rag',
    numero: '03',
    titulo: 'RAG na prática',
    resumo:
      'Recuperação de contexto de ponta a ponta: ingestão, chunking, embeddings e busca híbrida.',
    topicos: ['Chunking', 'Embeddings', 'Vector store', 'Reranking', 'Avaliação de retrieval'],
    status: 'planejado',
  },
  {
    id: 'tools',
    numero: '04',
    titulo: 'Tool use e integrações',
    resumo:
      'Dar mãos ao modelo: definição de ferramentas, o loop agêntico e tratamento de erro.',
    topicos: ['Tool calling', 'Schemas', 'Loop de execução', 'MCP'],
    status: 'planejado',
  },
  {
    id: 'agentes',
    numero: '05',
    titulo: 'Arquitetura de agentes',
    resumo:
      'Do single-agent ao multi-agente: memória, planejamento, orquestração e quando não usar agente.',
    topicos: ['Memória', 'Planejamento', 'Multi-agente', 'Guardrails'],
    status: 'planejado',
  },
  {
    id: 'producao',
    numero: '06',
    titulo: 'Avaliação e produção',
    resumo:
      'O que separa demo de produto: evals, observabilidade, versionamento e controle de custo.',
    topicos: ['Evals', 'LLM as judge', 'Tracing', 'Deploy', 'Monitoramento'],
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
