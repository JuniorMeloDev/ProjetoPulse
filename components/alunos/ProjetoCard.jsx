import React, { useState } from 'react';
import { format } from 'date-fns';


function ProjetoCard({ projeto, onCandidatar  }) {
    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    const candidatar = () => {
        onCandidatar(projeto); // Chama a função onCandidatar passando o projeto como argumento
        fecharModal(); // Fecha o modal após clicar em "Candidatar"
    };

    return (
        <div>
            <div
                className="max-w-md mx-auto mt-2 mb-8 cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50"
                onClick={abrirModal}
            >
                <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2 line-clamp-1 ">{projeto.titulo}</h2>
                    <p className="text-gray-700 mb-4 line-clamp-2">Descrição do Projeto: {projeto.descricao}</p>
                </div>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl text-center font-bold mb-6">{projeto.titulo}</h2>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Descrição do Projeto:</strong> {projeto.descricao}</p>
                        <p className="max-w-[28rem] text-justify mb-2"><strong>Requisitos do projeto:</strong> {projeto.requisito}</p>
                        <p className='mb-2'><strong>Vagas:</strong> {projeto.vagas}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                        <p className=" text-justify line-clamp-3 mb-2"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
                        <p className='mb-2'><strong>Tipo do Projeto:</strong> {projeto.tipo}</p>
                        <p className='mb-2'><strong>Nome do Professor:</strong> {projeto.Professor}</p>
                        <div className='flex justify-between'>
                            <button
                                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={fecharModal}
                            >
                                Fechar
                            </button>
                            <button
                                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={candidatar} // Adicione esta linha para abrir o formulário
                            >
                                Candidatar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjetoCard;
