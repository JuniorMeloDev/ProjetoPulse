import React, {useState} from 'react'

import Layout from '@/components/Layout'
import CadastroProjetos from '@/components/elementos/CadastroProjetos'


export default function MeusProjetos() {

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
      <h1 className="text-3xl font-semibold">Meus projetos</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Novo Projeto
      </button>
      <CadastroProjetos isOpen={isModalOpen} onClose={closeModal} />
      </Layout>
    </div>
  );
}