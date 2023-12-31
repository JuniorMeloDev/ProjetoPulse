import React, { useState } from 'react'

export default function CadastroProjetos({ isOpen, onClose }) {

    if (!isOpen) return null;

    const token = JSON.parse(localStorage.getItem('token'))// pegando o token do localStorage
    const [mostrarMensagemCadastro, setMostrarMensagemCadastro] = useState(false);
    const [mostrarMensagemData, setMostrarMensagemData] = useState(false)
    const [mostrarMensagemVagas, setMostrarMensagemVagas] = useState(false)

    const [projeto, setProjeto] = useState({
        titulo: '',
        descricao: '',
        requisito: '',
        vagas: 0,
        tipo: '',
        dataInicial: '',
        dataFinal: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjeto({ ...projeto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (projeto.vagas === 0) {
            setMostrarMensagemVagas(true)
            setTimeout(() => {
                setMostrarMensagemVagas(false)
            }, 3000);
            return //nao deixa cadastrar o projeto se tiver 0 vagas
        }

        const dataAtual = new Date().toLocaleDateString('en-CA'); // 'YYYY-MM-DD'

        if (projeto.dataInicial < dataAtual) {
            setMostrarMensagemData("A data de início deve ser igual ou posterior à data atual.");
            setTimeout(() => {
                setMostrarMensagemData(false)
            }, 4000)
            return;
        }

        if (projeto.dataFinal < projeto.dataInicial) {
            setMostrarMensagemData("A data de término deve ser igual ou posterior à data de início.");
            setTimeout(() => {
                setMostrarMensagemData(false)
            }, 4000)
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/projeto/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(projeto),
            });

            if (response.ok) {
                const data = await response.text()
                console.log('Projeto cadastrado com sucesso', data)
                setMostrarMensagemCadastro(true);
                setTimeout(() => {
                    setMostrarMensagemCadastro(false);
                    onClose();
                    window.location.reload();
                }, 3000);
            } else {
                console.error('Erro ao enviar os dados:', response.statusText);
            }

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao Cadastrar o projeto');
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="py-1 text-left px-6">
                        <div className="flex justify-end items-center">
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                            >
                                Fechar
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nome do Projeto:
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="titulo"
                                    value={projeto.titulo}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Quantidade de Vagas Disponíveis:
                                </label>
                                <input
                                    required
                                    type="number"
                                    name="vagas"
                                    value={projeto.vagas}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Data de Início:
                                </label>
                                <input
                                    required
                                    type="date"
                                    name="dataInicial"
                                    value={projeto.dataInicial}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Data de Término:
                                </label>
                                <input
                                    required
                                    type="date"
                                    name="dataFinal"
                                    value={projeto.dataFinal}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Descrição do Projeto:
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="descricao"
                                    value={projeto.descricao}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Requisitos do Projeto:
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="requisito"
                                    value={projeto.requisito}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2">
                                <label className=" text-gray-700 text-sm font-bold mb-2">Tipo do Projeto</label>
                                <select
                                    required
                                    name='tipo'
                                    onChange={handleChange}
                                    value={projeto.tipo}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Selecione um opção</option>
                                    <option>BackEnd</option>
                                    <option>FrontEnd</option>
                                    <option>Matemática</option>
                                    <option>Português</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-end">
                                {!mostrarMensagemCadastro && (
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Salvar
                                    </button>
                                )}
                            </div>
                            {mostrarMensagemCadastro && (
                                <span className="block text-center bg-green-100 border border-green-400 text-green-700 font-bold text-base rounded mt-2">
                                    Projeto Cadastrado com Sucesso
                                </span>
                            )}
                            {mostrarMensagemData && (
                                <span className="block text-center bg-red-100 border border-red-400 text-red-700 font-bold rounded mt-2">
                                    {mostrarMensagemData}
                                </span>
                            )}
                            {mostrarMensagemVagas && (
                                <span className="block text-center bg-red-100 border border-red-400 text-red-700 font-bold text-base rounded mt-2">
                                    Adicione no mínimo 1 vaga!
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

