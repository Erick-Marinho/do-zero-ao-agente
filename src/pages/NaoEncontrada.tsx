import { Link } from 'react-router'

export function NaoEncontrada() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="font-mono text-sm text-violet-400">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
        Essa página não existe
      </h1>
      <p className="mt-4 text-slate-400">
        O endereço pode ter mudado, ou o módulo ainda não foi publicado.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
