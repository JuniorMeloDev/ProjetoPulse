import Layout from '@/components/alunos/LayoutAluno'
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import ProjetosCandidatados from "@/components/alunos/ProjetosCandidatados";


export default function MeusProjetos() {

    const { data: session } = useSession()

    if (!session || !session.user || !session.user.role.includes('ROLE_ALUNO')) {
        window.location.href = '/naoautenticado';
    };

    return (

        <Layout>
            <Head>
                <title>Meus Projetos</title>
                <meta name='description' content='Tela de meus projetos' />
                <link rel='icon' href='/LogoIco.ico' />
            </Head>
            <ProjetosCandidatados />
        </Layout>
    )
}
MeusProjetos.auth = true