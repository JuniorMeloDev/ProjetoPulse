import React from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/alunos/LayoutAluno'
import SalvarImagem from '@/components/elementos/SalvarImagem'



export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };


  return (
    <Layout>
      <div>
        <p>Configurações</p>
        <SalvarImagem />
      </div>
    </Layout>
  )
}
Configuracoes.auth = true