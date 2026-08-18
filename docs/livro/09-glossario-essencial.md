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

Transformação deliberada de um histórico grande em um estado menor que preserva decisões,
evidências, pendências e próximos passos.

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

Investigação delimitada do estado atual do sistema para reduzir incerteza suficiente antes de
planejar uma mudança.

### Vertical slice — fatia vertical

Unidade de trabalho que atravessa as camadas necessárias para produzir um comportamento verificável.

### Tracer bullet — projétil traçante

Primeira fatia fina, integrada e verificável que prova cedo se o caminho de ponta a ponta funciona.

### DAG — *Directed Acyclic Graph*

Grafo direcionado acíclico. Representa tasks e suas dependências sem criar ciclos.

## Harness e qualidade

### Harness — arnês ou estrutura de controle

Sistema ao redor de um modelo que oferece estado, ferramentas, execução, limites e feedback. No
recorte de coding agents, também pode significar a camada externa que a equipe constrói no
repositório.

### Guide — guia

Controle de **feedforward** que orienta antes da ação, como SPEC, `AGENTS.md`, Skill ou documento.

### Sensor — sensor

Controle de **feedback** que observa o resultado e permite detectar ou corrigir problemas, como
teste, linter, typecheck ou revisão.

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

### Orchestrator — orquestrador

Componente ou agente que coordena tasks, dependências, autoridade, estado e handoffs.

### Handoff — passagem de trabalho

Contrato compacto que comunica resultado, estado, evidências, riscos e próximo passo entre agentes,
sessões ou pessoas.

### Human in the loop — humano no circuito

Participação humana em pontos de decisão ou validação. Não implica aprovação manual de cada ação.

[← Estudo de caso](08-estudo-de-caso.md) · [Próximo: Fontes →](10-fontes.md)
