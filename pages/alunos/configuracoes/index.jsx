import React from 'react'
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Layout from '@/components/alunos/LayoutAluno'
import TelaConfiguracao from '@/components/elementos/TelaConfiguracao';



export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };


  return (
    <Layout>
       <Head>
          <title>Configurações</title>
          <meta name='description' content='Tela de configurações' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>
      <TelaConfiguracao/>
    </Layout>
  )
}
Configuracoes.auth = true