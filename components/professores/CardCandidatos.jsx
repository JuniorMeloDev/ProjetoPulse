import React, { useState } from 'react';
import CardDetalhesCandidato from './CardDetalhesCandidato';

function CardCandidatos({ candidatos, onClose }) {
  const [modalHabilidadeAberto, setModalHabilidadeAberto] = useState(false);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(false);

  const handleDetalhesCandidato = (candidato) => {
    setCandidatoSelecionado(candidato);
    setModalHabilidadeAberto(true);// Agora abre o modal de habilidades
  };

  const handleAceitarCandidato = (candidatoId) => {
    // Implemente a lógica para aceitar o candidato
  };

  const handleRecusarCandidato = (candidatoId) => {
    // Implemente a lógica para recusar o candidato
  };

  const handleFecharModal = () => {
    setCandidatoSelecionado(false);
    onClose(); // Fecha o modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
        <button
          className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 m-4"
          onClick={handleFecharModal}
        >
          Fechar
        </button>
        {modalHabilidadeAberto && candidatoSelecionado && (
          <CardDetalhesCandidato
            candidato={candidatoSelecionado}
            onAceitar={handleAceitarCandidato}
            onRecusar={handleRecusarCandidato}
          />
        )}
        <h2 className='text-3xl font-bold mb-4'>Candidatos</h2>
        {candidatos.map((candidato) => (
          <div className='cursor-pointer hover:text-blue-500 p-2'
            key={candidato.id}
            onClick={() => handleDetalhesCandidato(candidato)}
          >
            {candidato.nome}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardCandidatos;
