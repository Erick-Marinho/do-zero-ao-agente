# Estudo de caso — recuperação de senha

Este estudo junta o livro inteiro em uma única mudança. O objetivo não é oferecer uma arquitetura
universal de autenticação, mas mostrar como os artefatos e ciclos se conectam.

## Cenário

O Mercado Bom Preço já possui login por e-mail e senha. Seu Renato relata:

> “Quando alguém esquece a senha, precisa ligar para o mercado. Quero que a pessoa consiga resolver
> sozinha, mas sem facilitar invasão de conta.”

É uma intenção útil, ainda não uma SPEC.

## 1. Enquadrar a mudança

Antes de chamar um agente para programar, registramos:

```markdown
# Proposta — recuperação de senha

## Problema
Usuários dependem de atendimento manual quando esquecem a senha.

## Resultado desejado
Uma pessoa consegue recuperar o acesso pelo e-mail cadastrado sem revelar contas e sem permitir
reutilização do link.

## Fora do escopo
- recuperação por telefone ou SMS;
- troca do provedor de e-mail;
- autenticação multifator.
```

### Decisões humanas iniciais

- A resposta não revelará se a conta existe.
- O link expirará em 15 minutos.
- A troca revogará sessões anteriores.

Essas decisões possuem impacto de produto e segurança. Não devem nascer por acidente durante a
implementação.

## 2. Escrever a SPEC

```markdown
# SPEC — recuperação de senha

## Solicitação

### Cenário: e-mail cadastrado
- QUANDO a pessoa solicita recuperação com e-mail cadastrado
- ENTÃO recebe resposta pública neutra
- E um e-mail com link de uso único é agendado

### Cenário: e-mail não cadastrado
- QUANDO a pessoa solicita recuperação com e-mail não cadastrado
- ENTÃO recebe a mesma resposta pública neutra
- E nenhum e-mail é agendado

## Redefinição

### Cenário: token válido
- QUANDO a pessoa envia nova senha com token válido
- ENTÃO a senha é atualizada
- E o token é consumido
- E sessões anteriores são revogadas

### Cenário: token inválido, expirado ou consumido
- QUANDO a pessoa tenta redefinir a senha
- ENTÃO nenhuma credencial ou sessão é alterada
- E uma mensagem segura permite reiniciar o fluxo
```

## 3. Pesquisar o codebase

Em uma janela dedicada, o agente recebe a proposta, a SPEC e perguntas específicas. Ele não recebe
ordem para implementar.

### Prompt de pesquisa

```text
Investigue como implementar a SPEC de recuperação de senha neste repositório.

Responda:
1. Como usuários, senhas e sessões funcionam hoje?
2. Como e-mails transacionais são enviados?
3. Quais boundaries arquiteturais devem ser preservadas?
4. Quais testes e utilitários existentes podem servir de modelo?
5. Que decisões ou lacunas ainda impedem um plano seguro?

Não altere arquivos. Diferencie fatos, inferências e perguntas. Produza um RESEARCH.md compacto com
símbolos e evidências relevantes; não registre o diário de comandos.
```

### Saída esperada

```markdown
## Fatos
- F1. `AuthService` é a única porta para hash de senha (`src/...`).
- F2. Sessões persistidas possuem `createdAt` e podem ser revogadas por usuário (`src/...`).
- F3. `EmailGateway` é assíncrono e já possui fake para testes (`src/...`).
- F4. Testes usam `Clock` injetável (`ADR-006`, `src/...`).

## Inferências
- I1. O padrão existente sugere armazenar apenas hash do token, mas não há regra canônica.

## Perguntas
- Q1. O limite de tentativas pertence a esta entrega ou a uma task posterior de hardening?
```

O humano valida Q1 e transforma a resposta em escopo ou nova cláusula.

## 4. Compactar e abrir uma fase limpa

Encerramos a sessão de Research. A decomposição começa com:

```text
AGENTS.md
proposta
SPEC aprovada
RESEARCH.md revisado
```

Não carregamos buscas, logs completos e hipóteses descartadas.

## 5. Criar o grafo de tasks

```mermaid
flowchart LR
    T1[T1 · endpoint com<br/>resposta neutra]
    T2[T2 · token seguro<br/>e persistência]
    T3[T3 · envio de link]
    T4[T4 · consumo e<br/>troca de senha]
    T5[T5 · revogar sessões]
    T6[T6 · jornada de UI]
    T7[T7 · fechamento<br/>ponta a ponta]

    T1 --> T3
    T2 --> T3
    T2 --> T4
    T4 --> T5
    T1 --> T6
    T5 --> T6
    T3 --> T7
    T6 --> T7
```

T1 e T2 podem ser executadas em paralelo se seus contratos estiverem definidos e não disputarem os
mesmos arquivos. T7 não é “escrever testes no final”; é reconciliar o fluxo completo.

## 6. Executar uma task

### Contrato de T2

```markdown
# T2 — Token seguro e persistência

## Objetivo
O sistema consegue emitir um segredo de recuperação, persistindo somente a representação necessária
para validá-lo, com expiração de 15 minutos.

## Fora do escopo
- endpoint HTTP;
- envio de e-mail;
- troca de senha.

## Contexto
- SPEC: cláusulas de token único e expiração;
- Research: F4 e I1;
- ADR-006: relógio injetável.

## Critérios
- token público tem entropia adequada;
- valor público não é persistido em texto puro;
- expiração usa o relógio injetável;
- apenas um token ativo por finalidade e usuário, conforme decisão aprovada.

## Validação
- testes de emissão, expiração e armazenamento;
- typecheck e lint do módulo.
```

### Ciclo do worker

```mermaid
flowchart LR
    T[Task] --> C[Código relevante]
    C --> I[Implementar]
    I --> S[Rodar sensores]
    S -->|falha acionável| I
    S -->|passou| H[Handoff]
```

O handoff informa o que mudou, evidências, decisões locais e qualquer desvio do contrato. Em
seguida, outra task recebe um contexto fresco.

## 7. Aplicar o harness

### Guides

- SPEC com comportamento de segurança;
- ADR do relógio;
- task com escopo e critérios;
- Skill de testes do domínio;
- documento de boundaries arquiteturais.

### Sensors

- typecheck;
- testes unitários de expiração;
- teste de integração para consumo atômico;
- linter de dependências;
- teste ponta a ponta da jornada;
- revisão de segurança focada em enumeração de conta, replay e vazamento do token.

Uma revisão genérica de “qualidade do código” não substitui perguntas de segurança concretas.

## 8. Fechar a feature

```mermaid
flowchart TD
    S1[Solicitação neutra] --> E1[Teste com conta existente e inexistente]
    S2[Link único e expirável] --> E2[Testes de expiração e replay]
    S3[Troca de senha] --> E3[Teste ponta a ponta]
    S4[Revogação de sessão] --> E4[Teste com sessão anterior]
    E1 --> F[Feature closure]
    E2 --> F
    E3 --> F
    E4 --> F
```

Além dos testes, alguém valida a experiência: a mensagem é compreensível? O usuário consegue pedir
outro link? A resposta neutra é realmente indistinguível?

## 9. Promover o que foi aprendido

Possíveis resultados:

| Finding | Destino |
|---|---|
| Decisão de armazenar apenas hash do token | ADR, se for uma escolha arquitetural recorrente |
| Comportamento vigente da recuperação | SPEC canônica |
| Novo padrão para testes com tempo | Skill de testes, se o procedimento se repetir |
| UI importou repository duas vezes durante as tasks | linter estrutural, se a falha for recorrente |
| Caminhos exatos dos arquivos tocados | não promover; Git preserva o histórico |

## 10. Onde OpenSpec entra

Até aqui usamos conceitos, não uma ferramenta obrigatória. O OpenSpec pode padronizar a camada de
gestão da mudança:

| Nosso artefato | Estrutura OpenSpec |
|---|---|
| Intenção/proposta | `proposal.md` |
| Mudança comportamental | `specs/.../spec.md` |
| Estratégia técnica local | `design.md` |
| Decomposição | `tasks.md` |
| Implementação | `apply` |
| Reconciliação | `verify` |
| Fechamento e atualização das specs | `archive` |
| Research brownfield compacto | extensão nossa, quando necessária |

```mermaid
flowchart LR
    E[explore<br/>opcional] --> P[proposal]
    P --> S[delta specs]
    P --> D[design]
    S --> T[tasks]
    D --> T
    R[research<br/>extensão opcional] --> T
    T --> A[apply]
    A --> V[verify]
    V --> AR[archive]
```

OpenSpec organiza artefatos e lifecycle. Ele não substitui seleção de contexto, confiança nas fontes,
qualidade das tasks, sensores, boundaries multiagente ou julgamento humano.

### Quando adotar

Considere a ferramenta quando o fluxo manual já revelou necessidade de:

- formato consistente entre mudanças;
- várias mudanças simultâneas;
- histórico e atualização de specs canônicas;
- dependências claras entre artefatos;
- coordenação de equipe.

Aprender primeiro o fluxo manual torna os benefícios e custos visíveis. Ferramenta sem modelo mental
pode automatizar burocracia; ferramenta com uma necessidade real pode reduzir trabalho operacional.

## Exercício final

Escolha uma feature pequena do seu projeto e produza apenas:

1. proposta de até dez linhas;
2. três a cinco comportamentos da SPEC;
3. cinco perguntas de Research;
4. um grafo de três a seis tasks;
5. guides e sensors de uma task;
6. uma matriz de fechamento.

Não implemente durante o exercício. O objetivo é perceber quais decisões antes ficariam escondidas
dentro do código.

[← Parte 7 — Aprendizagem](07-lifecycle-e-aprendizagem.md) · [Próximo: Glossário →](09-glossario-essencial.md)
