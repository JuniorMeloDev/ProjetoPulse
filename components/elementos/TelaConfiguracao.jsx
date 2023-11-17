import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SalvarImagem from './SalvarImagem';
import Link from 'next/link';

export default function TelaConfiguracao() {

    const { data: session } = useSession()

    const [formData, setFormData] = useState({
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        estado: '',
        cidade: '',
        bairro: ''
    });

    const [mensagem, setmensagem] = useState(false);

    const formatarTelefone = (value) => {
        // Remove tudo que não é dígito
        const digits = value.replace(/\D/g, '');

        // Adiciona a máscara
        const formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;

        return formattedValue;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: formatarTelefone(value)
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleCepChange = (e) => {
        const cep = e.target.value;

        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro && data.cep && data.logradouro && data.uf && data.localidade && data.bairro) {
                        setFormData({
                            ...formData,
                            cep: data.cep,
                            endereco: data.logradouro,
                            estado: data.uf,
                            cidade: data.localidade,
                            bairro: data.bairro
                        });
                    } else {
                        alert('CEP não encontrado');
                    }
                })
                .catch(error => {
                    console.error('Erro ao consultar CEP:', error);
                });
        }
    };



    useEffect(() => {
        if (formData && formData.cep && formData.cep.length === 8) {
            handleCepChange({ target: { value: formData.cep } });
        }

    }, [formData.cep]);


    useEffect(() => {
        // Carregue as informações iniciais ao montar o componente
        listarInformacoes();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await fetch('http://localhost:8080/informacoes/salvar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.text();
                console.log('Dados enviados com sucesso:', data);
                setmensagem(true);
                setTimeout(() => {
                    setmensagem(false);
                }, 2000)

            } else {
                console.error('Erro ao enviar os dados(else):', response.statusText);
                console.log(response)
            }

        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    const listarInformacoes = async (e) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await fetch('http://localhost:8080/informacoes/listar', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Informações exibidas com sucesso:', data);
                setFormData(data);
            } else {
                console.error('Erro ao exibir os dados:', response.statusText);
            }

        } catch (error) {
            console.error('Erro ao exibir os dados', error);
        }
    };

    return (
        <div>
            <div className='border border-gray-300 w-full rounded-md p-4 mb-3'>
                <div>
                    <p className='font-bold pb-1'>Foto do Usuário</p>
                    <div className='flex justify-between'>
                        <SalvarImagem />
                        <Link href="/trocarSenha" className="flex justify-center items-center bg-blue-900 hover:bg-blue-700 text-white font-bold w-28 h-12 mt-7 rounded">Trocar Senha</Link>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="border border-gray-300 p-4 rounded-md">
                <p className='font-bold'>Dados do Usuário</p>
                <div className="grid grid-cols-2 gap-2 mb-1">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={session.user.email}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            placeholder='(99)99999-9999'
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label htmlFor="cep">CEP:</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endereco">Endereço:</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="numero">Número:</label>
                        <input
                            type="text"
                            id="numero"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="complemento">Complemento:</label>
                        <input
                            type="text"
                            id="complemento"
                            name="complemento"
                            value={formData.complemento}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                        <label htmlFor="estado">Estado:</label>
                        <input
                            type="text"
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cidade">Cidade:</label>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bairro">Bairro:</label>
                        <input
                            type="text"
                            id="bairro"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 w-full rounded"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Salvar
                </button>
                {mensagem &&
                    <span className="block text-center bg-green-100 border border-green-400 text-green-700 font-bold px-4 py-2 rounded mt-2 text-base">
                        Informações salvas com sucesso
                    </span>}
            </form>
        </div>
    );
}