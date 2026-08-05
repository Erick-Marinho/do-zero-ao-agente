export const caso = {
  selo: 'O cliente',
  nome: 'Seu Renato',
  mercado: 'Mercado Bom Preço',
  chamada: 'Doze anos de rua, sete anos de dados, e nenhuma resposta.',

  foto: {
    grande: 'img/seu-renato.webp',
    pequena: 'img/seu-renato-small.webp',
    alt: 'Seu Renato, de avental verde do Mercado Bom Preço, ao lado do computador do caixa.',
  },

  ficha: [
    { valor: '58', rotulo: 'anos' },
    { valor: '12', rotulo: 'anos de rua' },
    { valor: '4', rotulo: 'caixas' },
    { valor: '~3 mil', rotulo: 'produtos no cadastro' },
    { valor: '15', rotulo: 'anos como gerente, antes' },
  ],

  abertura: [
    'Nosso cliente se chama Renato. Todo mundo chama de Seu Renato.',
    'Ele tem 58 anos e é dono do Mercado Bom Preço, um mercado de bairro. Quatro caixas, uns três mil produtos no cadastro — pelo menos é o que ele acha —, doze anos de rua. Antes disso foi gerente de outro mercado por quinze anos.',
  ],

  /** A frase que muda como se enxerga o cliente. */
  destaqueAbertura:
    'Ele conhece o negócio dele de dentro. Não é ingênuo. É não-técnico, que é uma coisa diferente.',

  oQueTem: {
    titulo: 'O que ele tem',
    paragrafos: [
      'Desde 2019 ele tem um sistema de ponto de venda que grava tudo. Toda venda, todo item, toda quantidade, todo valor. Sete anos de dados.',
      'E ele nunca conseguiu tirar nada dali.',
      'O sistema tem uma tela de relatório. O rapaz do suporte já mostrou como usar, duas vezes. Ele esqueceu as duas.',
    ],
  },

  semana: {
    titulo: 'O que ele faz hoje',
    intro:
      'Toda segunda-feira de manhã ele decide as compras da semana. Olha a prateleira, vê o que sumiu, e chuta.',
    passos: [
      {
        dia: 'Segunda',
        hora: 'de manhã',
        titulo: 'Ele decide',
        texto:
          'Olha a prateleira, vê o que sumiu e chuta. Depois liga para o sobrinho: "me vê quanto vendeu de bebida semana passada".',
      },
      {
        dia: 'Terça',
        titulo: 'Juninho trabalha',
        texto:
          'O sobrinho estudou até o segundo ano de Sistemas de Informação e sabe mexer em Excel. Leva dois dias.',
      },
      {
        dia: 'Quarta',
        titulo: 'O relatório chega',
        texto: 'A decisão já foi tomada há dois dias.',
        problema: true,
      },
    ],
    fechamento:
      'Ele confere depois — e às vezes descobre que comprou errado. Uma vez sobrou oitocentos reais de refrigerante parado por dois meses.',
  },

  juninho: {
    nome: 'Juninho',
    papel: 'o sobrinho que sabe Excel',
    numeros: [
      { valor: '2 dias', rotulo: 'por relatório' },
      { valor: 'R$ 150', rotulo: 'cada um' },
      { valor: '4', rotulo: 'por mês' },
    ],
    ressalva: 'E às vezes erra a conta.',
  },

  frase: {
    texto:
      'Eu não quero aprender a mexer em nada. Eu quero perguntar igual eu pergunto pro meu sobrinho, e ver o gráfico.',
    contexto: 'Na primeira reunião',
    nota: 'Guarde essa frase. Ela vai voltar várias vezes ao longo do projeto.',
  },

  tracos: {
    titulo: 'Como ele é',
    subtitulo: 'Você vai conversar com ele toda semana. Vale saber com quem está lidando.',
    itens: [
      {
        titulo: 'Impaciente',
        texto: 'Se a explicação passar de trinta segundos, ele interrompe.',
        fala: 'Mas isso resolve meu problema ou não?',
      },
      {
        titulo: 'Não é técnico e não quer ser',
        texto: 'Se você falar "token", "embedding" ou "grafo", ele vai olhar com cara de quem não entendeu.',
      },
      {
        titulo: 'Cético por experiência',
        texto: 'Já pagou por dois sistemas que nunca usou.',
      },
      {
        titulo: 'Justo',
        texto: 'Quando funciona, ele reconhece. Sem exagero, mas reconhece.',
      },
      {
        titulo: 'Observador',
        texto: 'Vai achar erros que vocês não acharam.',
      },
    ],
  },
}
