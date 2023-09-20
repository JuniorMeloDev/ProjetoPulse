'use client'

import React, { useState } from 'react'
import { useSession } from "next-auth/react"; 
import styles from '../../styles/login.module.css'

export default function Cadastro() {

    // const { data: session } = useSession();

    // const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 

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
            console.log('Enviando requisição para o servidor...');
            console.log('Token:', token); // Verifica se o token está correto
            console.log('Projeto a ser enviado:', projeto); // Verifica se os dados do projeto estão corretos

            const response = await fetch('http://localhost:8080/auth/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            })

            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div className={styles.page} onSubmit={handleSubmit}>
          <form className={styles.formLogin}>
            <img className={styles.logo} src="../imagens/logo.png" alt="logo" />
            <div className="flex mr-3">
              <input
                type="text"
                name='nome'
                placeholder="Digite seu nome"
                value={usuario.nome}
                onChange={handleChange}
              />
            </div>
            <div className="flex mr-3">
              <input
                type="email"
                name='email'
                placeholder="Digite seu Email"
                value={usuario.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex mr-3">
              <input
                type="password"
                name='senha'
                placeholder="Digite sua Senha"
                value={usuario.senha}
                onChange={handleChange}
              />
            </div>
            <div className="flex mr-3">
              <input
                type="text"
                name='role'
                placeholder="Digite o Role"
                value={usuario.role}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className={styles.btn}>
                Salvar
              </button>
            </div>
          </form>
        </div>
    )
}
