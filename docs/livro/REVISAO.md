# Roteiro de revisão editorial

Esta edição foi separada do site para que estrutura e conteúdo possam amadurecer antes da
publicação. Não é necessário revisar gramática linha a linha na primeira leitura.

## Decisões editoriais desta versão

- **Título provisório:** *Do zero ao agente*.
- **Público:** pessoas sem conhecimento prévio, mas interessadas em desenvolvimento de software.
- **Formato:** sete partes, 17 capítulos, dois estudos de caso, manual estado da arte, glossário e
  fontes.
- **Progressão:** dor → modelo mental → conceito → exemplo → perguntas.
- **Exemplo contínuo:** recuperação de senha em um sistema existente.
- **Vocabulário:** português primeiro; termo em inglês junto da primeira definição.
- **Harness:** a palavra inglesa é mantida após a definição, pois “arnês” não é comum no uso técnico
  em português.
- **OpenSpec:** aparece depois do workflow manual, como ferramenta de lifecycle e não como requisito.
- **Publicação:** ainda não integrada ao React/GitHub Pages nesta etapa.

## Primeira leitura — estrutura

Marque onde a resposta for “não”:

- [ ] Consigo entender a promessa do livro pela introdução?
- [ ] A ordem dos capítulos parece natural para alguém iniciante?
- [ ] Cada conceito aparece depois de um problema que justifica sua existência?
- [ ] As diferenças entre SPEC, Research, plano e task ficaram claras?
- [ ] As duas escalas de “harness” deixaram de parecer contraditórias?
- [ ] O estudo de caso conecta as partes sem exigir conhecimento não apresentado?
- [ ] Algum capítulo deveria ser dividido, unido ou movido?

## Segunda leitura — linguagem

- [ ] Os parágrafos são curtos o suficiente para leitura digital?
- [ ] As analogias ajudam sem distorcer o conceito?
- [ ] Há termos em inglês sem tradução ou definição na primeira aparição?
- [ ] O tom parece uma conversa de estudo, sem infantilizar o leitor?
- [ ] Há afirmações apresentadas como regra universal que deveriam ser heurísticas?

## Terceira leitura — profundidade

- [ ] O livro explica o “porquê” antes do “como”?
- [ ] Há teoria demais antes do estudo de caso?
- [ ] Algum conceito importante do caderno de pesquisa desapareceu na síntese?
- [ ] As perguntas ao final realmente testam entendimento?
- [ ] Falta um segundo estudo de caso para mostrar que o método não depende de autenticação?

## Formato sugerido para comentários

```markdown
Arquivo/capítulo:
Trecho ou conceito:
O que senti ao ler:
O que esperava entender:
Sugestão ou pergunta:
```

Comentários como “aqui fiquei perdido” são especialmente valiosos: eles mostram onde a sequência
didática falhou, mesmo que o leitor ainda não saiba sugerir uma correção.

## Depois da aprovação editorial

A integração com o site pode ser tratada como uma etapa separada:

1. definir URL e navegação do livro;
2. escolher renderização de Markdown e Mermaid no React;
3. criar sumário lateral, progresso e navegação entre capítulos;
4. adaptar tabelas e diagramas para telas pequenas;
5. adicionar metadados, acessibilidade e SEO;
6. validar links no build e publicar no GitHub Pages.

[Voltar ao sumário](README.md)
