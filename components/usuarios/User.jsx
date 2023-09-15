// Importe o hook useSession do NextAuth
import { useSession } from "next-auth/react";

// ...

export default function User() {
  // Use o hook useSession para acessar a sessão
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <p>{session.user.token}</p>,
        <p>{session.user.email}</p>
      ) : (
        <p>Por favor, faça o login.</p>
      )}
    </div>
  );
}