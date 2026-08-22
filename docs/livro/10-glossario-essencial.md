# Glossário essencial

Este glossário é uma porta de entrada. O site mantém uma
[referência ampliada](https://erick-marinho.github.io/do-zero-ao-agente/glossario) com termos de
modelos, contexto, arquitetura, avaliação e segurança.

## Agentes e contexto

### Agente — *agent*

Sistema que combina um modelo com estado, ferramentas e um ciclo de observação e ação para perseguir
um objetivo.

### Janela de contexto — *context window*

Quantidade de informação que o modelo consegue considerar numa execução. Não deve ser confundida
com memória permanente.

### Engenharia de contexto — *context engineering*

Prática de selecionar, estruturar, disponibilizar, comprimir e descartar a informação usada por um
agente ao longo do trabalho.

### Context pack — pacote de contexto

Conjunto mínimo suficiente de objetivo, restrições, memória relevante, estado atual e validações para
uma unidade de trabalho.

### Context rot — apodrecimento do contexto

Degradação de desempenho associada ao acúmulo de histórico, ruído, hipóteses e saídas de ferramentas.

### Smart Zone — zona inteligente

Faixa informal em que o contexto permanece relevante e coerente o suficiente para o modelo manter
objetivo, restrições e decisões com boa qualidade. É um modelo mental, não um modo interno oficial.

### Dumb Zone — zona de degradação

Nome informal para a região em que ruído, contradições e complexidade acumulada começam a degradar
visivelmente o trabalho. Não possui um percentual universal e não significa perda permanente de
capacidade do modelo.

### Compaction — compactação

Recurso do harness que reduz o contexto da conversa preservando estado para continuar um trabalho
longo. Pode ser legítimo dentro da mesma fase e do mesmo objetivo. Em mudanças de fase, este livro
prefere handoff explícito, limpeza e reidratação, porque a próxima etapa precisa de estado selecionado
e auditável.

### Rehydration — reidratação de contexto

Reconstrução de uma janela nova e limpa carregando somente os artefatos necessários para a próxima
etapa: contrato da task, fontes selecionadas e estado atual do código.

### Progressive disclosure — divulgação progressiva

Estratégia de revelar detalhes apenas quando eles se tornam relevantes, usando pontos de entrada e
referências em vez de carregar tudo no início.

## Memória e continuidade

### Project memory — memória de projeto

Conhecimento passado que sobrevive à sessão, preserva proveniência, pode ser recuperado e
reavaliado, pode perder relevância, ser substituído ou esquecido e, com autoridade adequada, pode
ser promovido para regra ou sensor. Não é sinônimo de conversa armazenada.

### Session — sessão

História detalhada de uma execução, incluindo observações, tentativas, correções e caminhos
descartados. Pode ser preservada para auditoria sem ser carregada ou tratada como memória confiável.

### Retrieval — recuperação de memória

Seleção de memórias candidatas para a tarefa atual por texto, entidades, links, recência ou
similaridade. Relevância no ranking não prova verdade nem concede autoridade.

### Retention — retenção

Política que define por quanto tempo um registro permanece disponível e em quais condições perde
prioridade, é arquivado ou removido.

### Supersession — substituição por versão posterior

Relação que preserva a proveniência de uma memória antiga, mas aponta outra como versão vigente. É
útil quando apagar a história seria ruim e tratar as duas versões como atuais seria pior.

### Rule — regra

Conhecimento aprovado que deve governar ações futuras e vive numa fonte canônica, como
`AGENTS.md`, SPEC, ADR, Skill ou sensor. Memória recuperada não vira regra automaticamente.

## Produto e capacidade

### PRD — *Product Requirements Document*

Documento de requisitos do produto. Define o problema, para quem, qual resultado precisa ser
observável e como a tese será avaliada. Não escolhe tecnologia, estrutura de código nem lista de
tasks.

### HLD — *High-Level Design*

Desenho de alto nível. Mapa das grandes responsabilidades do sistema, das informações que possuem e
de como colaboram para realizar as jornadas do usuário. Não começa por camadas ou padrões: essas
estruturas só aparecem quando um ADR aceito as justifica.

### ADR — *Architecture Decision Record*

Registro de decisão arquitetural: preserva uma escolha durável, seu contexto, as alternativas
consideradas e suas consequências. Sem alternativas registradas, não é uma decisão — é uma
declaração.

### Gate — portão de passagem

Condição de saída verificável entre dois níveis de decisão. Não é aprovação burocrática: é uma
frase que você consegue completar, ou não.

### Baseline — linha de base

Versão de um documento aprovada por decisão humana, que serve de referência até que uma evidência a
mude. Não é a versão final nem um rascunho: é o suficiente para começar.

### Jornada do usuário — *user journey*

Caminho percorrido pela pessoa: história em etapas que começa com uma necessidade e termina com um
resultado percebido. Vive no PRD, do lado do destino. Não confundir com [jornada do
trabalho](#jornada-do-trabalho).

### Jornada do trabalho

Estado das tasks no quadro kanban — em que ponto da construção estamos agora. É **estado**, não
prosa, e vive no quadro, não no PRD. A jornada do usuário é o que construímos; a jornada do
trabalho é como construímos.

### Caso de uso de referência

Exemplo concreto e representativo de uma jornada do usuário, escolhido como prova principal.
Responde “qual situação específica usaremos para demonstrar que funciona?”.

### Fluxo esperado

Passos, decisões, entradas e saídas necessários para executar o caso de uso de referência,
incluindo desvios. É o nível mais preciso dos três.

### Capacidade

Habilidade que o sistema precisa possuir para realizar uma etapa da jornada do usuário, escrita
como “o sistema precisa ser capaz de <verbo + objeto + condição observável>”. Sobrevive à troca da
tecnologia; se desaparece quando a biblioteca muda, era mecanismo, não capacidade.

### Mapa de capacidades

Lista e dependências das capacidades necessárias para realizar o PRD. Não é backlog: responde
quais habilidades existem e quais dependem de quais, não em que ordem serão construídas.

### Responsabilidade lógica

Grupo coerente de comportamento e informação no HLD. Ainda não é pasta, classe, processo ou
serviço; o nome descreve o que a parte deve garantir.

### Fronteira

Linha do desenho onde muda o controle, o dono ou a confiança. Do lado de cá você projeta; do lado
de lá você negocia contrato e trata falha. Fronteira sem essas três mudanças costuma ser custo de
indireção sem proteção.

### Matriz de reconstrução

Auditoria descartável de rastreabilidade, usada quando os documentos nasceram fora de ordem. Uma
linha por elemento existente, classificando cada ligação em `CONFIRMADO`, `RECONSTRUÍDO`,
`DESCONHECIDO`, `CONFLITO` ou `ÓRFÃO`. Vive até a próxima baseline aprovada e não vira arquivo do
repositório.

## Especificação e trabalho

### SDD — *Spec-Driven Development*

Desenvolvimento orientado por especificação: usa contratos de comportamento como âncora para
planejamento, implementação e verificação.

### SPEC — *specification*

Âncora de intenção que define comportamentos, contratos ou invariantes cuja ambiguidade tem custo,
de forma observável e testável sempre que possível. Não precisa representar toda a implementação
nem funcionar como fonte da realidade atual.

### Acceptance criteria — critérios de aceitação

Resultados observáveis necessários para considerar uma mudança aceita.

### Research — pesquisa

Investigação delimitada para reduzir incerteza. **Discovery Research** vem antes da SPEC quando a
realidade ainda não permite especificar com segurança; **Implementation/Brownfield Research** vem
depois da SPEC quando o comportamento desejado é conhecido, mas o sistema atual ainda precisa ser
mapeado para planejar a mudança.

### Vertical slice — fatia vertical

Unidade de trabalho que atravessa as camadas necessárias para produzir um comportamento verificável.

### Tracer bullet — projétil traçante

Primeira fatia fina, integrada e verificável que prova cedo se o caminho de ponta a ponta funciona.

### DAG — *Directed Acyclic Graph*

Grafo direcionado acíclico. Representa tasks e suas dependências sem criar ciclos.

### Kanban — quadro de tarefas

Quadro que materializa o grafo de tasks em colunas de estado (backlog, ready, in progress, in
review, QA, done), com relações de bloqueio explícitas. No ciclo deste livro é o documento da
[jornada do trabalho](#jornada-do-trabalho); a SPEC ou o PRD descrevem o destino. Ferramentas como
Linear e GitHub Issues implementam esse quadro.

## Harness e qualidade

### Harness — arnês ou estrutura de controle

Ambiente operacional ao redor de um modelo que oferece estado, ferramentas, contexto, sensores,
feedback e limites. No recorte de coding agents, também pode significar a camada externa que a
equipe constrói no repositório. Não substitui práticas tradicionais de engenharia de software.

### Guide — guia

Controle de **feedforward** que orienta antes da ação, como SPEC, `AGENTS.md`, Skill ou documento.

### Sensor — sensor

Controle de **feedback** que observa o resultado e detecta desvios, como teste, linter, typecheck ou
revisão. O agente ou o humano interpreta o feedback e executa a correção; o sensor não corrige.

### Harnessability

Grau em que um sistema é legível, controlável e verificável por meio de guides e sensors.

### Executable knowledge — conhecimento executável

Regra codificada em teste, tipo, linter, schema ou restrição que o ambiente consegue aplicar.

### Shift left — deslocar para a esquerda

Mover a detecção de problemas para etapas mais cedo e baratas do ciclo de entrega.

### Feature closure — fechamento da feature

Reconciliação final entre SPEC, tasks, implementação e evidências antes de declarar a mudança pronta.

### Sensor Gate — portão de decisão sobre sensores

Revisão explícita, dentro de uma task, que pergunta como uma regressão do comportamento alterado
será detectada depois. Pode decidir reutilizar, criar ou fortalecer um sensor, abrir uma task de
harness ou justificar por que nenhum sensor adicional é proporcional ao risco.

### Memory promotion — promoção de memória

Transformação de uma descoberta local em memória durável, procedural ou executável quando ela tem
valor futuro recorrente e é sustentada por autoridade, atualidade, escopo, proveniência e evidência.

### Complexity/Ceremony Budget — orçamento de complexidade ou cerimônia

Limite para o custo acumulado de documentos, reviews, agentes, workflows e outras camadas de
coordenação. Cada camada deve tornar um erro ou risco concreto menos provável para pagar seu custo.

## Coordenação

### Scout — explorador

Subagente que responde uma pergunta delimitada e retorna findings com evidências, mantendo a
exploração detalhada fora do contexto principal.

### Worker — executor

Agente responsável por uma unidade de trabalho verificável.

### Reviewer — revisor

Agente ou humano que avalia uma mudança contra critérios e riscos definidos, idealmente com contexto
independente do implementador quando o risco justifica esse custo.

### Bounded Review — revisão limitada

Revisão restrita à task, aos claims do handoff, ao diff e ao contexto imediato. Procura regressões
da mudança e violações dos seus critérios sem transformar dívida preexistente em bloqueio da task.

### Orchestrator — orquestrador

Componente ou agente usado quando existe um problema real de coordenação entre unidades
independentes; coordena tasks, dependências, autoridade, estado e handoffs.

### Handoff — passagem de trabalho

Contrato compacto e temporário que comunica resultado, estado, proveniência, evidências, riscos e
próximo passo entre agentes, sessões ou pessoas. Não é transcrição da session nem memória durável.

### Human in the loop — humano no circuito

Participação humana em pontos de decisão ou validação. Não implica aprovação manual de cada ação.

### AFK task — tarefa sem humano ao teclado

Tarefa delegável a um agente sem supervisão contínua, como uma implementação bem contratada.
Contrasta com tarefas human in the loop — alinhamento e decisão — que exigem presença humana.

### Ready — pronta para execução

Estado derivado de uma task com contrato suficiente, sem decisão humana pendente e sem dependência
aberta. Não é apenas uma avaliação subjetiva de prioridade.

### WIP — trabalho em andamento

*Work in progress*. Quantidade de unidades iniciadas e ainda não concluídas. Limitar WIP aproxima
mudança, integração e feedback, mas o limite só tem valor enquanto reduzir conflitos ou dispersão.

[← Linear como memória operacional da SPEC](09b-linear-como-memoria-operacional-da-spec.md) ·
[Próximo: Fontes →](11-fontes.md)
