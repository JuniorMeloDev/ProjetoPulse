import React from 'react'
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import TelaConfiguracao from '@/components/elementos/TelaConfiguracao';

export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };


  return (
    <Layout>
      <Head>
        <title>Configurações</title>
        <meta name='description' content='Tela de configurações' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
      <div>
        <TelaConfiguracao />
      </div>
    </Layout>
  )
}
Configuracoes.auth = true