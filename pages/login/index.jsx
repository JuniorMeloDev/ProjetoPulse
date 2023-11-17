'use client'
import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useState } from "react";
import styles from '@/styles/login.module.css'
import { FiLock } from "react-icons/fi"
import { AiOutlineMail } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import NavbarLogin from "@/components/elementos/NavBarLogin";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState()

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        senha,
      });

      if (!result?.error) {
        const session = await getSession(); // Obtemos a sessão atualizada após o login

        if (session && session.user) {
          const role = session.user.role;

          if (role === 'ROLE_PROFESSOR') {
            router.push('/professor/meusprojetos');
            return;
          } else if (role === 'ROLE_ALUNO') {
            router.push('/alunos/inicio');
            return;
          }
          else if (role === 'ROLE_ADMIN') {
            router.push('/admin/usuarios');
            return;
          }
        }
      }

      setError('Email ou senha inválidos');
    } catch (error) {
      console.log('[Erro no login: ', error);
    }
  }

  return (
   
    <div className={styles.container}>
       <Head>
          <title>Login</title>
          <meta name='description' content='Tela de login' />
          <link rel='icon' href='/LogoIco.ico' />
        </Head>
      <div className={styles.background}>
        <NavbarLogin/>
      <div className={styles.page} onSubmit={handleSignIn}>
        <form className={styles.formLogin}>
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
              Login
            </button>
          </div>
          <Link href="/esqueceuSuaSenha" className="text-center">Esqueceu sua senha</Link>
        </form>
        <h1>Status:{status} </h1>
        <button onClick={signOut}>sair</button>
      </div>
      </div>
    </div>

  )
}


