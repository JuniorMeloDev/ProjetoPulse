import React, { useState } from 'react';

export default function BarraDePesquisa({ onSearch, textoParagrafo  }) {
  const [buscaProjeto, setNomeProjeto] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('Selecione');


  const handleSearch = (e) => {
    e.preventDefault();

    // Chame a função de busca passando os valores
    onSearch({ buscaProjeto, tipoProjeto});
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto bg-zinc-400 rounded-lg p-2">
        <form>
          <h1 className="text-center font-bold text-4xl">Projetos</h1>
          <p className="mx-auto font-normal text-sm my-2 max-w-lg text-center">
            Pesquise os projetos cadastrados pelas áreas correspondentes
          </p>
          <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2"
              type="text"
              placeholder="Digite o nome do projeto"
              value={buscaProjeto   }
              onChange={(e) => setNomeProjeto(e.target.value)}
            />
            <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto">
              <select
                id="Com"
                className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                value={tipoProjeto}
                onChange={(e) => setTipoProjeto(e.target.value)}
              >
                <option>Selecione</option>
                <option>FrontEnd</option>
                <option>BackEnd</option>
              </select>
              <button
                className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
                onClick={handleSearch}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
