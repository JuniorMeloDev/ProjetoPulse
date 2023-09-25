import React from 'react';
import { format } from 'date-fns';

function ProjetoCard({ projeto }) {
    return (
        <div className="max-w-md mx-auto mt-2 mb-8 cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-2">{projeto.titulo}</h2>
                <p className="text-gray-700 mb-4">Descrição do Projeto: {projeto.descricao}</p>
                <p>Requisitos do projeto: {projeto.requesito}</p>
                <p>Tipo do Projeto: {projeto.tipo}</p>
                <p>Vagas: {projeto.vagas}</p>
                <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                    <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
            </div>
        </div>
    );
}

export default ProjetoCard;
