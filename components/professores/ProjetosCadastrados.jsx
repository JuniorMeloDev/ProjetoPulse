import React, { useState, useEffect } from 'react';
import BarraDePesquisa from '../elementos/BarraDePesquisa';
import Paginacao from '../elementos/Paginacao';
import ProjetoCard from './ProjetoCard';
import CardCandidatos from './CardCandidatos';



function ProjetosCadastrados() {
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);
    const [paginaCorrente, setpaginaCorrente] = useState(1); //inicia na pagina 1
    const projetosPaginas = 8; // quantos serão visualizados por página
    const [candidatos, setCandidatos] = useState([]);
    const [mostrarCandidatos, setMostrarCandidatos] = useState(false);

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
                alert("Projeto deletado com sucesso!")
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
            const matchBuscaProjeto = buscaProjeto ? projeto.titulo.toLowerCase().includes(buscaProjeto.toLowerCase()) ||
                projeto.descricao.toLowerCase().includes(buscaProjeto.toLowerCase()) ||
                projeto.requesito.toLowerCase().includes(buscaProjeto.toLowerCase()) : true;
            const matchTipoProjeto = tipoProjeto !== 'Selecione' ? projeto.tipo.toLowerCase() === tipoProjeto.toLowerCase() : true;

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
        <div className="max-h-screen flex flex-col">
            <div className="flex-grow">
                <BarraDePesquisa onSearch={handleSearch} />
                {projetos.length > 0 ? (
                    <div className='grid grid-cols-4 gap-3 mt-4'>
                        {currentProjects.map(projeto => (
                            <ProjetoCard
                                key={projeto.id}
                                onDelete={() => handleDelete(projeto.id)} // Passa a função onDelete como prop
                                projeto={projeto}
                                onCandidatos={handleCandidatos}
                                hasCandidaturas={projeto.orientacao && projeto.orientacao.length > 0}
                            />

                        ))}
                        
                    </div>
                ) : (
                    <p className="text-center mt-4">
                        Olá Professor, Cadastre o seu primeiro projeto!
                    </p>
                )}
                <div className="fixed bottom-1" >
                    <Paginacao
                        projetosPaginas={projetosPaginas}
                        totalProjects={projetosFiltrados.length}
                        paginate={paginate}
                    />
                </div>
            </div>
            {mostrarCandidatos && (
                <CardCandidatos
                    candidatos={candidatos}
                    onClose={() => setMostrarCandidatos(false)}
                />
            )}
        </div>
    );
}

export default ProjetosCadastrados;
