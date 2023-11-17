import React from 'react'
import Head from 'next/head'
import TrocarSenha from '@/components/elementos/TrocarSenha'

export default function TrocarSenhaUsuario() {
  return (
    <div>
      <Head>
        <title>Trocar Senha</title>
        <meta name='description' content='Tela de trocar senha' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
        <TrocarSenha/>
    </div>
  )
}
