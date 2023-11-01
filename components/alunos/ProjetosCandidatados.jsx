import React, { useState, useEffect } from 'react';
import BarraDePesquisa from './BarraDePesquisaProjetos';
import Paginacao from '../elementos/Paginacao';
import CardDetalhesCandidatura from './CardDetalhesCandidatura';
import LegendaStatus from '../elementos/LegendaStatus';


export default function ProjetosCandidatados() {
    
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);
    const [paginaCorrente, setpaginaCorrente] = useState(1); //inicia na pagina 1
    const projetosPaginas = 8; // quantos serão visualizados por página
    const [statusFiltro, setStatusFiltro] = useState('Todos');



    useEffect(() => {
        async function listarProjetosCandidatados() {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                if (!token) {
                    throw new Error('Token não encontrado no localStorage');
                }

                const response = await fetch('http://localhost:8080/orientacao/concorrendo', {
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
                setProjetosFiltrados(data); // Atualiza a lista de projetos filtrados
            } catch (error) {
                console.error(error);
            }
        }

        listarProjetosCandidatados();
    }, []);


    // funcão para pesquisar projetos pelo titulo, descrição ou requisitos
    const handleSearch = ({ buscaProjeto, tipoProjeto, statusFiltro }) => {
        const projetosFiltrados = projetos.filter(projeto => {
            const matchBuscaProjeto = buscaProjeto ? projeto.titulo.toLowerCase().includes(buscaProjeto.toLowerCase()) ||
                projeto.descricao.toLowerCase().includes(buscaProjeto.toLowerCase()) ||
                projeto.requesito.toLowerCase().includes(buscaProjeto.toLowerCase()) : true;
            const matchTipoProjeto = tipoProjeto !== 'Selecione' ? projeto.tipo.toLowerCase() === tipoProjeto.toLowerCase() : true;
            const matchStatus = statusFiltro !== 'Todos' ? projeto.status.toLowerCase() === statusFiltro.toLowerCase() : true;
    
            return matchBuscaProjeto && matchTipoProjeto && matchStatus;
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
        <div>
            <BarraDePesquisa onSearch={handleSearch} />
            <div className='grid grid-cols-4 gap-3 mt-4' >
                {currentProjects.length > 0 ? (
                    currentProjects.map(projeto => (
                        <CardDetalhesCandidatura
                            key={projeto.id}
                            projeto={projeto}
                            statusFiltro={statusFiltro}
                            onCandidatar={() => {
                                setProjetoExpandido(projeto);
                                setMostrarFormulario(true);
                            }}
                        />
                    ))
                ) : (
                    projetos.length > 0 ? (
                        <p>Nenhum projeto encontrado</p>
                    ) : (
                        <p>Carregando...</p>
                    )
                )}
            </div>
            <div>
                <Paginacao
                    projetosPaginas={projetosPaginas}
                    totalProjects={projetosFiltrados.length}
                    paginate={paginate}
                />
            </div>
            <LegendaStatus/>
        </div>
    );
}
