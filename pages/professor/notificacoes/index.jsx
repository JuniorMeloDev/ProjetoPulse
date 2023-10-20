import React from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import NotificacaoCandidaturas from '@/components/professores/NotificacaoCandidatura';
import BarraDePesquisaNotificacao from '@/components/elementos/BarraDePesquisaNotificacao';

export default function Notificacoes() {

  const { data: session } = useSession()

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };// se não for, o usuario é direcionado para a pagina inicial


  return (
    <Layout>
      <div>
        <NotificacaoCandidaturas />
      </div>
    </Layout>
  )
}
Notificacoes.auth = true