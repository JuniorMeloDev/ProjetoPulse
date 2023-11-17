import Head from 'next/head'
import React from 'react'
import NavbarLogin from '@/components/elementos/NavBarLogin'
import TelaContato from '@/components/elementos/TelaContato'


export default function Contato() {
  return (
    <div>
       <Head>
          <title>Contatos</title>
          <meta name='description' content='Tela de contatos' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>
      <div className='bg-slate-500'>
        <NavbarLogin />
      </div>
      <TelaContato />
    </div>
  )
}
