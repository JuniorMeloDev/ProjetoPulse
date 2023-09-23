import React from 'react'

import Layout from '../../../components/Layout'
import Projetos from '../../../components/alunos/Projetos'
import { useSession } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)

  return (
    <Layout>
      <Projetos/>
    </Layout>
  )
}

Home.auth = true