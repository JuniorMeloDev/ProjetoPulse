import React, { useState } from 'react';
import { format } from 'date-fns';


export default function CardDetalhesCandidatura({ projeto }) {
    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    let corFundo;
    switch (projeto.status) {
        case 'ANÁLISE':
            corFundo = 'bg-yellow-200 hover:bg-yellow-300'; // Cor amarela para status 'Análise'
            break;
        case 'APROVADO':
            corFundo = 'bg-blue-300 hover:bg-blue-400'; // Cor verde para status 'Aprovado'
            break;
        case 'RECUSADO':
            corFundo = 'bg-red-300 hover:bg-red-400'; // Cor vermelha para status 'Recusado'
            break;
        default:
            corFundo = 'bg-gray-300'; // Cor padrão (caso o status não seja reconhecido)
    }

    return (
        <div>
            <div
                className={`max-w-md mx-auto mt-2 mb-8 cursor-pointer rounded-md shadow-md hover:shadow-2xl ${corFundo}`}
                onClick={abrirModal}
            >
                <div className="p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2 line-clamp-1 ">{projeto.titulo}</h2>
                    <p className="text-gray-700 mb-4 line-clamp-2"><strong>Descrição: </strong> {projeto.descricao}</p>
                </div>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl text-center font-bold mb-6">{projeto.titulo}</h2>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Descrição do Projeto:</strong> {projeto.descricao}</p>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Requisitos do projeto:</strong> {projeto.requisito}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
                        <p className='mb-2'><strong>Tipo do Projeto:</strong> {projeto.tipo}</p>
                        <p className='mb-2'><strong>Nome do Professor:</strong> {projeto.Professor}</p>
                        <div className='bg-slate-200 rounded-3xl p-1'>
                        <p className='text-2xl font-bold text-center mt-4 mb-4'>Status da Candidatura: </p>
                        <p className='text-2xl font-bold text-center text-blue-900 mt-4 mb-4'>{projeto.status}</p>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
                                onClick={fecharModal}
                            >
                                Fechar
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


