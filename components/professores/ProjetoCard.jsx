import React, { useState } from 'react';
import { format } from 'date-fns';


function ProjetoCard({ projeto, onDelete, onCandidatos }) {
    const [modalAberto, setModalAberto] = useState(false);
    const temCandidatos = projeto.candidaturas === true;

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    const handleCandidatos = () => {
        onCandidatos(projeto.id);
    };


    return (
        <div>
              <div
                 className='max-w-[14rem] mx-auto mt-2 mb-8 cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl'
                onClick={abrirModal}
            >
                <div className={`p-4 rounded-lg shadow-lg
                ${projeto.candidaturas ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-blue-300 hover:bg-blue-400'}`}>
                    <h2 className="text-xl font-bold mb-2 line-clamp-1 ">{projeto.titulo}</h2>
                    <p className="text-gray-700 mb-4 line-clamp-2"><strong>Descrição: </strong>{projeto.descricao}</p>
                </div>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl text-center font-bold mb-6">{projeto.titulo}</h2>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>ID do Projeto:</strong> {projeto.id}</p>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Descrição do Projeto:</strong> {projeto.descricao}</p>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Requisitos do projeto:</strong> {projeto.requisito}</p>
                        <p className='mb-2'><strong>Vagas:</strong> {projeto.vagas}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
                        <p className='mb-2'><strong>Tipo do Projeto:</strong> {projeto.tipo}</p>
                        <div className='flex justify-between gap-3'>
                            <button
                                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={fecharModal}
                            >
                                Fechar
                            </button>
                            <button
                        className={`bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4 ${temCandidatos ? '' : 'hidden'}`}
                        onClick={handleCandidatos}
                    >
                        Candidaturas
                    </button>
                            <button onClick={() => onDelete(projeto.id)}
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                               Deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjetoCard;
