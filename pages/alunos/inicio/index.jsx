import React, { useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react'

import ProjetosCadastrados from '@/components/alunos/MeusProjetosCadastrados'


export default function Inicio() {

  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };

  return (
    <Layout>
       <Head>
          <title>Início</title>
          <meta name='description' content='Tela de início' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>     
      <ProjetosCadastrados />
    </Layout>
  )
}

Inicio.auth = true
