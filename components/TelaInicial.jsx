import React, { useState, useEffect } from 'react';

const TelaInicial = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await response.json();
        setProjetos(data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  return (
    <div>
      <div>
        {projetos.map((projeto) => (
          <img key={projeto.id} src={projeto.download_url} alt={projeto.author} />
        ))}
      </div>
    </div>
  );
};

export default TelaInicial;
