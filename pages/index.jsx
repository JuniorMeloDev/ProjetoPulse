import Link from "next/link";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../styles/login.module.css";


export default function Home() {
  const { data, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // serve para preecher o formulario do email e senha


  function handleSignIn(e) {
    e.preventDefault()
    signIn('credentials', { email, password, callbackUrl: '/teste' })
    // a função serve para validar o email e redireciona para a pagina logado
  }

  return (
    <div>
      <div className={styles.page} onSubmit={handleSignIn}>
        <form className={styles.formLogin}>
          <img className={styles.logo} src="imagens/logo.png" alt="logo" />
          <input
            type="text"
            placeholder="Digite seu Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.btn}>
            LOGIN
          </button>
        </form>
        <h1>Satus: {status}</h1>
        <Link href="/api/auth/signin">Vá para a pagina de login</Link>
      </div>
    </div>

  )
}

