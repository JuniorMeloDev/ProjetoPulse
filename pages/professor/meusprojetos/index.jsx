import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import Layout from '@/components/professores/LayoutProfessor'
import CadastroProjetos from '@/components/professores/CadastroProjetos'
import MeusProjetos from '@/components/professores/ProjetosCadastrados'


export default function ProjetosProf() {

  const { data: session } = useSession()
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
        <MeusProjetos />
        <div className='text-center'>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Novo Projeto
          </button>
        </div>
        <CadastroProjetos isOpen={isModalOpen} onClose={closeModal} />
      </Layout>
    </div>
  );
}

ProjetosProf.auth = true