import { useSession } from 'next-auth/react';

function Sessão() {
  const { data: session } = useSession();
  console.log('Sessão:', session);

  if (session) {
    return <p>Role do Usuário: {session.user.role}, Token: {session.user.token}</p>;
  }

  return <p>Usuário não autenticado</p>;
}

export default Sessão;