import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Footer } from './components/Footer'
import { GerenciadorDeScroll } from './components/GerenciadorDeScroll'
import { Header } from './components/Header'
import { Glossario } from './pages/Glossario'
import { Home } from './pages/Home'
import { ModuloPage } from './pages/ModuloPage'
import { NaoEncontrada } from './pages/NaoEncontrada'
import { OCaso } from './pages/OCaso'

const LivroInicio = lazy(() =>
  import('./pages/LivroInicio').then((modulo) => ({ default: modulo.LivroInicio })),
)
const LivroCapitulo = lazy(() =>
  import('./pages/LivroCapitulo').then((modulo) => ({ default: modulo.LivroCapitulo })),
)

function CarregandoPagina() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center text-sm text-slate-500">
      Carregando…
    </div>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <GerenciadorDeScroll />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo/:id" element={<ModuloPage />} />
          <Route path="/o-caso" element={<OCaso />} />
          <Route path="/glossario" element={<Glossario />} />
          <Route
            path="/livro"
            element={
              <Suspense fallback={<CarregandoPagina />}>
                <LivroInicio />
              </Suspense>
            }
          />
          <Route
            path="/livro/:slug"
            element={
              <Suspense fallback={<CarregandoPagina />}>
                <LivroCapitulo />
              </Suspense>
            }
          />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
