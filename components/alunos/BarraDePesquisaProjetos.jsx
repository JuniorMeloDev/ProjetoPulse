import React, { useState } from 'react';

export default function BarraDePesquisa({ onSearch }) {
  const [buscaProjeto, setNomeProjeto] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('Selecione');
  const [statusFiltro, setStatusFiltro] = useState('Selecione');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ buscaProjeto, tipoProjeto, statusFiltro });
  };

  return (
    <div className="bg-zinc-400 py-4 px-2 sm:px-6 md:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-2">Pesquise os projetos cadastrados pelas áreas correspondentes</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg overflow-hidden">
          <input
            className="text-base text-gray-400 flex-grow outline-none px-4 py-2 sm:py-4"
            type="text"
            placeholder="Digite o nome do projeto"
            value={buscaProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
          />
           <select
            id="status"
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
        >
            <option value="Selecione">Selecione</option>
            <option value="ANÁLISE">Análise</option>
            <option value="APROVADO">Aprovado</option>
            <option value="RECUSADO">Recusado</option>
        </select>
          <select
            id="Com"
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
            value={tipoProjeto}
            onChange={(e) => setTipoProjeto(e.target.value)}
          >
            <option>Selecione</option>
            <option>FrontEnd</option>
            <option>BackEnd</option>
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
