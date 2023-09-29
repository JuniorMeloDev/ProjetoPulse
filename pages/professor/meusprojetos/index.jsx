import React, { useState } from 'react'

import Layout from '@/components/Layout'
import CadastroProjetos from '@/components/professores/CadastroProjetos'
import MeusProjetos from '@/components/ProjetosCadastrados'


export default function ProjetosProf() {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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