import React from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/alunos/LayoutAluno'
import TelaConfiguracao from '@/components/elementos/TelaConfiguracao';



export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };


  return (
    <Layout>
      <TelaConfiguracao/>
    </Layout>
  )
}
Configuracoes.auth = true