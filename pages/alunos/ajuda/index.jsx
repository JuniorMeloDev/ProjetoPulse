import React from 'react'
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react'
import TelaAjuda from '@/components/elementos/TelaAjuda';


export default function Ajuda() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };

  return (
    <Layout>
    <TelaAjuda/>
  </Layout>
  )
}
Ajuda.auth = true