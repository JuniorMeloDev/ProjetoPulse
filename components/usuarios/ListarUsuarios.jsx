import Layout from '@/components/Layout'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Home() {

  const {session} = useSession()

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
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nome}, {usuario.email}, {usuario.role}</li>
         
        ))}
      </ul>
      </Layout>
    </div>
  )
}