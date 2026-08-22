# Fontes e leituras recomendadas

Este livro é uma síntese autoral. As fontes abaixo não são tratadas como textos idênticos: cada uma
observa uma camada diferente do problema.

## Fontes principais

### Kent Beck e Cynthia Andres — *Extreme Programming Explained: Embrace Change*

<https://www.pearson.com/en-us/subject-catalog/p/extreme-programming-explained-embrace-change/P200000000118/9780321278654>

Contribuições usadas neste livro:

- pequenas mudanças e ciclos curtos de feedback;
- testes, integração contínua, simple design e refactoring;
- pair programming e colaboração próxima;
- mudança tratada como parte normal do desenvolvimento;
- spikes como experimentos pequenos para reduzir incerteza.

Extreme Programming é apresentado como raiz conceitual importante, não como equivalente à
engenharia com agentes. Coding agents alteram a configuração operacional do loop; não substituem as
práticas clássicas que sustentam sua qualidade.

### Birgitta Böckeler — *Harness engineering for coding agent users*

<https://martinfowler.com/articles/harness-engineering.html>

Contribuições usadas neste livro:

- separação entre **guides/feedforward** e **sensors/feedback**;
- controles computacionais e inferenciais;
- harnesses de manutenibilidade, aptidão arquitetural e comportamento;
- harnessability, loops de direção e atenção humana;
- relação entre engenharia de contexto e o harness externo do coding agent.

É a fonte principal da Parte 6.

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

### OpenAI — documentação de Compaction

<https://developers.openai.com/api/docs/guides/compaction>

A documentação apresenta compaction server-side e explícita como mecanismos para reduzir contexto
preservando estado em interações longas. Ela sustenta a distinção adotada no Capítulo 12: compaction
pode ser apropriada para continuidade dentro do mesmo objetivo; handoff explícito continua
preferível quando a fase, a autoridade ou o consumidor mudam.

### Matt Rowe — notas sobre Context Engineering e o “Dumb Zone”

<https://mattrowe.com/blog/16631073-4603-44db-a3e6-b1c37b67af33>

Contribuições usadas neste livro:

- introdução didática ao problema de degradação do contexto;
- fluxo Research → Plan → Implement;
- compactação intencional e uso de subagentes para isolar exploração;
- plano como alinhamento entre intenção humana e execução;
- proporcionalidade do processo ao tamanho e risco da tarefa.

As notas interpretam ideias apresentadas por Dex Horthy. Para aprofundamento, consulte também a
fonte primária indicada nas leituras complementares. O Capítulo 12 compara essa defesa de
compactação intencional com a preferência por limpar e reidratar nas mudanças de fase.

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
  jornada** — a jornada do trabalho, na terminologia deste livro;
- distinção entre tarefas **human in the loop** (alinhamento e decisão) e tarefas **AFK** (execução
  delegável);
- fatias verticais e tracer bullets contra a tendência do agente de “codificar horizontalmente”;
- possuir e compreender a própria planning stack antes de adotar frameworks;
- “codebases ruins produzem agentes ruins”: qualidade de código como alavanca do trabalho com IA.

É uma das fontes da preferência deste livro por handoff + clear + rehydrate nas mudanças de fase;
não implica rejeitar compaction dentro do mesmo objetivo.

### Vivek Trivedy / LangChain — *The Anatomy of an Agent Harness*

<https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>

Contribuições usadas neste livro:

- definição ampla “agente = modelo + harness”;
- filesystem e Git como armazenamento durável e superfície de colaboração;
- execução de código, sandboxes, ferramentas e ambientes;
- memória, busca, compactação, Skills e divulgação progressiva;
- planejamento, verificação e execução de longa duração;
- orquestração e contexto isolado para subagentes.

## Estudo de caso técnico

### Mercado Bom Preço — o caso do Seu Renato e a Data Foundation

- Narrativa do cliente: <https://erick-marinho.github.io/do-zero-ao-agente/o-caso>
- Repositório do projeto-laboratório: <https://github.com/Erick-Marinho/proj-agent-mercado-bom-preco>
- SPEC Data Foundation: <https://github.com/Erick-Marinho/proj-agent-mercado-bom-preco/blob/main/specs/data-foundation.md>
- Research do dump do PDV: <https://github.com/Erick-Marinho/proj-agent-mercado-bom-preco/blob/main/work/data-foundation/RESEARCH.md>

Contribuições usadas no capítulo “Linear como memória operacional da SPEC”:

- pedido do Seu Renato como destino de negócio;
- Data Foundation como primeiro incremento especificado;
- separação entre fatos medidos no dump, decisões técnicas e decisões do cliente;
- comportamentos B1–B10 como base para tasks verificáveis e sensores;
- `verify.sh` como sensor global do repositório;
- anomalias preservadas enquanto sua semântica comercial continua aberta.

O mercado, o cliente e os dados são fictícios. O caso funciona como projeto-laboratório para
acompanhar a evolução de uma solução orientada por evidência.

### Linear — capacidades usadas no experimento

- Modelo conceitual: <https://linear.app/docs/conceptual-model>
- Parent e sub-issues: <https://linear.app/docs/parent-and-sub-issues>
- Relações e bloqueios: <https://linear.app/docs/issue-relations>
- Status de workflow: <https://linear.app/docs/configuring-workflows>
- Labels: <https://linear.app/docs/labels>
- Comentários e threads: <https://linear.app/docs/comment-on-issues>
- Templates de issue: <https://linear.app/docs/issue-templates>
- Custom Views: <https://linear.app/docs/custom-views>
- Projects: <https://linear.app/docs/projects>
- Milestones: <https://linear.app/docs/project-milestones>
- Cycles: <https://linear.app/docs/use-cycles>
- Initiatives: <https://linear.app/docs/initiatives>

O Linear é referência de implementação, não dependência do método. A política de Project único,
três labels, WIP inicial igual a um e ausência inicial de milestones e cycles é uma hipótese do
livro, não uma recomendação oficial do produto.

### AkitaOnRails — `ai-memory`

- Repositório e visão geral: <https://github.com/akitaonrails/ai-memory>
- Arquitetura: <https://github.com/akitaonrails/ai-memory/blob/main/docs/ARCHITECTURE.md>
- Decisões de design: <https://github.com/akitaonrails/ai-memory/blob/main/docs/design-decisions.md>
- Uso e handoffs: <https://github.com/akitaonrails/ai-memory/blob/main/docs/usage.md>

Contribuições usadas como exemplo no livro:

- separação entre observações brutas de session, wiki consolidada, handoff e regras canônicas;
- Markdown versionado como registro persistido e SQLite como índice derivado de retrieval;
- busca por texto, entidades, relações e vetores opcionais sem transformar ranking em autoridade;
- retenção diferente para conhecimento episódico, semântico e procedural;
- supersession, expiração de handoff, feedback de qualidade e esquecimento deliberado;
- memória recuperada tratada como evidência histórica não confiável até nova verificação.

Esse projeto é um estudo de caso de uma arquitetura possível. O método do livro não depende de sua
instalação, formatos, tiers ou escolhas de implementação, e a menção não é uma recomendação de
adoção obrigatória.

## Leituras complementares

### OpenSpec

<https://github.com/Fission-AI/OpenSpec>

Visão geral do workflow: <https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md>

Framework de SDD para assistentes de código. Organiza mudanças em proposta, specs, design e tasks,
com um loop padrão de explorar opcionalmente, propor, aplicar e arquivar. O comando `verify` faz
parte do perfil expandido. Seus artefatos são habilitadores, não gates rígidos. Leia depois de
entender os artefatos manualmente e confirme a documentação da versão instalada.

### Pydantic — Strict Mode

<https://docs.pydantic.dev/latest/concepts/strict_mode/>

Documenta a coerção do modo padrão e as formas de habilitar validação estrita por chamada, campo ou
configuração. Sustenta o uso de Pydantic como probe configurável, não como autoridade semântica.

### 12-Factor Agents

<https://github.com/humanlayer/12-factor-agents>

Princípios de Dex Horthy para construir aplicações com LLMs de forma controlável. A discussão sobre
possuir o próprio contexto e manter agentes focados ajuda a formar a base da engenharia de contexto.

### *No Vibes Allowed: Solving Hard Problems in Complex Codebases*

<https://www.youtube.com/watch?v=rmvDxxNubIg>

Apresentação de Dex Horthy sobre tarefas complexas em codebases brownfield, Research → Plan →
Implement, compactação intencional e alinhamento mental antes da implementação. Compare com a
posição de Matt Pocock sobre limpar em vez de compactar; a reconciliação está no Capítulo 12.

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
