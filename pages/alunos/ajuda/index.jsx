import React from 'react'
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react'


export default function Ajuda() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
    window.location.href = '/naoautenticado';
  };

  return (
    <Layout>
      <div>
        <p className='pt-28'>Ajuda</p>
        <p>{session.user.token}</p>
        <p>{session.user.iat}</p>
        <p>{session.user.jti}</p>



      </div>
    </Layout>
  )
}
Ajuda.auth = true