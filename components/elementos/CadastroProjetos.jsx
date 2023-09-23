'use client'

import React, { useState } from 'react'

export default function CadastroProjetos({ isOpen, onClose }) {

    if (!isOpen) return null;

    const token = JSON.parse(localStorage.getItem('token'))// pegando o token do localStorage
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [projeto, setProjeto] = useState({
        titulo: '',
        descricao: '',
        requisito: '',
        vagas: 0,
        tipo: '',
        dataInicial: '',
        dataFinal: '',
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('Fechando modal...')
        setIsModalOpen(false);
       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjeto({ ...projeto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { //verificando os erros do pq a requisição não pega
            console.log('Enviando requisição para o servidor...');
            console.log('Token:', token); // Verifica se o token está correto
            console.log('Projeto a ser enviado:', projeto); // Verifica se os dados do projeto estão corretos

            const response = await fetch('http://localhost:8080/projeto/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(projeto),
            })

            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);

            // Feche o modal após o envio bem-sucedido
            closeModal();
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            closeModal()
        }
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
                                    name="titulo"
                                    value={projeto.titulo}
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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Data de Início:
                                </label>
                                <input
                                    type="date"
                                    name="dataInicial"
                                    value={projeto.dataInicial}
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
                                    name="dataFinal"
                                    value={projeto.dataFinal}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
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
                                    name="requisito"
                                    value={projeto.requisito}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                             <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2">Tipo do Projeto</label>
                                <select name='tipo' onChange={handleChange} value={projeto.tipo} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Selecione um opção</option>
                                    <option>BACKEND</option>
                                    <option>FRONTEND</option>
                                </select>
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
