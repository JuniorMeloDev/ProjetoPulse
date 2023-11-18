import React, { useState } from 'react'
import styles from '../../../styles/login.module.css'

export default function CadastroUsuario() {

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
            console.log('Enviando requisição para o servidor...');
            console.log('Token:', token); // Verifica se o token está correto
            console.log('Usuario a ser enviado:', usuario); // Verifica se os dados do projeto estão corretos

            const response = await fetch('http://localhost:8080/auth/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(usuario),
            })

            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);
            alert('Cadastro Efetuado com Sucesso!')

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div className={styles.page} >
          <form className={styles.formLogin} onSubmit={handleSubmit}>
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

CadastroUsuario.auth = true