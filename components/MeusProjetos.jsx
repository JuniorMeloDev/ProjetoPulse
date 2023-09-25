import React, { useState, useEffect } from 'react';
import ListarProjetos from './elementos/ListarProjetos';
import BarraDePesquisa from './elementos/BarraDePesquisa';
import Paginacao from './elementos/Paginacao';
import ProjetoCard from './ProjetoCard';

function MeusProjetos() {
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);

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
    }, [token]); // Adicionei [token] como dependência para reagir a mudanças no token

    const handleSearch = ({ nomeProjeto, tipoProjeto, descricaoProjeto, requisitoProjeto }) => {
        const projetosFiltrados = projetos.filter(projeto => {
            const matchNomeProjeto = nomeProjeto ? projeto.titulo.toLowerCase().includes(nomeProjeto.toLowerCase()) : true;
            const matchTipoProjeto = tipoProjeto !== 'Selecione' ? projeto.tipo.toLowerCase() === tipoProjeto.toLowerCase() : true;
            const matchDescricaoProjeto = descricaoProjeto ? projeto.descricao.toLowerCase().includes(descricaoProjeto.toLowerCase()) : true;
            const matchRequisitoProjeto = requisitoProjeto ? projeto.requesito.toLowerCase().includes(requisitoProjeto.toLowerCase()) : true;
    
            return matchNomeProjeto && matchTipoProjeto && matchDescricaoProjeto && matchRequisitoProjeto;
        });
    
        setProjetosFiltrados(projetosFiltrados);
    };
    
    

    return (
        <div>
            <BarraDePesquisa onSearch={handleSearch} />
            <div className='grid grid-cols-4 gap-3 mt-4' >
                {projetosFiltrados.length > 0 ? (
                    projetosFiltrados.map(projeto => (
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
        </div>
    );
}

export default MeusProjetos;
