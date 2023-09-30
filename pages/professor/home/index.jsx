import Layout from '@/components/professores/LayoutProfessor'
import BarraDePesquisa from '@/components/elementos/BarraDePesquisa'
import MeusProjetos from '@/components/ProjetosCadastrados'
import React from 'react'
import { useSession } from 'next-auth/react'


export default function Home() {


  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)

  return (

    <div>
      <Layout>
        
      </Layout>
    </div>
  )
}
Home.auth = true