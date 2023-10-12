import ListarUsuarios from '@/components/usuarios/ListarUsuarios'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Layout from '@/components/alunos/LayoutAluno';

export default function Usuarios() {

  const {data: session} = useSession()

  const [usuarios, setUsuarios] = useState([]);

    const token = JSON.parse(localStorage.getItem('token'))// pegando o token do localStorage

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const response = await fetch('http://localhost:8080/listar/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter a lista de Usuaríos');
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsuarios();
    }, []);


  return (

    <div>
      <Layout>
        <ListarUsuarios/>
      {/* <h1>Lista de Usuários</h1>
      
        {usuarios.map((usuario) => (
          <p key={usuario.id}>Nome do Usuario: {usuario.nome}, Email do Usuario: {usuario.email}, Role: {usuario.usuarioRole}</p>
        ))}
          <li>{session.user.role}</li> */}
          </Layout>
    </div>
  )
}
Usuarios.auth = true