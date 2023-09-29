import React from 'react'
import { useState } from 'react';

export default function SalvarImagem() {

    const [imagem, setImagem] = useState(null);

    const handleSelecionarImagem = (e) => {
      const arquivoSelecionado = e.target.files[0];
      setImagem(arquivoSelecionado);
    };
  

    const enviarImagem = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('token'));
      
          if (!token) {
            console.error('Token não encontrado.');
            return;
          }
      
          const formData = new FormData();
          formData.append('imagem', imagem); // 'arquivo' é o objeto File da imagem que você quer enviar
      
          const response = await fetch('http://localhost:8080/usuario/salvar/imagem', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
      
          if (response.ok) {
            console.log('Imagem enviada com sucesso!');
          } else {
            console.error('Erro ao enviar a imagem:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao enviar a imagem:', error);
        }
      };
      
      return (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleSelecionarImagem}
          />
          <div className='flex mt-6 '>
          <button onClick={enviarImagem}>Enviar Imagem</button>
        </div>
        </div>
      );
    }

    