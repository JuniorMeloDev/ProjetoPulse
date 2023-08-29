import Link from "next/link";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";


export default function Home() {
  const { data, status } = useSession();

  return (
    <main>
      <div className="flex flex-col justify-center items-center pt-48 text-2xl">
        <h1>Next Auth Tutorial</h1>
        <br />
        <Link href="/api/auth/signin">Entrar com email</Link>
        <h3 className="text-3xl pt-10">Status: {status}</h3>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="flex flex-col justify-center items-center pt-12 text-2xl">
      {!data && <SignInForm/>}
      </div>
    </main>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e) {
    e.preventDefault()
    signIn('credentials', {email, password, callbackUrl:'/teste' })
  }

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br/>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button className="bg-slate-400" type="submit">LOGIN</button>
      <p>{email}</p>
    </form>
    
  );
}
