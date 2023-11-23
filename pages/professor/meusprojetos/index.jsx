import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Layout from '@/components/professores/LayoutProfessor'
import CadastroProjetos from '@/components/professores/CadastroProjetos'
import ProjetosCadastrados from '@/components/professores/ProjetosCadastrados'
import BotaoNovoProjeto from '@/components/elementos/BotaoNovoProjeto';


export default function ProjetosProf() {

  const { data: session } = useSession()

  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)// seta o token e coloca no local Storage
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };

  return (
    <div>
      <Layout>
        <Head>
          <title>Meus Projetos</title>
          <meta name='description' content='Tela de meus projetos' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>
        <ProjetosCadastrados />
        <BotaoNovoProjeto onClick={openModal} />
        <CadastroProjetos isOpen={isModalOpen} onClose={closeModal} />
      </Layout>
    </div>
  );
}

ProjetosProf.auth = true