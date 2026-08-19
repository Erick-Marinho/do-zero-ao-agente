# Fontes e leituras recomendadas

Este livro é uma síntese autoral. As fontes abaixo não são tratadas como textos idênticos: cada uma
observa uma camada diferente do problema.

## Fontes principais

### Birgitta Böckeler — *Harness engineering for coding agent users*

<https://martinfowler.com/articles/harness-engineering.html>

Contribuições usadas neste livro:

- separação entre **guides/feedforward** e **sensors/feedback**;
- controles computacionais e inferenciais;
- harnesses de manutenibilidade, aptidão arquitetural e comportamento;
- harnessability, loops de direção e atenção humana;
- relação entre engenharia de contexto e o harness externo do coding agent.

É a fonte principal da Parte 5.

### OpenAI — *Alavancando o Codex em um mundo centrado no agente*

<https://openai.com/pt-BR/index/harness-engineering/>

Contribuições usadas neste livro:

- repositório como sistema de registro;
- `AGENTS.md` como mapa e documentação em divulgação progressiva;
- legibilidade do aplicativo, logs, métricas e browser para agentes;
- invariantes aplicados por linters e testes estruturais;
- autonomia baseada em ambiente, feedback e ciclos de correção;
- coleta de lixo contínua para reduzir deriva.

O texto é um relato de um contexto específico. Seus números e escolhas não devem ser generalizados
como promessa para todo projeto.

### Matt Rowe — notas sobre Context Engineering e o “Dumb Zone”

<https://mattrowe.com/blog/16631073-4603-44db-a3e6-b1c37b67af33>

Contribuições usadas neste livro:

- introdução didática ao problema de degradação do contexto;
- fluxo Research → Plan → Implement;
- compactação intencional e uso de subagentes para isolar exploração;
- plano como alinhamento entre intenção humana e execução;
- proporcionalidade do processo ao tamanho e risco da tarefa.

As notas interpretam ideias apresentadas por Dex Horthy. Para aprofundamento, consulte também a
fonte primária indicada nas leituras complementares. Sobre a compactação intencional, este livro
adota uma posição diferente — limpar e reidratar a partir de artefatos — discutida no Capítulo 9 e
na fonte a seguir.

### Matt Pocock — workshop sobre engenharia de IA (AI Hero)

<https://www.aihero.dev>

Contribuições usadas neste livro:

- dimensionar tarefas para permanecer na smart zone, com um marcador prático (~100k tokens)
  tratado como heurística, não como lei;
- preferência explícita por **limpar o contexto** em vez de compactar: o agente deve se comportar
  “como o protagonista de *Memento*”, voltando sempre a um estado inicial previsível e otimizável;
- sessões de alinhamento por entrevista (“grill me”) e o conceito de design compartilhado, com
  referência a Frederick P. Brooks;
- PRD como **documento de destino** e quadro de dependências (kanban) como **documento de
  jornada**;
- distinção entre tarefas **human in the loop** (alinhamento e decisão) e tarefas **AFK** (execução
  delegável);
- fatias verticais e tracer bullets contra a tendência do agente de “codificar horizontalmente”;
- possuir e compreender a própria planning stack antes de adotar frameworks;
- “codebases ruins produzem agentes ruins”: qualidade de código como alavanca do trabalho com IA.

É a fonte da correção de rumo sobre compactação adotada neste livro.

### Vivek Trivedy / LangChain — *The Anatomy of an Agent Harness*

<https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>

Contribuições usadas neste livro:

- definição ampla “agente = modelo + harness”;
- filesystem e Git como armazenamento durável e superfície de colaboração;
- execução de código, sandboxes, ferramentas e ambientes;
- memória, busca, compactação, Skills e divulgação progressiva;
- planejamento, verificação e execução de longa duração;
- orquestração e contexto isolado para subagentes.

## Leituras complementares

### OpenSpec

<https://github.com/Fission-AI/OpenSpec>

Framework de SDD para assistentes de código. Organiza mudanças em proposta, specs, design e tasks,
com comandos para explorar, propor, aplicar, verificar e arquivar. Leia depois de entender os
artefatos manualmente, para avaliar quais convenções resolvem um problema real da sua equipe.

### 12-Factor Agents

<https://github.com/humanlayer/12-factor-agents>

Princípios de Dex Horthy para construir aplicações com LLMs de forma controlável. A discussão sobre
possuir o próprio contexto e manter agentes focados ajuda a formar a base da engenharia de contexto.

### *No Vibes Allowed: Solving Hard Problems in Complex Codebases*

<https://www.youtube.com/watch?v=rmvDxxNubIg>

Apresentação de Dex Horthy sobre tarefas complexas em codebases brownfield, Research → Plan →
Implement, compactação intencional e alinhamento mental antes da implementação. Compare com a
posição de Matt Pocock sobre limpar em vez de compactar; a reconciliação está no Capítulo 9.

### Padrão `AGENTS.md`

<https://agents.md/>

Visão geral do arquivo aberto de instruções para agentes, incluindo exemplos e o comportamento de
arquivos aninhados em monorepos.

## Como ler criticamente

Ao encontrar um novo artigo ou framework, pergunte:

1. Qual definição de “agente” e “harness” o autor está usando?
2. O texto fala de modelos, produto de agentes ou harness externo do projeto?
3. É um relato de produção, uma proposta conceitual ou documentação de ferramenta?
4. O cenário é greenfield ou brownfield?
5. Que parte é observação, que parte é inferência e que parte é recomendação?
6. Quais ideias sobrevivem se a ferramenta citada deixar de existir?

Esse filtro ajuda a incorporar novidades sem desmontar o modelo mental a cada nova publicação.

[← Glossário](10-glossario-essencial.md) · [Voltar ao sumário](README.md)
