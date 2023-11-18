import Head from 'next/head'
import TrocarSenhaInicial from '@/components/elementos/TrocarSenhaInicial'
import React from 'react'

export default function SenhaInicial() {
  return (
    <div>
      <Head>
        <title>Trocar Senha Inicial</title>
        <meta name='description' content='Tela de trocar senha' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
        <TrocarSenhaInicial/>
    </div>
  )
}
