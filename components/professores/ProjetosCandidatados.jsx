import React, { useState, useEffect } from 'react';
import BarraDePesquisa from '../elementos/BarraDePesquisa';
import Paginacao from '../elementos/Paginacao';
import CardCandidatura from './CardCandidatura';



function ProjetosCandidatados() {
    const [projetos, setProjetos] = useState([]);
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);
    const [paginaCorrente, setpaginaCorrente] = useState(1); //inicia na pagina 1
    const projetosPaginas = 8; // quantos serão visualizados por página
    // const [projetoExpandido, setProjetoExpandido] = useState(null);
    // const [mostrarFormulario, setMostrarFormulario] = useState(false);

  

    useEffect(() => {
       const ListarProjetosCandidaturas = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                if (!token) {
                    throw new Error('Token não encontrado no localStorage');
                }

                const response = await fetch(`http://localhost:8080/orientacao/listar/5`, {
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
                console.log('resposta', response)
            } catch (error) {
                console.error(error);
            }
        }

        ListarProjetosCandidaturas();
    }, []);


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
                        <CardCandidatura
                            key={projeto.id}
                            projeto={projeto}
                            onCandidatar={() => {
                                setProjetoExpandido(projeto);
                                setMostrarFormulario(true);
                            }}
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
            {/* <FormularioCandidatura
    projeto={projeto}
    alunosCandidatos={alunosCandidatos}
    onClose={() => setMostrarFormulario(false)}
    onSubmit={(projetoId, candidatura) => {
        // Faça a requisição para candidatar o aluno aqui
        console.log(`Enviando candidatura para o projeto ${projetoId}: ${candidatura}`);
        // Adicione aqui a lógica para enviar a candidatura
    }}
/> */} 
            {/* {mostrarFormulario && projetoExpandido && (
            <FormularioCandidatura
                projeto={projetoExpandido}
                onClose={() => setMostrarFormulario(false)}
                onSubmit={(projetoId, candidatura) => {
                    // Faça a requisição para candidatar o aluno aqui
                    console.log(`Enviando candidatura para o projeto ${projetoId}: ${candidatura}`);
                    // Adicione aqui a lógica para enviar a candidatura
                }}
            />
        )} */}
     
        </div>
    );
}

export default ProjetosCandidatados;
