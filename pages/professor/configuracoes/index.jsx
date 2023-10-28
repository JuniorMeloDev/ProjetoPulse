import React from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import TelaConfiguracao from '@/components/elementos/TelaConfiguracao';

export default function Configuracoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };


  return (
    <Layout>
      <div>
        <TelaConfiguracao/>
      </div>
    </Layout>
  )
}
Configuracoes.auth = true