import React, { useState } from 'react';

const EsqueciSenhaForm = () => {
  const [SenhaEmail, setSenhaEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/enviar/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ SenhaEmail })
      });

      if (response.ok) {
        console.log('Solicitação de redefinição de senha enviada com sucesso!');
      } else {
        console.error('Erro ao enviar a solicitação de redefinição de senha:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação de redefinição de senha:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Endereço de E-mail:</label>
        <input
          type="email"
          id="SenhaEmail"
          value={SenhaEmail}
          onChange={(e) => setSenhaEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EsqueciSenhaForm;
