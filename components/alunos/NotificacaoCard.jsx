import React from 'react';
import { format } from 'date-fns';

const NotificacaoCard = ({ mensagem, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className='font-bold text-2xl mb-3'>Detalhes da Mensagem</h2>
        <strong>Remetente:</strong> {mensagem.remetente}<br />
        <strong>Mensagem:</strong> {mensagem.mensagem}<br />
        <strong>Enviado em:</strong> {format(new Date(mensagem.horarioEnvio), 'dd/MM/yyyy HH:mm a')}<br />
      </div>
    </div>
  );
}

export default NotificacaoCard;
