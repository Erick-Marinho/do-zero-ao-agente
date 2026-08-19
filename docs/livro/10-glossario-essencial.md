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

## Especificação e trabalho

### SDD — *Spec-Driven Development*

Desenvolvimento orientado por especificação: usa contratos de comportamento como âncora para
planejamento, implementação e verificação.

### SPEC — *specification*

Documento que define comportamentos, contratos ou propriedades que devem ser verdadeiros, de forma
observável e testável sempre que possível.

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
jornada; a SPEC ou o PRD descrevem o destino. Ferramentas como Linear e GitHub Issues implementam
esse quadro.

## Harness e qualidade

### Harness — arnês ou estrutura de controle

Sistema ao redor de um modelo que oferece estado, ferramentas, execução, limites e feedback. No
recorte de coding agents, também pode significar a camada externa que a equipe constrói no
repositório.

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

### Memory promotion — promoção de memória

Transformação de uma descoberta local em memória durável, procedural ou executável quando ela tem
valor futuro recorrente.

## Coordenação

### Scout — explorador

Subagente que responde uma pergunta delimitada e retorna findings com evidências, mantendo a
exploração detalhada fora do contexto principal.

### Worker — executor

Agente responsável por uma unidade de trabalho verificável.

### Reviewer — revisor

Agente ou humano que avalia uma mudança contra critérios e riscos definidos, idealmente com contexto
independente do implementador.

### Bounded Review — revisão limitada

Revisão restrita à task, aos claims do handoff, ao diff e ao contexto imediato. Procura regressões
da mudança e violações dos seus critérios sem transformar dívida preexistente em bloqueio da task.

### Orchestrator — orquestrador

Componente ou agente que coordena tasks, dependências, autoridade, estado e handoffs.

### Handoff — passagem de trabalho

Contrato compacto que comunica resultado, estado, evidências, riscos e próximo passo entre agentes,
sessões ou pessoas.

### Human in the loop — humano no circuito

Participação humana em pontos de decisão ou validação. Não implica aprovação manual de cada ação.

### AFK task — tarefa sem humano ao teclado

Tarefa delegável a um agente sem supervisão contínua, como uma implementação bem contratada.
Contrasta com tarefas human in the loop — alinhamento e decisão — que exigem presença humana.

[← Estado da arte](09-estado-da-arte.md) · [Próximo: Fontes →](11-fontes.md)
