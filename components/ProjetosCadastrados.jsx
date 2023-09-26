import React, { useState, useEffect } from 'react';
import ListarProjetos from './elementos/ListarProjetos';
import BarraDePesquisa from './elementos/BarraDePesquisa';
import Paginacao from './elementos/Paginacao';
import ProjetoCard from './ProjetoCard';

function MeusProjetos() {
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);
    const [paginaCorrente, setpaginaCorrente] = useState(1); //inicia na pagina 1
    const projetosPaginas = 4; // quantos serão visualizados por página

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        async function fetchProjetos() {
            try {
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
                setProjetosFiltrados(data); // Atualiza a lista de projetos filtrados
            } catch (error) {
                console.error(error);
            }
        }

        fetchProjetos();
    }, [token]); 

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
        <div>
            <BarraDePesquisa onSearch={handleSearch} />
            <div className='grid grid-cols-4 gap-3 mt-4' >
                {currentProjects.length > 0 ? (
                    currentProjects.map(projeto => (
                        <ProjetoCard key={projeto.id} projeto={projeto} />
                    ))
                ) : (
                    projetos.length > 0 ? (
                        <p>Nenhum projeto encontrado</p>
                    ) : (
                        <p>Carregando...</p>
                    )
                )}
            </div>
            <Paginacao 
                projetosPaginas={projetosPaginas} 
                totalProjects={projetosFiltrados.length} 
                paginate={paginate} 
            />
        </div>
    );
}

export default MeusProjetos;
