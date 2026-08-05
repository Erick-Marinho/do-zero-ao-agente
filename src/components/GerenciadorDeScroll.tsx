import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Trocar de rota não move o scroll sozinho. Aqui: se a URL traz uma âncora,
 * rola até a seção; caso contrário, volta ao topo — que é o esperado ao abrir
 * a página de um módulo.
 */
export function GerenciadorDeScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const alvo = document.querySelector(hash)
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
