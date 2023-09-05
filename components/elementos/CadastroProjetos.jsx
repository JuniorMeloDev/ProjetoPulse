import React, { useState } from 'react'


export default function CadastroProjetos({ isOpen, onClose }) {

    if (!isOpen) return null;

    const token = 'appPulse'

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [projeto, setProjeto] = useState({
        nome: '',
        vagas: 0,
        // dataInicio: '',
        // dataFim: '',
        descricao: '',
        requisitos: '',
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjeto({ ...projeto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/projeto/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(projeto),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Dados enviados com sucesso:', data);

                // Feche o modal após o envio bem-sucedido
                closeModal();
            })
            .catch((error) => {
                console.error('Erro ao enviar os dados:', error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute w-full h-full">
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">Novo Projeto</p>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                            >
                                Fechar
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nome do Projeto:
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={projeto.nome}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Quantidade de Vagas Disponíveis:
                                </label>
                                <input
                                    type="number"
                                    name="vagas"
                                    value={projeto.vagas}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Data de Início:
                                </label>
                                <input
                                    type="date"
                                    name="dataInicio"
                                    value={projeto.dataInicio}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Data de Término:
                                </label>
                                <input
                                    type="date"
                                    name="dataFim"
                                    value={projeto.dataFim}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Descrição do Projeto:
                                </label>
                                <input
                                    type="text"
                                    name="descricao"
                                    value={projeto.descricao}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Requisitos do Projeto:
                                </label>
                                <input
                                    type="text"
                                    name="requisitos"
                                    value={projeto.requisitos}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
