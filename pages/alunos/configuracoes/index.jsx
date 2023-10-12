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
        <h1 className='text-2xl font-bold mb-4'>Dados da Sessão: </h1>
        <p>Usuário: {session.user.nome}</p>
        <p>Email: {session.user.email}</p>
        <div className='mt-16'>
          <p className='mb-1 font-bold'>Selecionar imagem de perfil</p>
          <SalvarImagem />
        </div>
      </div>
    </Layout>
  )
}
Configuracoes.auth = true