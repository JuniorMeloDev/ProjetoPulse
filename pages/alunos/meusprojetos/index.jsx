import Layout from '@/components/alunos/LayoutAluno'
import { useSession } from 'next-auth/react';
import ProjetosCandidatados from "@/components/alunos/ProjetosCandidatados";


export default function MeusProjetos() {

    const {data: session} = useSession()

    if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
         window.location.href = '/naoautenticado';
      };

    return (

        <Layout>
            <div>
                <ProjetosCandidatados/>
            </div>
        </Layout>
    )
}
MeusProjetos.auth = true