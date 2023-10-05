import React from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import SalvarImagem from '@/components/elementos/SalvarImagem'

export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };


  return (
    <Layout>
    <div>
      <p>Configurações</p>
    <SalvarImagem/>
    </div>
    </Layout>
  )
}
Configuracoes.auth = true