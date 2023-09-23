import React, { useState, useEffect } from 'react';

function Projetos() {
  const [projetos, setProjetos] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'))// pegando o token do localStorage
 

  useEffect(() => {
    async function fetchProjetos() {
      try {
        const response = await fetch('http://localhost:8080/projeto/listar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }); // Rota no backend para obter a lista de projetos

        if (!response.ok) {
          throw new Error('Erro ao obter a lista de projetos');
        }

        const data = await response.json();
        console.log(data)
        setProjetos(data); // Define o estado com a lista de projetos
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjetos();
  }, []);

  return (
    <div>
      <h1 className='text-5xl'>Lista de Projetos</h1>
      <p className='flex flex-col mt-10 text-2xl'>
        {projetos.map(projeto => (
          <span key={projeto.id}>Nome do Projeto: {projeto.titulo}<p>Descrição do Projeto: {projeto.descricao}</p> <p>  Requisitos do projeto:  {projeto.requesito}</p><p> Tipo do Projeto: {projeto.tipo}</p><p> Vagas: {projeto.vagas}</p><p> Data Inicial: {projeto.dataInicial}</p> <p> Data Final: {projeto.dataFinal}</p> </span>
        ))}
      </p>
    </div>
  );
}

export default Projetos;



