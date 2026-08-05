# Engenharia de agentes de IA

Site da mentoria. Um cliente real (fictício), um sistema em produção, e todos os problemas que
aparecem no caminho.

**Produção:** https://erick-marinho.github.io/do-zero-ao-agente/

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · React Router

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run build    # build de produção em dist/
npm run preview  # serve o build local
npm run lint
```

## Estrutura

```
src/
  App.tsx            # rotas
  pages/             # Home, OCaso, ModuloPage, Glossario, NaoEncontrada
  components/        # Header, Hero, Trilha, Materiais, Footer, ...
  data/
    trilha.ts        # os módulos e seus materiais
    caso.ts          # a história do Seu Renato
    glossario.ts     # os termos, agrupados por área
    conteudo.ts      # textos das demais seções (hero, princípios, o que fica, aviso)
  index.css          # Tailwind + tema
public/
  img/               # imagens
  materiais/         # PDFs e arquivos servidos direto
```

Rotas: `/` é a home, `/o-caso` é a história do cliente, `/modulo/:id` é a página de um módulo
(onde `:id` é o campo `id` em [`trilha.ts`](src/data/trilha.ts)) e `/glossario` é a referência
de termos.

As imagens em `public/img/` são WebP geradas a partir dos originais em
`../docs/` — a foto do Seu Renato saiu de 2,3 MB (PNG) para 142 kB, com uma
versão reduzida para o card da home.

Todo o texto do site vive em [`src/data/`](src/data/) — os componentes só renderizam. Para
mexer no conteúdo não é preciso tocar em JSX:

- **módulos da trilha** → [`trilha.ts`](src/data/trilha.ts). O `titulo` é a fala do cliente
  que abre o módulo (o card já a renderiza entre aspas); `tema` é o nome conceitual, usado
  como rótulo na página do módulo. O `status`
  (`em-andamento` · `planejado` · `concluido`) controla o badge do card.
- **demais seções** → [`conteudo.ts`](src/data/conteudo.ts).

## Publicando material de um módulo

Cada módulo tem uma lista `materiais` em [`trilha.ts`](src/data/trilha.ts). Um item:

```ts
{
  titulo: 'Plano de aula do Bloco 0',
  tipo: 'pdf',                                 // artigo · pdf · video · repo
  url: 'materiais/bloco-00/plano-de-aula.pdf', // ou uma URL https://…
  fonte: 'Erick Marinho · ago/2026',           // opcional
  descricao: 'Os cinco dias, hora a hora.',    // opcional
}
```

**Links externos** vão em `url` com o endereço completo e abrem em nova aba.

**Arquivos** (PDF, slides) entram em `public/materiais/bloco-XX/`, e o `url` é o caminho a
partir de `public/` — sem barra inicial. O prefixo do repositório é aplicado em tempo de
execução, então o mesmo caminho funciona no `npm run dev` e em produção.

Um material com `url: ''` aparece na lista marcado como pendente, sem virar link quebrado —
útil para registrar uma leitura antes de ter o endereço em mãos. Módulo sem material nenhum
mostra um aviso de que ainda não foi publicado.

## Glossário

Os termos ficam em [`src/data/glossario.ts`](src/data/glossario.ts), agrupados por área e na
ordem em que fazem sentido para quem aprende — não em ordem alfabética. Um verbete:

```ts
{
  termo: 'Janela de contexto',
  original: 'context window',      // opcional, o termo em inglês
  traducao: 'MAS',                 // opcional, tradução, sigla ou qualificador
  definicao: 'Quantos tokens o modelo consegue considerar de uma vez. …',
  nota: 'Comentário mais longo…',  // opcional, renderizado em itálico abaixo
}
```

A contagem exibida no topo da página e no card da home é derivada da lista — acrescentar um
termo já atualiza os dois.

Os verbetes ficam recolhidos e abrem ao clique. A busca ignora acento e maiúscula
(`acao` encontra `ação`) e procura em todos os campos, então dá para achar um verbete pela
definição sem lembrar o nome; os resultados já vêm abertos, para não exigir um clique extra
depois de procurar.

## Deploy

Push na `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que builda e publica no GitHub Pages.

Duas coisas em [`vite.config.ts`](vite.config.ts) existem por causa do Pages:

- `base` precisa ser `/do-zero-ao-agente/` (nome do repositório) para os assets resolverem.
- O plugin `fallback-spa-github-pages` copia o `index.html` para `404.html` no fim do build.
  O Pages não reescreve rotas para o index, então sem essa cópia um acesso direto a
  `/modulo/fundacao` — ou um refresh na página — devolveria a tela de erro do GitHub.
