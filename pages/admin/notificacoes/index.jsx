import React from 'react'
import Head from 'next/head';
import Layout from '@/components/admin/LayoutAdmin'
import { useSession } from 'next-auth/react';
import NotificacaoUsuario from '@/components/admin/NotificacaoUsuario';

export default function Notificacoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ADMIN')) {
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
        <NotificacaoUsuario />
      </div>
    </Layout>
  )
}
Notificacoes.auth = true