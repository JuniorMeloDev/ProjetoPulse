import RecuperarSenhaEmail from '@/components/elementos/RecuperarSenhaEmail'
import Head from 'next/head'
import React from 'react'


export default function RecuperarSenha () {
  return (
    <div>
      <Head>
        <title>Esqueceu sua senha</title>
        <meta name='description' content='Tela de recuperar senha' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
        <RecuperarSenhaEmail/>
    </div>
  )
}
