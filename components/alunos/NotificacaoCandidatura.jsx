import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import NotificacaoCard from './NotificacaoCard';

export default function NotificacaoCandidaturas() {
  const [mensagens, setMensagens] = useState([]);
  const [modalMensagem, setModalMensagem] = useState(null);

  useEffect(() => {
    async function listarMensagens() {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
          throw new Error('Token não encontrado no localStorage');
        }

        const response = await fetch('http://localhost:8080/mensagem/listar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao obter a lista de mensagens');
        }

        const data = await response.json();
        setMensagens(data);
      } catch (error) {
        console.error(error);
      }
    }

    listarMensagens();
  }, []);

  const handleMensagemClick = (mensagem) => {
    setModalMensagem(mensagem);
  };

  const handleCloseModal = () => {
    setModalMensagem(null);
  };

  return (
    <div>
      <h1 className='font-bold text-3xl mb-10'>Notificações</h1>
      <ul>
        {mensagens.map(mensagem => (
          <li key={mensagem.id}>
            <p className="cursor-pointer" onClick={() => handleMensagemClick(mensagem)}>
              <strong>Remetente:</strong> {mensagem.remetente}<br />
              <strong>Enviando em: </strong>{format(new Date(mensagem.horarioEnvio), 'dd/MM/yyyy HH:mm a')}
            </p>
            <hr className='' />
          </li>
        ))}
      </ul>

      {modalMensagem && <NotificacaoCard mensagem={modalMensagem} onClose={handleCloseModal} />}
    </div>
  );
}
