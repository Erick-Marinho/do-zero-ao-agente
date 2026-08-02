# Do Zero ao Agente

Site da mentoria em engenharia de IA — trilha prática dos fundamentos de LLMs até agentes em produção.

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
  components/        # Header, Hero, Trilha, ComoFunciona, Footer
  data/trilha.ts     # conteúdo dos módulos (editar aqui)
  index.css          # Tailwind + tema
```

Para alterar os módulos da trilha, edite [`src/data/trilha.ts`](src/data/trilha.ts) — as
seções da home são geradas a partir desse arquivo.

## Deploy

Push na `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que builda e publica no GitHub Pages.

O `base` em [`vite.config.ts`](vite.config.ts) precisa ser `/do-zero-ao-agente/` (nome do
repositório) para os assets resolverem em produção.
