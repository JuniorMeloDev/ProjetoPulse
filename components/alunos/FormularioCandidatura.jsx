import { useState, useEffect } from "react";
import { format } from 'date-fns';

export default function FormularioCandidatura({ projeto, onClose, onSubmit }) {
    
    const [habilidade, setHabilidade] = useState('');

    const token = JSON.parse(localStorage.getItem('token'))

    const handleHabilidadeChange = (e) => {
        setHabilidade(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(projeto.id, habilidade);
        onClose();

        try {
            const response = await fetch('http://localhost:8080/orientacao/candidatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    habilidade: habilidade,
                    projetoId: projeto.id,
                }),
            });

            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);
            alert('candidatura com sucesso')

        } catch (error) {
            console.error('Erro ao enviar os dados (catch):', error);
            alert("Candidatura cadastrada com sucesso!")
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-xl font-bold mb-2">{projeto.titulo}</h2>
                <p className="text-gray-700 text-justify line-clamp-3 mt-2"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                <p className="text-gray-700 text-justify line-clamp-3 mt-2"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 text-base text-justify font-bold mb-4 mt-8 max-w-[22rem]">
                        Escreva um pequeno resumo sobre suas experiências acadêmicas, habilidades e conhecimentos:
                    </label>
                    <textarea
                        required 
                        type="text"
                        value={habilidade}
                        onChange={handleHabilidadeChange}
                        className="shadow appearance-none border rounded w-full h-48 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className='flex justify-between'>
                    <button
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={onClose} // Adicione esta linha para abrir o formulário
                        >
                            Voltar
                        </button>
                        <button
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                            type="submit"
                        >
                            Enviar
                        </button>
                      
                    </div>
                </form>
            </div>
        </div>
    );
}
