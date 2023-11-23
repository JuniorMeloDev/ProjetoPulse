import Head from 'next/head'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Layout from '@/components/Admin/LayoutAdmin'
import BotaoNovoUsuario from '@/components/elementos/BotaoNovoUsuario'
import CadastroUsuarios from '@/components/Admin/CadastroUsuarios'
import ListarUsuarios from '@/components/Admin/ListarUsuarios'
import BarraDePesquisaUsuario from '@/components/Admin/BarraDePesquisaUsuarios'

export default function Inicio() {

  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!session || !session.user || !session.user.role.includes('ROLE_ADMIN')) {
    window.location.href = '/naoautenticado';
  };

  return (
    <Layout>
      <Head>
        <title>Início</title>
        <meta name='description' content='Tela de início' />
        <link rel='icon' href='/LogoIco.ico' />
      </Head>
      <ListarUsuarios />
      <BotaoNovoUsuario onClick={openModal} />
      <CadastroUsuarios isOpen={isModalOpen} onClose={closeModal} />

    </Layout>
  )
}
Inicio.auth = true