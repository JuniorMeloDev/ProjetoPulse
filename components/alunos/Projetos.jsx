import React, { useEffect, useState } from 'react';
//import getProjetosAcademicos from './api'; // Importe a função que faz a requisição

function ProjetosAcademicos() {
  const [projetos, setProjetos] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getProjetosAcademicos();
//       setProjetos(data);
//     }

//     fetchData();
//   }, []);

  return (
    <div>
      {projetos.map((projeto) => (
        <div key={projeto.id} className="card">
          <h3>{projeto.titulo}</h3>
          <p>{projeto.descricao}</p>
          {/* Adicione outros detalhes do projeto acadêmico aqui */}
        </div>
      ))}
    </div>
  );
}

export default ProjetosAcademicos;
