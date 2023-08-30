import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../styles/login.module.css";


export default function Home() {
  const { session, status } = useSession();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // serve para preecher o formulario do email e senha

  async function handleSignIn(e) {
    e.preventDefault()
    signIn('credentials', { email, senha, callbackUrl: '/home' })
    // a função serve para validar o email e redireciona para a pagina logado

    const response = await fetch('http://localhost:8080/listar/users', {
      method: "Get",
      headers: {
        authorization: `bearer ${session?.user.accessToken}`,
      },
    });
    // constante responsavel por pegar do banco de dados as informações dos usuarios ja cadastrados (GET). o 'bearer' é para acesso com o JWT
  };

  return (
    <div>
      <div className={styles.page} onSubmit={handleSignIn}>
        <form className={styles.formLogin}>
          <img className={styles.logo} src="imagens/logo.png" alt="logo" />
          <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button type="submit" className={styles.btn}>
            LOGIN
          </button>
        </form>
        <h1>Status: {status}</h1>
        <button onClick={signOut}>sair</button>
      </div>

    </div>

  )
}


