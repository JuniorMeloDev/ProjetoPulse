import Layout from '@/components/professores/LayoutProfessor'
import BarraDePesquisa from '@/components/elementos/BarraDePesquisa'
import ProjetosCandidatados from '@/components/professores/ProjetosCandidatados'
import { useSession} from 'next-auth/react'


export default function Home() {


  const { data: session } = useSession()
  const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
  localStorage.setItem('token', token)// seta o token e coloca no local Storage

  if (!session || !session.user || !session.user.role.includes('ROLE_PROFESSOR')) {
    window.location.href = '/naoautenticado'; // condicional para verificar se o usuario é professor
  };

  return (

    <div>
      <Layout>
      <ProjetosCandidatados/>
      </Layout>
    </div>
  )
}
Home.auth = true