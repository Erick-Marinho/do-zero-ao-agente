# Engenharia de agentes de IA

Site da mentoria. Um cliente real (fictício), um sistema em produção, e todos os problemas que
aparecem no caminho.

**Produção:** https://erick-marinho.github.io/do-zero-ao-agente/

## Stack

Vite · React · TypeScript · Tailwind CSS v4

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
  App.tsx            # composição da página
  components/        # Header, Hero, Trilha, ComoFunciona, Principios, OQueFica, Footer
  data/
    trilha.ts        # os módulos: número, título, resumo, tags, status
    conteudo.ts      # textos das demais seções (hero, princípios, o que fica, aviso)
  index.css          # Tailwind + tema
```

Todo o texto do site vive em [`src/data/`](src/data/) — os componentes só renderizam. Para
mexer no conteúdo não é preciso tocar em JSX:

- **módulos da trilha** → [`trilha.ts`](src/data/trilha.ts). O `titulo` é a fala do cliente
  que abre o módulo (o card já a renderiza entre aspas); `tema` é o nome conceitual
  equivalente, mantido como rótulo interno e não exibido. O `status`
  (`em-andamento` · `planejado` · `concluido`) controla o badge do card.
- **demais seções** → [`conteudo.ts`](src/data/conteudo.ts).

## Deploy

Push na `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que builda e publica no GitHub Pages.

O `base` em [`vite.config.ts`](vite.config.ts) precisa ser `/do-zero-ao-agente/` (nome do
repositório) para os assets resolverem em produção.
