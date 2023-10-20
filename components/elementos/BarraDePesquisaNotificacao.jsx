import React, { useState } from 'react';

export default function BarraDePesquisa({ onSearch }) {
  const [buscaMensagem, setNomeMensagem] = useState('');
  const [tipoPesquisa, setTipoPesquisa] = useState('Selecione');

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const listarMensagens = (e) => {
    e.preventDefault();
    onSearch({ buscaMensagem, tipoPesquisa, dataInicial, dataFinal });
  };

  return (
    <div className="bg-zinc-400 py-4 px-2 sm:px-6 md:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-2">Pesquise as notificações</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg overflow-hidden">
          <input
            className="text-base text-gray-400 flex-grow outline-none px-4 py-2 sm:py-4"
            type="text"
            placeholder="Digite o nome da mensagem"
            value={buscaMensagem}
            onChange={(e) => setNomeMensagem(e.target.value)}
          />
          <select
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
            value={tipoPesquisa}
            onChange={(e) => setTipoPesquisa(e.target.value)}
          >
            <option value="mensagem">Selecione</option>
            <option value="remetente">Remetente</option>
            <option value="data">Data</option>

          </select>
          {tipoPesquisa === 'data' && (
            <>
              <input
                type="date"
                className="text-base text-gray-400 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
              <span className="ml-3">a</span>
              <input
                type="date"
                className="text-base text-gray-400 outline-none border-2 px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-4"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
              />
            </>
          )}
          <button
            className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin mt-2 sm:mt-0 sm:ml-4 mr-2"
            onClick={listarMensagens}
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  );
}
