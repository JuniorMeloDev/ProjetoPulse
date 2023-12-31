import React, { useState, useEffect } from 'react';
import BarraDePesquisa from '../elementos/BarraDePesquisa';
import Paginacao from '../elementos/Paginacao';
import ProjetoCard from './ProjetoCard';
import CardCandidatos from './CardCandidatos';
import LegendaStatusCandidatos from '../elementos/LegendaStatusCandidaturas';



function ProjetosCadastrados() {
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);
    const [paginaCorrente, setpaginaCorrente] = useState(1); //inicia na pagina 1
    const [projetosPaginas, setProjetosPaginas] = useState(8); // quantos serão visualizados por página
    const [candidatos, setCandidatos] = useState([]);
    const [mostrarCandidatos, setMostrarCandidatos] = useState(false);
    const [mostrarMensagemDeletada, setMostrarMensagemDeletada] = useState(false)


    useEffect(() => {
        async function fetchProjetos() {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                if (!token) {
                    throw new Error('Token não encontrado no localStorage');
                }

                const response = await fetch('http://localhost:8080/projeto/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter a lista de projetos');
                }

                const data = await response.json();
                setProjetos(data);
                setProjetosFiltrados(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProjetos();
    }, []);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 500) {
                setProjetosPaginas(2); // Altere o número de projetos por página para x em telas menores que 500px
            } else {
                setProjetosPaginas(8); // Caso contrário, mantenha o padrão de x projetos por página
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCandidatos = async (projetoId) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                throw new Error('Token não encontrado no localStorage');
            }

            const response = await fetch(`http://localhost:8080/orientacao/listar/${projetoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter a lista de projetos de candidaturas');
            }

            const data = await response.json();
            setCandidatos(data);
            setMostrarCandidatos(true);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (projetoId) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await fetch(`http://localhost:8080/projeto/deletar/${projetoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                // Atualize a lista de projetos após a deleção
                const updatedProjetos = projetos.filter(projeto => projeto.id !== projetoId);
                setProjetos(updatedProjetos);
                setProjetosFiltrados(updatedProjetos);
                setMostrarMensagemDeletada(true) //mostrar a mensagem 'Projeto deletado...'
                setTimeout(() => {
                    setMostrarMensagemDeletada(false)// esconde a mensagem
                }, 3000)

            } else {
                console.error('Erro ao deletar o projeto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar o projeto:', error);
        }
    }


    // funcão para pesquisar projetos pelo titulo, descrição ou requisitos
    const handleSearch = ({ buscaProjeto, tipoProjeto }) => {
        const projetosFiltrados = projetos.filter(projeto => {
            const matchBuscaProjeto = buscaProjeto ?
                (projeto.titulo && projeto.titulo.toLowerCase().includes(buscaProjeto.toLowerCase())) ||
                (projeto.descricao && projeto.descricao.toLowerCase().includes(buscaProjeto.toLowerCase())) ||
                (projeto.requesito && projeto.requesito.toLowerCase().includes(buscaProjeto.toLowerCase()))
                : true;
            const matchTipoProjeto = tipoProjeto !== 'Selecione' ? (projeto.tipo && projeto.tipo.toLowerCase() === tipoProjeto.toLowerCase()) : true;

            return matchBuscaProjeto && matchTipoProjeto;
        });

        setProjetosFiltrados(projetosFiltrados);
        setpaginaCorrente(1); // Resetando para a primeira página ao realizar uma nova busca
    };


    // constantes para uso de paginação. junto com o componente 'Paginação.JSX'
    const indexOfLastProject = paginaCorrente * projetosPaginas;
    const indexOfFirstProject = indexOfLastProject - projetosPaginas;
    const currentProjects = projetosFiltrados.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setpaginaCorrente(pageNumber);


    return (
        <div className="">
            <div className="">
                <BarraDePesquisa onSearch={handleSearch} />
                {mostrarMensagemDeletada && (
                    <span className="block text-center bg-red-100 border border-red-400 text-green-700 font-bold text-base px-4 py-2 rounded mt-2">Projeto deletado com sucesso!</span>
                )}
                {projetos.length > 0 ? (
                    <div className={`grid ${window.innerWidth < 500 ? 'grid-cols-1' : 'grid-cols-4'} `}>
                        {currentProjects.map(projeto => (
                            <ProjetoCard
                                key={projeto.id}
                                onDelete={() => handleDelete(projeto.id)}
                                projeto={projeto}
                                onCandidatos={handleCandidatos}
                            />
                        ))}
                    </div>

                ) : (
                    <p className="text-center mt-4">
                        Olá Professor, Cadastre o seu primeiro projeto!
                    </p>
                )}

            </div>
            <div>
                <Paginacao
                    projetosPaginas={projetosPaginas}
                    totalProjects={projetosFiltrados.length}
                    paginate={paginate}
                />
            </div>
            {mostrarCandidatos && (
                <CardCandidatos
                    candidatos={candidatos}
                    onClose={() => setMostrarCandidatos(false)}
                />
            )}
             <LegendaStatusCandidatos/>
        </div>
       
    );
}

export default ProjetosCadastrados;
