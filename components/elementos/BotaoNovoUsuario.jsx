import React from 'react';

const BotaoNovoUsuario = ({ onClick }) => {
  
  return (
    <div className='text-center'>
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Novo Usuário
      </button>
    </div>
  );
};

export default BotaoNovoUsuario;
