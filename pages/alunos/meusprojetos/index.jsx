
import Layout from "../../../components/Layout";
import ProjetosProf from "@/components/professores/Projetos";

export default function MeusProjetos() {
    return (
        
        <Layout>
        <div>
            <ProjetosProf/>
        </div>
        </Layout>
    )
}
MeusProjetos.auth = true