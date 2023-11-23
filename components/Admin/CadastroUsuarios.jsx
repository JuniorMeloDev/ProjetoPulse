import React, { useState } from 'react'

export default function CadastroUsuarios({ isOpen, onClose }) {

  if (!isOpen) return null;

  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mostrarMensagemErro, setMostrarMensagemErro] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const response = await fetch('http://localhost:8080/auth/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      })

      if (response.ok) {
        const data = await response.text();
        console.log('Dados enviados com sucesso:', data);
        setMostrarMensagem(true);
        setTimeout(() => {
          setMostrarMensagem(false);
          onClose();
          window.location.reload();
        }, 2000);
      } else if (response.status === 400) {
        const data = await response.text();
        console.error('Erro ao cadastrar usuário:', data.error);
        setTimeout(() => {
          setMostrarMensagemErro(true);
        }, 2000);
        setMostrarMensagemErro(false);
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="py-1 text-left px-6">
            <div className="flex justify-end items-center">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                Fechar
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nome do usuário:
                </label>
                <input
                  required
                  type="text"
                  name="nome"
                  value={usuario.nome}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Senha:
                </label>
                <input
                  required
                  type="password"
                  name="senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className=" text-gray-700 text-sm font-bold mb-2">Tipo do Usuário:</label>
                <select
                  required
                  name='role'
                  onChange={handleChange}
                  value={usuario.role}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Selecione um opção</option>
                  <option>ADMIN</option>
                  <option>ALUNO</option>
                  <option>PROFESSOR</option>
                </select>
              </div>
              <div className="flex items-center justify-end">
                {!mostrarMensagem && (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Salvar
                  </button>
                )}
              </div>
              {mostrarMensagem && (
                <span className="block text-center bg-red-100 border border-green-400 text-green-700 font-bold text-base rounded mt-2">
                  Usuário Cadastrado com Sucesso
                </span>
              )}
              {mostrarMensagemErro && (
                <span className="block text-center bg-red-100 border border-red-400 text-red-700 font-bold text-base rounded mt-2">
                  Email já cadastrado
                </span>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}




CadastroUsuarios.auth = true