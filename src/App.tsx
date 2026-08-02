import { ComoFunciona } from './components/ComoFunciona'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OQueFica } from './components/OQueFica'
import { Principios } from './components/Principios'
import { Trilha } from './components/Trilha'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Trilha />
        <ComoFunciona />
        <Principios />
        <OQueFica />
      </main>
      <Footer />
    </div>
  )
}

export default App
