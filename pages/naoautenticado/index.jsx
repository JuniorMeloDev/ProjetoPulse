import Link from 'next/link'
import React from 'react'

export default function NaoAutenticado() {
  return (
    <div>
      <h1>Desculpe, Você não está autenticado!!
      </h1>
      <Link className='bg-slate-500 rounded-s-full' href='/'>Voltar para o login</Link>
    </div>
  )
}
