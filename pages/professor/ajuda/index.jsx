import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import React from 'react'

export default function Ajuda() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };


  return (

    <div>
      <Layout>
        
      </Layout>
    </div>
  )
}
Ajuda.auth = true