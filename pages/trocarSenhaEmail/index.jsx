import Head from 'next/head'
import TrocarSenhaEmail from '@/components/elementos/TrocarSenhaEmail'
import React from 'react'

export default function SenhaEmail() {
  return (
    <div>
      <Head>
        <title>Trocar Senha</title>
        <meta name='description' content='Tela de trocar senha' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
        <TrocarSenhaEmail/>
    </div>
  )
}
