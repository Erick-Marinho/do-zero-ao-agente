import { BannerGlossario } from '../components/BannerGlossario'
import { BannerLivro } from '../components/BannerLivro'
import { ComoFunciona } from '../components/ComoFunciona'
import { Hero } from '../components/Hero'
import { OQueFica } from '../components/OQueFica'
import { Principios } from '../components/Principios'
import { Trilha } from '../components/Trilha'

export function Home() {
  return (
    <>
      <Hero />
      <Trilha />
      <BannerLivro />
      <BannerGlossario />
      <ComoFunciona />
      <Principios />
      <OQueFica />
    </>
  )
}
