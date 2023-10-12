import React from 'react';

export default function CardDetalhesCandidato({ candidato, onAceitar, onRecusar }) {
  return (
    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
      <h2 className="text-2xl text-center font-bold mb-6">{candidato.nome}</h2>
      <p className="max-w-[28rem] text-justify mb-2">
        <strong>Resumo acadêmico:</strong> {candidato.habilidade}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onAceitar(candidato.id)}
        >
          Aceitar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onRecusar(candidato.id)}
        >
          Recusar
        </button>
      </div>
    </div>
  );
}


