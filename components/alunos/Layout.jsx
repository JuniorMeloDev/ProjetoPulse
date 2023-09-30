import React from "react";
import Sidebar from "./SidebarAluno";


const Layout = ({ children }) => {
    return (
        <div className="bg-gray-300 h-screen flex flex-row justify-start">
            <Sidebar />
            <div className="bg-white flex-1 p-4 text-black">
                {children}
            </div>
        </div>
    );
};

export default Layout;

// esse componente será redenrizado em todas paginas. entao o conteudo da pagina precisa ser em envolvido na tag <Layout>. A primeira div é o sidebar e a segunda div é o conteudo 'children'. A aplicação é envolvida completamente pelo display 'flex' e o conteudo é fica como 'flex 1', o que faz como que parte da tela tenha a sidebar e o restante o conteudo. 