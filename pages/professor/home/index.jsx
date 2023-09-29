import Layout from '@/components/Layout'
import BarraDePesquisa from '@/components/elementos/BarraDePesquisa'
import MeusProjetos from '@/components/ProjetosCadastrados'
import React from 'react'
import { useSession } from 'next-auth/react'


export default function Home() {


  
//  const token = JSON.parse(localStorage.getItem('token'));

  return (

    <div>
      <Layout>
      </Layout>
    </div>
  )
}
Home.auth = true