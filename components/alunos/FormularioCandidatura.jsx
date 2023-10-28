import { useState } from "react";
import { format } from 'date-fns';

export default function FormularioCandidatura({ projeto, onClose, onSubmit }) {
    
    const [habilidade, setHabilidade] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    const token = JSON.parse(localStorage.getItem('token'))

    const handleHabilidadeChange = (e) => {
        setHabilidade(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            const data = await response.text();
            console.log('Dados enviados com sucesso:', data);
            setMostrarMensagem(true);

            setTimeout(() => {
                setMostrarMensagem(false);
                onClose();
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error('Erro ao enviar os dados', error);
            alert("Erro ao enviar os dados!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-xl font-bold mb-2">{projeto.titulo}</h2>
                <p className="text-gray-700 text-justify line-clamp-3 mt-2">
                    <strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}
                </p>
                <p className="text-gray-700 text-justify line-clamp-3 mt-2">
                    <strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}
                </p>
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
                    <div className='flex justify-between mt-4'>
                        <button
                            className={`bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ${mostrarMensagem ? 'hidden' : ''}`}
                            onClick={onClose}
                        >
                            Voltar
                        </button>
                        <button
                            className={`bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ${mostrarMensagem ? 'hidden' : ''}`}
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                    {mostrarMensagem && (
                        <span className="block text-center bg-green-100 border border-green-400 text-black font-bold px-4 py-2 rounded mt-2 text-xl">
                            Candidatura Enviada Com Sucesso!
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}
