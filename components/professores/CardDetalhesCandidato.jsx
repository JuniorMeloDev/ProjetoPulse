import React from 'react';

function CardDetalhesCandidato({ candidato, onClose }) {

  const aceitarCandidatura = async () => {

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch(`http://localhost:8080/orientacao/aceitar/${candidato.Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert('Candidatura aceita com Sucesso!');

        // onClose();
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
      }

    } catch (error) {
      console.error('Erro a aceitar a candidatura:', error);
      alert('Candidatura aceita com Sucesso! (catch)');
      onClose();
      // window.location.reload();

    }
  }

  const recusarCandidatura = async () => {

    try {
      const token = JSON.parse(localStorage.getItem('token'))// pegando o token do localStorage

      const response = await fetch(`http://localhost:8080/orientacao/recusar/${candidato.Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert('Candidatura recusada com Sucesso!');
        // onClose();
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
      }

    } catch (error) {
      console.error('Erro a recusar a candidatura:', error);
      alert('Candidatura recusada com Sucesso! (catch)');
      onClose();
      // window.location.reload();
    }
  }


  return (
    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
      <h2 className="text-2xl text-center font-bold mb-6">{candidato.nome}</h2>
      <p className="max-w-[28rem] text-justify mb-2">
        <strong>Resumo acadêmico:</strong> {candidato.habilidade}
      </p>
      <div className="flex justify-between">
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
      <button
        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onClose}
      >
        Voltar
      </button>
    </div>
  );
}

export default CardDetalhesCandidato;
