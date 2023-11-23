import React, { useState, useEffect } from 'react';
import { PiTrashSimple } from 'react-icons/pi';
import BarraDePesquisaUsuarios from './BarraDePesquisaUsuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrarUsuarios, setfiltrarUsuarios] = useState([]);
  const [mostrarMensagem, setMostrarMensagem] = useState(false)

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await fetch('http://localhost:8080/usuario/listar/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao obter a lista de Usuários');
        }

        const data = await response.json();
        setUsuarios(data);
        setfiltrarUsuarios(data); // Inicialmente, os usuários filtrados são os mesmos que todos os usuários.
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsuarios();
  }, []);

  // Função para lidar com a pesquisa e filtrar usuários.
  const handleSearch = ({ buscaUsuario, tipoUsuario }) => {
    const lowerCasedBuscaUsuario = buscaUsuario.toLowerCase();
    const filtrar = usuarios.filter((usuario) => {
      const lowerCasedNome = usuario.nome.toLowerCase();
      const matchNome = lowerCasedNome.includes(lowerCasedBuscaUsuario);
      const matchTipoUsuario = tipoUsuario === 'Selecione' || usuario.usuarioRole === tipoUsuario;

      return matchNome && matchTipoUsuario;
    });

    setfiltrarUsuarios(filtrar);
  };

  const handleDeleteUsuario = async (usuarioMatricula) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }

      const response = await fetch(`http://localhost:8080/usuario/deletar/${usuarioMatricula}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.text();
        console.log('deletado com sucesso', data)
        setMostrarMensagem(true)
        setTimeout(() => {
          setMostrarMensagem(false)
          window.location.reload()
        }, 2000)

        // const updatedMensagens = mensagens.filter(mensagem => mensagem.id !== mensagemId);
        // setMensagens(updatedMensagens);
        // setMensagensFiltradas(updatedMensagens);
        // setMostrarMensagemDeletada(true)

        // setTimeout(() => {
        //   setMostrarMensagemDeletada(false)
        // }, 3000)
      } else {
        console.error('Erro ao deletar o usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar o usuario:', error);
    }
  };


  return (
    <div>
      <BarraDePesquisaUsuarios onSearch={handleSearch} />
      {mostrarMensagem && (
        <span className="block text-center bg-red-100 border border-red-400 text-red-700 font-bold text-base rounded mt-2">
          Usuário Deletado com Sucesso
        </span>
      )}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className='bg-gray-400'>
              <th className="py-2 px-4 border border-gray-300">Nome</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Função</th>
              <th className="py-2 px-4 border border-gray-300">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filtrarUsuarios.map((usuario) => (
              <tr className="hover:bg-gray-100 cursor-pointer text-center" key={usuario.id}>
                <td className="py-2 px-4 border border-gray-300">{usuario.nome}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.email}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.usuarioRole}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button className="bg-slate-400 text-white py-1 px-2 rounded"
                    onClick={() => handleDeleteUsuario(usuario.matricula)}
                  >
                    <PiTrashSimple />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
Usuarios.auth = true;
