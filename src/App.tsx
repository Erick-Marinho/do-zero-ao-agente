import { Route, Routes } from 'react-router'
import { Footer } from './components/Footer'
import { GerenciadorDeScroll } from './components/GerenciadorDeScroll'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { ModuloPage } from './pages/ModuloPage'
import { NaoEncontrada } from './pages/NaoEncontrada'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <GerenciadorDeScroll />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo/:id" element={<ModuloPage />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
