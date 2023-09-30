
import BarraDePesquisa from "@/components/elementos/BarraDePesquisa";
import Layout from '@/components/alunos/Layout'


export default function MeusProjetos() {
    return (

        <Layout>
            <div>
                <BarraDePesquisa/>
                Projetos que estou participando
            </div>
        </Layout>
    )
}
MeusProjetos.auth = true