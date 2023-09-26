import React from 'react'

import Layout from '../../../components/Layout'
import { useSession } from 'next-auth/react'
import MeusProjetos from '@/components/ProjetosCadastrados'


export default function Home() {

  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)

  return (
    <Layout>
      <MeusProjetos />
    </Layout>
  )
}

Home.auth = true