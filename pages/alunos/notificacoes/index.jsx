import React from 'react'
import Head from 'next/head';
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react';
import NotificacaoCandidaturas from '@/components/alunos/NotificacaoCandidatura'

export default function Notificacoes() {

  const { data: session } = useSession()
  console.log(session);


  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    // Redirecionar para uma página de erro ou fazer algo quando o usuário não tem a role
    // Por exemplo, redirecionar para a página de login
    window.location.href = '/naoautenticado'
  }


  return (
    <Layout>
      <div>
      <Head>
          <title>Notificações</title>
          <meta name='description' content='Tela de notificações' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>
        <NotificacaoCandidaturas/>
      </div>
    </Layout>
  )
}
Notificacoes.auth = true