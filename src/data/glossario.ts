export type Termo = {
  termo: string
  /** Termo original em inglês, quando existir. */
  original?: string
  /** Tradução, sigla ou qualificador que acompanha o original. */
  traducao?: string
  definicao: string
  /** Comentário que se aplica ao termo ou ao par que ele fecha. */
  nota?: string
}

export type SecaoGlossario = {
  id: string
  numero: string
  titulo: string
  termos: Termo[]
}

export const introGlossario =
  'Termos em inglês vêm com tradução na primeira ocorrência. Organizado por área, não alfabeticamente — a ordem segue a lógica de quem está aprendendo.'

export const glossario: SecaoGlossario[] = [
  {
    id: 'modelos-de-linguagem',
    numero: '1',
    titulo: 'Modelos de linguagem',
    termos: [
      {
        termo: 'Token',
        definicao:
          'A unidade em que o modelo enxerga texto. Não é palavra nem letra: fica no meio. "Higiênico" pode virar vários tokens; acento em português costuma custar caro. Tudo é cobrado e limitado em tokens.',
      },
      {
        termo: 'Tokenizador',
        original: 'tokenizer',
        definicao: 'O componente que quebra texto em tokens e faz o caminho de volta.',
      },
      {
        termo: 'Janela de contexto',
        original: 'context window',
        definicao:
          'Quantos tokens o modelo consegue considerar de uma vez. Entrada e saída somadas. É o limite físico que motiva quase toda arquitetura de recuperação.',
      },
      {
        termo: 'Parâmetro',
        original: 'parameter',
        definicao:
          'Os números aprendidos durante o treino. "7B" significa 7 bilhões deles. Determina o que cabe na memória: mais parâmetros geralmente significa mais capacidade, mais custo e mais latência.',
      },
      {
        termo: 'Modelo de linguagem',
        original: 'language model',
        definicao:
          'Qualquer modelo que atribui probabilidade a sequências de texto. Categoria ampla e antiga.',
      },
      {
        termo: 'LLM',
        original: 'large language model',
        traducao: 'modelo de linguagem grande',
        definicao:
          'Modelo de linguagem com muitos parâmetros, treinado em corpus massivo. Na prática, o que se usa hoje.',
      },
      {
        termo: 'SLM',
        original: 'small language model',
        traducao: 'modelo de linguagem pequeno',
        definicao:
          'O irmão menor. Roda local, custa pouco, responde rápido. Bom para tarefas estreitas: classificar intenção, extrair campo, rotear.',
      },
      {
        termo: 'Modelo de fundação',
        original: 'foundation model',
        definicao:
          'Modelo treinado em larga escala para servir de base a muitas tarefas, não a uma só. Nem todo modelo de fundação é de linguagem: existem para imagem, áudio, série temporal.',
      },
      {
        termo: 'Temperatura',
        original: 'temperature',
        definicao:
          'Controla o quanto o modelo se arrisca na escolha do próximo token. Zero tende ao determinístico; valores altos aumentam variedade e alucinação.',
      },
      {
        termo: 'Alucinação',
        original: 'hallucination',
        definicao:
          'Quando o modelo produz algo plausível e falso com a mesma confiança de algo verdadeiro. Não é bug: é consequência de ser um preditor de texto, não uma base de fatos.',
      },
      {
        termo: 'Quantização',
        original: 'quantization',
        definicao:
          'Reduzir a precisão numérica dos parâmetros para caber em menos memória. Troca-se um pouco de qualidade por viabilidade de rodar local.',
      },
    ],
  },
  {
    id: 'arquitetura-de-modelos',
    numero: '2',
    titulo: 'Arquitetura de modelos',
    termos: [
      {
        termo: 'Atenção',
        original: 'attention',
        definicao:
          'Mecanismo que permite a cada token olhar diretamente para todos os outros e pesar quais importam. Intuição: uma média ponderada em que os pesos são calculados na hora, pelo conteúdo.',
      },
      {
        termo: 'Transformer',
        definicao:
          'A arquitetura construída em torno da atenção. Substituiu a RNN por processar a sequência inteira em paralelo, em vez de palavra por palavra.',
      },
      {
        termo: 'RNN',
        original: 'recurrent neural network',
        traducao: 'rede neural recorrente',
        definicao:
          'Arquitetura anterior, que lia sequencialmente e carregava um resumo do que já viu. Falhava em sequências longas: o começo se perdia. Essa falha é o que motivou a atenção.',
      },
      {
        termo: 'Embedding',
        original: 'embedding',
        traducao: 'vetor de significado',
        definicao:
          'Representação de um texto como lista de números, construída de forma que textos com sentido parecido fiquem próximos. É um espaço de características, com a diferença de ter sido aprendido em vez de desenhado à mão.',
      },
      {
        termo: 'Similaridade de cosseno',
        original: 'cosine similarity',
        definicao:
          'Medida de proximidade entre dois embeddings. Olha o ângulo, não o tamanho — o que importa é a direção do significado.',
      },
      {
        termo: 'Pré-treino',
        original: 'pretraining',
        definicao:
          'A fase em que o modelo aprende linguagem a partir de texto massivo. Dá capacidade, não julgamento.',
      },
      {
        termo: 'Ajuste fino',
        original: 'fine-tuning',
        definicao:
          'Continuar o treino com dados específicos para especializar o modelo. Raramente é a primeira resposta: prompting e recuperação costumam resolver antes, mais barato.',
      },
      {
        termo: 'LoRA',
        original: 'low-rank adaptation',
        definicao:
          'Técnica de ajuste fino que treina poucos parâmetros adicionais em vez do modelo inteiro. Barata o suficiente para rodar em hardware modesto.',
      },
      {
        termo: 'Alinhamento',
        original: 'alignment',
        definicao:
          'Ajustar o comportamento do modelo para ser útil, seguro e honesto. Acontece depois do pré-treino, por técnicas de preferência.',
      },
      {
        termo: 'Modelo de recompensa',
        original: 'reward model',
        definicao:
          'Modelo treinado a partir de comparações humanas para pontuar respostas. Aprende preferência, não verdade — distinção que importa.',
      },
    ],
  },
  {
    id: 'agentes',
    numero: '3',
    titulo: 'Agentes',
    termos: [
      {
        termo: 'Agente',
        original: 'agent',
        definicao:
          'Sistema que percebe, decide e age em busca de um objetivo. No contexto de LLM: modelo dentro de um loop, com ferramentas, feedback do ambiente e critério de parada.',
      },
      {
        termo: 'Fluxo de trabalho',
        original: 'workflow',
        definicao:
          'Sequência de passos definida por quem programou. O caminho é fixo. Pode ter LLM em cada passo e ainda assim não ser agente.',
      },
      {
        termo: 'A diferença',
        definicao:
          'Em workflow, você decide o caminho; em agente, parte da decisão de caminho acontece em tempo de execução, influenciada pelo modelo.',
      },
      {
        termo: 'Ferramenta',
        original: 'tool',
        definicao:
          'Função que o agente pode invocar para agir no mundo: buscar, calcular, consultar banco, chamar API.',
      },
      {
        termo: 'Chamada de ferramenta',
        original: 'tool call / function calling',
        definicao:
          'Capacidade do modelo de produzir uma saída estruturada pedindo a execução de uma função com argumentos específicos. Exige modelo treinado para isso, provedor que exponha a API, e as ferramentas declaradas na chamada.',
      },
      {
        termo: 'Loop de raciocínio-ação',
        original: 'reason-act loop',
        definicao:
          'O ciclo básico: pensar, agir, observar o resultado, repensar. É o que separa agente de chamada única.',
      },
      {
        termo: 'Terminação',
        original: 'termination',
        definicao:
          'A condição que encerra o loop. Sem ela, o agente gira indefinidamente queimando dinheiro.',
      },
      {
        termo: 'Humano no circuito',
        original: 'human-in-the-loop',
        definicao:
          'Pontos em que o sistema para e pede confirmação ou esclarecimento a uma pessoa. Não é limitação: é reconhecer que o sistema não sabe.',
      },
      {
        termo: 'Multiagente',
        original: 'multi-agent system',
        traducao: 'MAS',
        definicao: 'Vários agentes especializados colaborando. Um supervisor costuma coordenar.',
      },
      {
        termo: 'Supervisor',
        definicao: 'O agente que lê a tarefa e decide qual especialista aciona.',
      },
      {
        termo: 'Passagem de bastão',
        original: 'handoff',
        definicao:
          'A transferência de trabalho entre agentes, com o contexto que o próximo precisa.',
      },
      {
        termo: 'Autonomia orquestrada',
        original: 'orchestrated autonomy',
        definicao:
          'O que existe hoje: o agente escolhe entre caminhos previstos, mas não redesenha a própria arquitetura.',
      },
    ],
  },
  {
    id: 'maquinas-de-estado-e-grafos',
    numero: '4',
    titulo: 'Máquinas de estado e grafos',
    termos: [
      {
        termo: 'Estado, no sentido de posição',
        original: 'state',
        definicao: 'Onde o sistema está agora. Uma parada no mapa. Sempre uma por vez.',
      },
      {
        termo: 'Estado, no sentido de dado',
        original: 'state',
        definicao:
          'A informação que o sistema carrega enquanto anda. A mesma palavra para duas coisas; distinguir evita muita confusão.',
      },
      {
        termo: 'Evento',
        original: 'event',
        definicao: 'O que acontece e provoca a mudança de posição.',
      },
      {
        termo: 'Transição',
        original: 'transition',
        definicao: 'A passagem de um estado a outro.',
      },
      {
        termo: 'Guarda',
        original: 'guard',
        definicao:
          'Verificação que decide se a transição pode ocorrer. Responde sim ou não; não muda nada sozinha.',
      },
      {
        termo: 'Ação',
        original: 'action',
        definicao: 'O trabalho executado durante a transição.',
      },
      {
        termo: 'FSM',
        original: 'finite state machine',
        traducao: 'máquina de estado finita',
        definicao:
          'Modelo com um número contável de estados e transições definidas. Plana, sem aninhamento.',
      },
      {
        termo: 'HSM',
        original: 'hierarchical state machine',
        traducao: 'máquina de estado hierárquica',
        definicao:
          'FSM com estados dentro de estados. Cura a explosão combinatória e a duplicação de política.',
      },
      {
        termo: 'Superestado',
        original: 'superstate',
        definicao:
          'Estado que agrupa outros e concentra a política comum, escrita uma vez e herdada.',
      },
      {
        termo: 'Subestado',
        original: 'substate',
        definicao: 'Estado que vive dentro de um superestado.',
      },
      {
        termo: 'Histórico',
        original: 'history',
        definicao:
          'Marcador que lembra qual subestado estava ativo, para retomar de lá. Raso lembra o filho direto; profundo lembra a cadeia inteira.',
      },
      {
        termo: 'Região paralela',
        original: 'parallel region',
        definicao: 'Sub-regiões que avançam ao mesmo tempo dentro de um superestado.',
      },
      {
        termo: 'Bifurcação e junção',
        original: 'fork e join',
        definicao: 'Abrir caminhos paralelos e esperar todos terminarem.',
      },
      {
        termo: 'Explosão de estados',
        original: 'state explosion',
        definicao:
          'O crescimento exponencial de estados quando se adicionam modos independentes a uma máquina plana. É a dor que a hierarquia resolve.',
      },
      {
        termo: 'Grafo',
        original: 'graph',
        definicao:
          'Conjunto de vértices e arestas. Uma máquina de estado desenhada é um grafo.',
      },
      {
        termo: 'Grafo dirigido',
        original: 'directed graph',
        definicao: 'As arestas têm sentido. A → B não implica B → A.',
      },
      {
        termo: 'Ciclo',
        original: 'cycle',
        definicao:
          'Caminho que retorna ao ponto de partida. É o que permite ao agente repensar; sem ciclo, há pipeline, não agência.',
      },
      {
        termo: 'DAG',
        original: 'directed acyclic graph',
        traducao: 'grafo dirigido acíclico',
        definicao:
          'Grafo dirigido sem ciclos. Bom para pipelines de dados, insuficiente para agentes.',
      },
      {
        termo: 'Grau de saída',
        original: 'out-degree',
        definicao:
          'Quantas arestas saem de um nó. Grau ≥ 2 é a condição estrutural para haver escolha.',
      },
      {
        termo: 'Alcançabilidade',
        original: 'reachability',
        definicao:
          'Se existe caminho de um nó a outro. Serve para auditar o grafo antes de rodar: todo nó é alcançável? todo caminho chega ao fim?',
      },
      {
        termo: 'Matriz de adjacência',
        original: 'adjacency matrix',
        definicao:
          'Representação do grafo em tabela. A tabela de transições de uma FSM é exatamente isso.',
      },
    ],
  },
  {
    id: 'langgraph',
    numero: '5',
    titulo: 'LangGraph',
    termos: [
      {
        termo: 'StateGraph',
        definicao: 'O desenho do grafo, ainda não executável. A planta.',
      },
      {
        termo: 'compile()',
        definicao:
          'Transforma a planta em algo que roda. Depois de compilado, um grafo se comporta como um nó e pode ser aninhado.',
      },
      {
        termo: 'Nó',
        original: 'node',
        definicao:
          'Função que recebe o estado e devolve o estado atualizado. O nó age; não decide para onde ir.',
      },
      {
        termo: 'Aresta',
        original: 'edge',
        definicao:
          'A ligação entre nós. Fixa (add_edge) ou condicional (add_conditional_edges).',
      },
      {
        termo: 'Roteador',
        original: 'router',
        definicao:
          'A função da aresta condicional que lê o estado e escolhe o destino. É o guard determinístico que doma o não-determinismo do modelo.',
      },
      {
        termo: 'Redutor',
        original: 'reducer',
        definicao:
          'Regra que define como fundir escritas concorrentes num campo do estado. add_messages empilha em vez de sobrescrever.',
      },
      {
        termo: 'Checkpoint',
        original: 'checkpoint',
        definicao:
          'Foto do estado salva na fronteira limpa entre nós. Permite retomar sem refazer.',
      },
      {
        termo: 'Checkpointer',
        definicao: 'O componente que salva os checkpoints. MemorySaver é o mais simples.',
      },
      {
        termo: 'Thread',
        definicao:
          'Identificador de uma execução. Threads diferentes percorrem o mesmo grafo sem se misturar.',
      },
      {
        termo: 'Subgrafo',
        original: 'subgraph',
        definicao:
          'Grafo usado como nó de outro grafo. É o superestado da HSM. O "sub" significa contido dentro, não inferior.',
      },
    ],
  },
  {
    id: 'recuperacao-e-conhecimento',
    numero: '6',
    titulo: 'Recuperação e conhecimento',
    termos: [
      {
        termo: 'RAG',
        original: 'retrieval-augmented generation',
        traducao: 'geração aumentada por recuperação',
        definicao:
          'Buscar informação relevante e injetá-la no contexto antes de gerar. Nasce da restrição da janela de contexto.',
      },
      {
        termo: 'Recuperação',
        original: 'retrieval',
        definicao: 'A etapa de buscar. É onde mora a maioria dos erros de RAG.',
      },
      {
        termo: 'Fatiamento',
        original: 'chunking',
        definicao:
          'Quebrar documentos em pedaços indexáveis. Onde cortar muda o que se consegue recuperar.',
      },
      {
        termo: 'Indexação',
        original: 'indexing',
        definicao: 'Organizar os embeddings para busca rápida.',
      },
      {
        termo: 'Top-k',
        definicao: 'Quantos resultados trazer. Aumentar melhora o recall e piora a precisão.',
      },
      {
        termo: 'Busca léxica',
        original: 'lexical search',
        definicao: 'Busca por palavra. Boa para termos raros e exatos; cega para sinônimos.',
      },
      {
        termo: 'BM25',
        definicao: 'Algoritmo clássico de busca léxica por relevância.',
      },
      {
        termo: 'Busca híbrida',
        original: 'hybrid search',
        definicao:
          'Combinar léxica e semântica. Léxico pega o exato, vetorial pega o parafraseado.',
      },
      {
        termo: 'Reordenação',
        original: 're-ranking',
        definicao:
          'Passar os candidatos recuperados por um segundo modelo, mais caro e mais preciso, para ordenar melhor.',
      },
      {
        termo: 'Taxonomia',
        original: 'taxonomy',
        definicao: 'Classificação hierárquica. Só diz o que é tipo do quê.',
      },
      {
        termo: 'Ontologia',
        original: 'ontology',
        definicao:
          'Especificação formal do que existe num domínio e como as coisas se relacionam. Vai além da hierarquia: inclui relações, propriedades e restrições, e permite inferência.',
      },
      {
        termo: 'Inferência',
        original: 'inference',
        traducao: 'no sentido ontológico',
        definicao: 'Deduzir fatos não escritos a partir das regras da ontologia.',
      },
      {
        termo: 'Grafo de conhecimento',
        original: 'knowledge graph',
        definicao: 'Representação do domínio como entidades e relações.',
      },
      {
        termo: 'GraphRAG',
        definicao:
          'Recuperar por travessia de grafo em vez de só por vizinhança vetorial. Responde perguntas de relação, que a similaridade não alcança.',
      },
    ],
  },
  {
    id: 'avaliacao',
    numero: '7',
    titulo: 'Avaliação',
    termos: [
      {
        termo: 'Conjunto de avaliação',
        original: 'evaluation set / dataset',
        definicao:
          'Perguntas com resposta esperada, usadas para medir o sistema. É um contrato de qualidade versionado.',
      },
      {
        termo: 'Gabarito',
        original: 'ground truth',
        definicao: 'A resposta considerada correta.',
      },
      {
        termo: 'Linha de base',
        original: 'baseline',
        definicao:
          'O ponto de comparação. Pode ser uma versão anterior do sistema ou o processo humano que ele substitui.',
      },
      {
        termo: 'Precisão',
        original: 'precision',
        definicao: 'Dos resultados retornados, quantos eram certos.',
      },
      {
        termo: 'Recall',
        original: 'recall',
        traducao: 'abrangência',
        definicao: 'Dos certos que existiam, quantos foram retornados.',
      },
      {
        termo: 'Regressão',
        original: 'regression',
        definicao:
          'Quando uma mudança melhora uma coisa e piora outra. Invisível a olho nu, óbvia numa suíte.',
      },
      {
        termo: 'Avaliação determinística',
        definicao:
          'Verificação por código, sem modelo. Barata, rápida, não alucina. Deve vir primeiro.',
      },
      {
        termo: 'LLM como juiz',
        original: 'LLM-as-judge',
        definicao:
          'Usar um modelo para avaliar saídas que não dão para checar por código.',
      },
      {
        termo: 'Calibração circular',
        definicao:
          'Erro grave: calibrar um detector usando as mesmas amostras que motivaram sua criação. O resultado parece ótimo e não generaliza.',
      },
      {
        termo: 'Portão de avaliação',
        original: 'evaluation gate',
        definicao: 'Regra que bloqueia o deploy se a suíte regredir.',
      },
      {
        termo: 'Deriva',
        original: 'drift',
        definicao:
          'Degradação ao longo do tempo. Pode vir dos dados ou de o fornecedor atualizar o modelo sem aviso.',
      },
    ],
  },
  {
    id: 'observabilidade',
    numero: '8',
    titulo: 'Observabilidade',
    termos: [
      {
        termo: 'Traço',
        original: 'trace',
        definicao: 'O registro completo de uma execução, do início ao fim.',
      },
      {
        termo: 'Vão',
        original: 'span',
        definicao:
          'Uma etapa dentro do traço. Spans se aninham, formando uma árvore que espelha a estrutura do sistema.',
      },
      {
        termo: 'Cardinalidade alta',
        original: 'high cardinality',
        definicao:
          'Campos com muitos valores distintos, como identificador de usuário ou de execução. É onde mora o diagnóstico: a média esconde o caso individual.',
      },
      {
        termo: 'Desconhecidos desconhecidos',
        original: 'unknown unknowns',
        definicao:
          'Falhas que você não previu e portanto não instrumentou. Motivam registrar evento rico em vez de métrica pré-agregada.',
      },
      {
        termo: 'OpenTelemetry',
        original: 'OTel',
        definicao:
          'Padrão aberto de instrumentação. Instrumentar uma vez, trocar o backend depois.',
      },
      {
        termo: 'OTLP',
        definicao: 'O protocolo de transporte do OpenTelemetry.',
      },
      {
        termo: 'Coletor',
        original: 'collector',
        definicao:
          'Componente intermediário que recebe telemetria e a distribui para destinos.',
      },
      {
        termo: 'Neutralidade de fornecedor',
        original: 'vendor neutrality',
        definicao:
          'Não amarrar a instrumentação a um produto. Instrumentação é investimento longo; backend é substituível.',
      },
      {
        termo: 'Cadeia de custódia',
        original: 'chain of custody',
        definicao:
          'Sequência de registros que prova a integridade e a origem de uma evidência. Aplicada a traços, exige imutabilidade e ordem verificável.',
      },
      {
        termo: 'Paradigma indiciário',
        original: 'evidential paradigm',
        definicao:
          'Inferir o não-observável a partir de rastros marginais e involuntários. Um rastro só é indício quando existe um quadro que o torne significativo.',
      },
    ],
  },
  {
    id: 'engenharia-e-operacao',
    numero: '9',
    titulo: 'Engenharia e operação',
    termos: [
      {
        termo: 'Especificação orientando o desenvolvimento',
        original: 'spec-driven development',
        definicao:
          'Descrever e acordar a mudança antes de implementar. A especificação é a fonte de verdade; o código a segue.',
      },
      {
        termo: 'Escopo e não-escopo',
        original: 'scope, out of scope',
        definicao:
          'O que uma entrega inclui e o que ela deliberadamente deixa de fora. Declarar o não-escopo evita a discussão de "achei que isso estava incluído" — e custa uma linha.',
      },
      {
        termo: 'Requisito não-funcional',
        original: 'non-functional requirement',
        definicao:
          'Exigência sobre como o sistema deve ser, não sobre o que deve fazer: quem consegue usar, quanto pode demorar, quanto pode custar, o que acontece quando falha.',
        nota: 'Costuma ser subestimado e é o que mais mata solução. Uma ferramenta de autoatendimento pode responder a todos os requisitos funcionais do Bom Preço e morrer num único não-funcional: o dono não quer aprender a mexer em nada.',
      },
      {
        termo: 'Engenharia de contexto',
        original: 'context engineering',
        definicao:
          'Organizar deliberadamente o que um modelo vai ler quando for trabalhar. Especificação, documentação versionada e estrutura de repositório deixam de ser disciplina de processo e viram entrada do sistema. O que o agente não consegue ler no contexto não existe.',
      },
      {
        termo: 'Harness',
        original: 'harness',
        traducao: 'arreio',
        definicao:
          'O conjunto de controles que torna o caminho correto o caminho fácil. Não descreve o processo: impõe o processo. Documentação ensina; o harness obriga.',
        nota: 'A palavra tem dois usos, em escalas diferentes. Ao redor de quem trabalha: os scripts e verificações que governam o processo. Dentro de um agente: tudo que não é o modelo — sistema de arquivos, ferramentas, sandbox, memória, orquestração. A ideia é a mesma: o que cerca e regula algo que sozinho não se governa.',
      },
      {
        termo: 'Guia',
        original: 'guide',
        traducao: 'controle de antecipação',
        definicao:
          'A metade do harness que age antes. Tenta fazer a coisa sair certa na primeira tentativa: script de setup, convenção documentada, template, tipo declarado.',
      },
      {
        termo: 'Sensor',
        original: 'sensor',
        traducao: 'controle de retorno',
        definicao:
          'A metade que age depois. Observa o resultado e aponta o que saiu errado: teste, linter, verificação, suíte de avaliação. Um sensor é mais útil quando sua mensagem já diz como corrigir.',
        nota: 'Um sem o outro não funciona. Só guias, e você nunca descobre se as regras pegaram. Só sensores, e você repete o mesmo erro para sempre.',
      },
      {
        termo: 'Controle computacional',
        definicao:
          'Determinístico e rápido, executado pela CPU. Teste, linter, verificador de tipo, análise estrutural. Milissegundos, resultado confiável. Vem sempre primeiro.',
      },
      {
        termo: 'Controle inferencial',
        definicao:
          'Julgamento semântico, executado por um modelo. Revisão automática, modelo como juiz. Mais lento, mais caro, não determinístico. Serve para o que não dá para checar por código.',
      },
      {
        termo: 'Loop de direção',
        original: 'steering loop',
        definicao:
          'A prática de melhorar o harness quando um problema se repete. Na primeira vez, conserta e segue; na segunda, pergunta-se que guia teria evitado e que sensor teria pego. É o que faz o harness ser dirigido em vez de configurado uma vez.',
      },
      {
        termo: 'Manter a qualidade à esquerda',
        original: 'shift left',
        definicao:
          'Posicionar cada verificação o mais cedo possível no ciclo. Quanto antes o sensor dispara, mais barato o conserto. Verificação rápida antes do commit; verificação cara depois da integração.',
      },
      {
        termo: 'Caminho feliz',
        original: 'happy path',
        definicao:
          'A sequência de passos que leva ao resultado esperado quando tudo funciona. O trabalho do harness é fazer com que sair dele exija esforço deliberado.',
      },
      {
        termo: 'Verificação de ambiente',
        original: 'setup check',
        definicao:
          'Script que confirma que o ambiente está utilizável antes do trabalho começar. Verificar que a variável existe não é verificação: é preciso fazer a chamada real e confirmar que responde.',
      },
      {
        termo: 'Deriva',
        original: 'drift',
        definicao:
          'O afastamento gradual entre o que o sistema deveria ser e o que ele virou. Acumula em silêncio e não dispara erro. Combate-se com sensores que rodam continuamente, fora do ciclo de mudança.',
      },
      {
        termo: 'Reprodutibilidade',
        original: 'reproducibility',
        definicao:
          'Propriedade de um processo que, a partir do mesmo dado bruto, produz sempre o mesmo resultado. É o que torna o artefato derivado descartável e o dado bruto imutável.',
      },
      {
        termo: 'Relatório de processo',
        original: 'process report',
        definicao:
          'O registro do que uma etapa fez: quantos itens entraram, quantos foram corrigidos, quantos ficaram de fora e por quê. Substitui "confiar que deu certo" por evidência de que deu.',
      },
      {
        termo: 'ADR',
        original: 'architecture decision record',
        traducao: 'registro de decisão de arquitetura',
        definicao:
          'Documento curto que registra contexto, opções, decisão e consequências. Imutável: mudar de ideia gera outro ADR.',
      },
      {
        termo: 'Injeção de prompt',
        original: 'prompt injection',
        definicao:
          'Ataque em que instruções maliciosas chegam pelo conteúdo que o modelo lê. Pedir ao modelo para ignorar não é controle de segurança.',
      },
      {
        termo: 'Privilégio mínimo',
        original: 'least privilege',
        definicao:
          'Dar ao sistema só a permissão de que precisa. Conexão somente-leitura é o exemplo mais direto.',
      },
      {
        termo: 'Cache de prompt',
        original: 'prompt caching',
        definicao: 'Reaproveitar a parte fixa do contexto entre chamadas, reduzindo custo.',
      },
      {
        termo: 'Teto de orçamento',
        original: 'budget cap',
        definicao: 'Limite de gasto por execução ou por período, aplicado como guarda.',
      },
      {
        termo: 'Idempotência',
        original: 'idempotency',
        definicao:
          'Propriedade de uma operação que pode ser repetida sem efeito adicional. Importa quando há retentativa.',
      },
      {
        termo: 'Imutabilidade',
        original: 'immutability',
        definicao:
          'Não alterar o dado no lugar; produzir uma versão nova. É o que torna checkpoint, ramificação e auditoria possíveis.',
      },
      {
        termo: 'Retorno sobre investimento',
        original: 'ROI',
        definicao:
          'Relação entre o ganho e o custo. Em automação, o ganho se decompõe em custo evitado, tempo liberado e perda evitada — com credibilidades diferentes.',
      },
      {
        termo: 'Assimetria de custo de erro',
        definicao:
          'Errar para mais e errar para menos custam coisas diferentes. Define se vale otimizar precisão ou recall.',
      },
    ],
  },
]

export const totalDeTermos = glossario.reduce((soma, secao) => soma + secao.termos.length, 0)
