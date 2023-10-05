'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../../../styles/login.module.css";
import { FiLock } from "react-icons/fi"
import { AiOutlineMail } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import EsqueciSenhaForm from "@/components/elementos/EsqueciSenha";



export default function Login() {
  const {data: session, status } = useSession();
  const router = useRouter()


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // serve para preecher o formulario do email e senha
  const [error, setError] = useState()


  async function handleSignIn(e) {
    e.preventDefault();
  
    try {
      const result = await signIn('credentials', {
      redirect: false, // não é redirecioando para outra pagina. mostra o erro na propria tela do login
      email,
      senha,
    });
    if (!session || session.user.role !== "ROLE_PROFESSOR") {
      // Se o usuário não estiver autenticado ou não tiver a role de professor,
      // redirecione-o para outra página ou exiba uma mensagem de acesso negado.
      router.push('/notfound');
      return null; // Ou exiba uma mensagem de acesso negado aqui
    }
   
    if (!result?.error) {
      const role = session.user.role; // Verifica a role do usuário

      if (role === 'ROLE_PROFESSOR') {
        router.push('/professor/home');
      } else {
        setError('Você não tem permissão para acessar esta página.');
      }
    } else {
      setError('Email ou senha inválidos')
    }
  } catch (error) {
    console.log('[LOGIN_ERROR]: ', error)
  }
}

  return (
    <div>
      <div className={styles.page} onSubmit={handleSignIn}>
        <form className={styles.formLogin}>
          <img className={styles.logo} src="../imagens/logo.png" alt="logo" />
          <div className="flex mr-3">
            <AiOutlineMail className={styles.icons} />
            <input
              type="email"
              placeholder="Digite seu Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex mr-3">
            <FiLock className={styles.icons} />
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </div>
            {error && <span className="text-red-400 text-lg text-center block mt-2">{error}</span>} 
          <div className="flex items-center justify-center">
            <button type="submit" className={styles.btn}>
              LOGIN
            </button>
          </div>
        </form>
        <h1>Status:{status} </h1>
        <button onClick={signOut}>sair</button>
        {/* <EsqueciSenhaForm/> */}
      </div>

    </div>

  )
}


