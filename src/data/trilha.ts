export type Status = 'concluido' | 'em-andamento' | 'planejado'

export type TipoMaterial = 'artigo' | 'pdf' | 'video' | 'doc' | 'repo'

export type Material = {
  titulo: string
  /** Formato do material. Vira o selo com ícone no card. */
  tipo: TipoMaterial
  /**
   * Assunto de que o material trata. Aparece como etiqueta e, quando o módulo
   * acumula material, vira filtro. Reaproveite os nomes já em uso em vez de
   * criar sinônimos — a etiqueta só serve se agrupar.
   */
  assuntos?: string[]
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
      'SDD',
      'OpenSpec',
      'ADR',
    ],
    status: 'em-andamento',
    materiais: [
      {
        titulo: 'Harness engineering for coding agent users',
        tipo: 'artigo',
        assuntos: ['Harness'],
        url: 'https://martinfowler.com/articles/harness-engineering.html',
        fonte: 'Birgitta Böckeler e Martin Fowler · abr/2026',
        descricao:
          'A fonte do vocabulário do dia 2: guias e sensores, computacional e inferencial, o loop de direção e a ideia de manter a qualidade à esquerda. Vale reler no Bloco IV, quando avaliação virar o tema.',
      },
      {
        titulo: 'Alavancando o Codex em um mundo centrado no agente',
        tipo: 'artigo',
        assuntos: ['Harness', 'Engenharia de contexto'],
        url: 'https://openai.com/pt-BR/index/harness-engineering/',
        fonte: 'Ryan Lopopolo, OpenAI · fev/2026',
        descricao:
          'Um produto inteiro construído sem código escrito à mão. É de onde vem o argumento do dia 4: o que o agente não lê no contexto não existe. Traz também a crítica ao arquivo monolítico de instruções e a ideia de docs/ como sistema de registro.',
      },
      {
        titulo: 'Context Engineering for Coding Agents: How to Keep AI Out of the "Dumb Zone"',
        tipo: 'artigo',
        assuntos: ['Engenharia de contexto', 'Harness'],
        url: 'https://mattrowe.com/blog/16631073-4603-44db-a3e6-b1c37b67af33',
        fonte: 'Matt Rowe · mai/2026',
        descricao:
          'Notas da palestra de Dex Horthy no AI Engineer. O gargalo do agente em código legado não é a inteligência do modelo, é o contexto: a "zona burra" onde o ruído acumulado degrada a decisão, a compactação intencional como artefato, e o ciclo pesquisar → planejar → implementar. Revisar um plano de 30 linhas é mais barato que revisar um diff de mil.',
      },
      {
        titulo: 'The Anatomy of an Agent Harness',
        tipo: 'artigo',
        assuntos: ['Harness'],
        url: 'https://www.langchain.com/blog/the-anatomy-of-an-agent-harness',
        fonte: 'Vivek Trivedy, LangChain · mar/2026',
        descricao:
          'Aqui "harness" significa outra coisa: tudo que não é o modelo, dentro de um agente. É o vocabulário do Bloco III em diante — guarde para lá, mas vale saber que o mesmo termo tem dois sentidos.',
      },
      {
        titulo: 'Spec-Driven Development na era dos agentes de IA — Parte 1',
        tipo: 'artigo',
        assuntos: ['SDD'],
        url: 'https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-1/',
        fonte: 'Data Science Academy',
        descricao:
          'Abre uma série de cinco partes sobre especificação como fonte de verdade. É a base do dia 4.',
      },
      {
        titulo: 'Spec-Driven Development na era dos agentes de IA — Parte 2',
        tipo: 'artigo',
        assuntos: ['SDD'],
        url: 'https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-2/',
        fonte: 'Data Science Academy',
      },
      {
        titulo: 'Spec-Driven Development na era dos agentes de IA — Parte 3',
        tipo: 'artigo',
        assuntos: ['SDD'],
        url: 'https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-3/',
        fonte: 'Data Science Academy',
      },
      {
        titulo: 'Spec-Driven Development na era dos agentes de IA — Parte 4',
        tipo: 'artigo',
        assuntos: ['SDD'],
        url: 'https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-4/',
        fonte: 'Data Science Academy',
      },
      {
        titulo: 'Spec-Driven Development na era dos agentes de IA — Parte 5',
        tipo: 'artigo',
        assuntos: ['SDD'],
        url: 'https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-5/',
        fonte: 'Data Science Academy',
      },
      {
        titulo: 'Full Walkthrough: Workflow for AI Coding',
        tipo: 'video',
        assuntos: ['SDD'],
        url: 'https://youtu.be/-QFHIoCo-Ko',
        fonte: 'Matt Pocock · AI Engineer',
        descricao: 'O fluxo de trabalho inteiro, do começo ao fim, com o editor aberto.',
      },
      {
        titulo: 'OpenSpec',
        tipo: 'doc',
        assuntos: ['OpenSpec', 'SDD'],
        url: 'https://openspec.dev/',
        fonte: 'openspec.dev',
        descricao:
          'A ferramenta que vocês vão inicializar no dia 4. Framework leve de spec-driven para agentes de código e CLIs, open source e sem chave de API.',
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
