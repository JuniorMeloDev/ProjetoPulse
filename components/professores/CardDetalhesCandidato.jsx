import React, { useState } from 'react';

function CardDetalhesCandidato({ candidato, onClose }) {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const aceitarCandidatura = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch(`http://localhost:8080/orientacao/aceitar/${candidato.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Candidatura aceita com sucesso', data);
        setMostrarMensagem(true);
        setMensagem('Candidatura Aceita com Sucesso!');

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro a aceitar a candidatura(catch):', error);
      alert('Erro no cadastramento da candidatura');
    }
  }

  const recusarCandidatura = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const response = await fetch(`http://localhost:8080/orientacao/recusar/${candidato.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.text();
        setMostrarMensagem(true);
        setMensagem('Candidatura Recusada com Sucesso!');

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro a recusar a candidatura:', error);
      alert('Erro ao recusar a candidatura');
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 flex flex-col items-center">
        <h2 className="text-2xl text-center font-bold mb-6">{candidato.nome}</h2>
        <p className="max-w-[28rem] text-justify mb-2">
          <strong>Resumo acadêmico:</strong> {candidato.habilidade}
        </p>
        {mostrarMensagem ? (
          <span className="block text-center bg-red-100 border border-red-400 text-green-700 font-bold text-base px-2 py-4 rounded mt-2">
            {mensagem}
          </span>
        ) : (
          <div className="flex justify-between gap-3 mt-10">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => aceitarCandidatura()}
            >
              Aceitar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => recusarCandidatura()}
            >
              Recusar
            </button>
          </div>
        )}
        <div className='flex justify-center'>
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={onClose}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetalhesCandidato;
