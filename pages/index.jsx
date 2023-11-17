import Head from 'next/head'
import Navbar from '@/components/elementos/NavBar'
import Tela from '@/components/elementos/Tela'

import React from 'react'

export default function index() {
  return (
    <div>
      <Head>
        <title>Projeto Pulse</title>
        <meta name='description' content='Aplicação de gerenciamento de projetos acadêmicos' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
      <Navbar />
      <Tela />
    </div>
  )
}
