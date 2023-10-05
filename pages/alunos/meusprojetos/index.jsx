
import BarraDePesquisa from "@/components/elementos/BarraDePesquisa";
import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react';


export default function MeusProjetos() {

    const {data: session} = useSession()

    if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
         window.location.href = '/naoautenticado';
      };

    return (

        <Layout>
            <div>
                <BarraDePesquisa />
                Projetos que estou participando
            </div>
        </Layout>
    )
}
MeusProjetos.auth = true