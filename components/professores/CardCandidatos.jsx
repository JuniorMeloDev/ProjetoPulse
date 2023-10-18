import React, { useState } from 'react';
import CardDetalhesCandidato from './CardDetalhesCandidato';

function CardCandidatos({ candidatos, onClose }) {
    const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);

    const handleCandidatoClick = (candidato) => {
        setCandidatoSelecionado(candidato);
    };

    const handleCloseResumo = () => {
        setCandidatoSelecionado(null);
        onClose(); // Fecha o modal
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 flex flex-col items-center">
                <h2 className='text-3xl font-bold mb-4'>Candidatos</h2>
                <p className='mb-2 font-thin'>Clique nos nomes dos candidatos para abrir seu resumo acadêmico: </p>
                {candidatos.map((candidato, index) => (
                <div
                    className='cursor-pointer font-bold hover:text-blue-500 p-2'
                    key={index}
                    onClick={() => handleCandidatoClick(candidato)}
                >
                    {`${index + 1} - ${candidato.nome}`}
                </div>
            ))}
                <button
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleCloseResumo}
                >
                    Voltar
                </button>
            </div>

            {candidatoSelecionado && (
                <CardDetalhesCandidato
                    candidato={candidatoSelecionado}
                    onClose={() => setCandidatoSelecionado(null)} // Fechar o modal do detalhe do candidato
                />
            )}
        </div>
    );
}

export default CardCandidatos;
