import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import Markdown, { type Components } from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { slugDoArquivo } from '../../data/livro'
import { DiagramaMermaid } from './DiagramaMermaid'

function destinoInterno(href: string) {
  const [caminho, ancora] = href.split('#')
  const arquivo = caminho.split('/').at(-1)
  if (!arquivo?.endsWith('.md')) return undefined

  const slug = slugDoArquivo(arquivo)
  if (slug === undefined) return undefined
  const rota = slug ? `/livro/${slug}` : '/livro'
  return `${rota}${ancora ? `#${ancora}` : ''}`
}
function LinkMarkdown({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const interno = destinoInterno(href)

  if (interno) {
    return (
      <Link to={interno} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  const externo = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

function textoDoNo(no: ReactNode): string {
  if (typeof no === 'string' || typeof no === 'number') return String(no)
  if (Array.isArray(no)) return no.map(textoDoNo).join('')
  if (isValidElement<{ children?: ReactNode }>(no)) return textoDoNo(no.props.children)
  return ''
}

const componentes: Components = {
  a({ node: _node, ...props }) {
    return <LinkMarkdown {...props} />
  },
  pre({ node: _node, children, ...props }) {
    if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
      const linguagem = children.props.className ?? ''
      if (linguagem.includes('language-mermaid')) {
        return <DiagramaMermaid codigo={textoDoNo(children.props.children).trim()} />
      }
    }

    return (
      <pre {...props} className="bloco-codigo-livro">
        {children}
      </pre>
    )
  },
}

export function RenderizadorMarkdown({ conteudo }: { conteudo: string }) {
  return (
    <div className="conteudo-livro">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={componentes}>
        {conteudo}
      </Markdown>
    </div>
  )
}
