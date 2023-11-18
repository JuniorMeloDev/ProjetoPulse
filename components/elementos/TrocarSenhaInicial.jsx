import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Styles from '@/styles/login.module.css'
import NavbarLogin from "@/components/elementos/NavBarLogin";
import { FiLock } from "react-icons/fi"
import { useSession } from 'next-auth/react';

export default function TrocarSenhaInicial() {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState(false)
    const router = useRouter();
    const { data: session } = useSession();

    const handleTrocarSenhaInicial = async (e) => {
        e.preventDefault();

        const token = JSON.stringify(session.user.token)// constante que usa o token da sessão 
        localStorage.setItem('token', token)


        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await fetch('http://localhost:8080/auth/trocar/senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ senha: novaSenha }),
            });

            if (response.ok) {
                setMostrarMensagem(true)

                setTimeout(() => {
                    if (session && session.user) {
                        const role = session.user.role;

                        if (role === 'ROLE_PROFESSOR') {
                            router.push('/professor/meusprojetos');
                        } else if (role === 'ROLE_ALUNO') {
                            router.push('/alunos/inicio');
                        } else if (role === 'ROLE_ADMIN') {
                            router.push('/admin/usuarios');
                        }
                    }
                }, 1500);

            } else {
                alert('Erro ao alterar senha. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao trocar a senha:', error);
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <NavbarLogin />
                <div className={Styles.page}>
                    <form className={Styles.formLogin} onSubmit={handleTrocarSenhaInicial}>
                        <div className='flex '>
                            <FiLock className={Styles.icons} />
                            <input
                                type="password"
                                placeholder="Nova Senha"
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                            />
                        </div>
                        <div className='flex '>
                            <FiLock className={Styles.icons} />

                            <input
                                type="password"
                                placeholder="Confirmar Senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={Styles.btn}>
                            Trocar Senha
                        </button>
                        {mostrarMensagem && (
                            <span className="block text-center bg-green-100 border border-green-400 text-green-700 font-bold px-4 py-2 rounded mt-2 text-base">
                                Senha alterada com sucesso
                            </span>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

