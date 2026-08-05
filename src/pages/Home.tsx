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
      <ComoFunciona />
      <Principios />
      <OQueFica />
    </>
  )
}
