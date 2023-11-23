import React, { useState } from 'react';

export default function BarraDePesquisaUsuarios({ onSearch }) {
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Selecione');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ buscaUsuario, tipoUsuario });
  };

  return (
    <div className="bg-zinc-400 py-4 px-2 sm:px-6 md:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-2">Pesquise os Usuarios cadastrados</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg overflow-hidden">
          <input
            className="text-base text-gray-400 flex-grow outline-none px-4 py-2 sm:py-4"
            type="text"
            placeholder="Digite o nome do Usuário"
            value={buscaUsuario}
            onChange={(e) => setBuscaUsuario(e.target.value)}
          />
           <select
            id="status"
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
        >
            <option value="Selecione">Selecione</option>
            <option value="ADMIN">Admin</option>
            <option value="ALUNO">Aluno</option>
            <option value="PROFESSOR">Professor</option>
        </select>
          <button
            className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin mt-2 sm:mt-0 sm:ml-4 mr-2"
            onClick={handleSearch}
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  );
}
