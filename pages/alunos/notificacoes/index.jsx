import React from 'react'
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react';

export default function Notificacoes() {

  const {data: session} = useSession()
  console.log(session);
    
    
      if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
        // Redirecionar para uma página de erro ou fazer algo quando o usuário não tem a role
        // Por exemplo, redirecionar para a página de login
         window.location.href = '/naoautenticado'
      }
    

  return (
    <Layout>
      <div>Notificações</div>
    </Layout>
  )
}
Notificacoes.auth = true