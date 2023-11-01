import { useState } from "react";
import { format } from 'date-fns';

export default function FormularioCandidatura({ projeto, onClose, onSubmit }) {

    const [habilidade, setHabilidade] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [jaSolicitou, setJaSolicitou] = useState(false); //verifica se ja solicitou a candidatura
    const [vagasDisponiveis, setVagasDisponiveis] = useState(false);


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

            if (projeto.vagas == 0) {
                setVagasDisponiveis(true);
                return;
            }
            if (response.ok) {
                const data = await response.text();
                console.log('Candidatura enviada com sucesso:', data);
                setMostrarMensagem(true);

                setTimeout(() => {
                    setMostrarMensagem(false);
                    onClose();
                    window.location.reload();
                }, 3000);
                
                } else if (response.status === 400) {
                    const data = await response.text();
                    if(data === "Usuario ja cadastrado nesse projeto") {
                        setJaSolicitou(true)
                        console.error('Erro ao candidatar:', data);
                    }
    
                 } else {
                console.error('Erro ao candidatar:', response.statusText);
                alert('Erro ao candidatar. Por favor, tente novamente mais tarde.');
            }

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
                            className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'
                            onClick={onClose}
                        >
                            Voltar
                        </button>
                        <button
                            className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                    {mostrarMensagem && (
                        <span className="block text-center bg-green-100 border border-green-400 text-green-700 font-bold text-base px-4 py-2 rounded mt-2">
                            Candidatura Enviada Com Sucesso!
                        </span>
                    )}

                    {jaSolicitou && (
                        <span className="block text-center bg-red-100 border border-red-400 text-green-700 font-bold text-base px-4 py-2 rounded mt-2">
                            Você já solicitou a candidatura para esse projeto!
                        </span>
                    )}
                     {vagasDisponiveis && (
                        <span className="block text-center bg-red-100 border border-red-400 text-green-700 font-bold text-base px-4 py-2 rounded mt-2">
                            Vagas esgotadas!
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}
