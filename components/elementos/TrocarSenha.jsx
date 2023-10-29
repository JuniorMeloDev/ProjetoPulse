import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/login.module.css'
import NavbarLogin from "@/components/elementos/NavBarLogin";
import { FiLock } from "react-icons/fi"

export default function TrocarSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const router = useRouter();

    const handleTrocarSenha = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await fetch('http://localhost:8080/auth/trocar/senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ senha: novaSenha }),
            });

            if (response.ok) {
                alert('Senha alterada com sucesso!');
                router.push('/login'); // Redirecionar para a página de login
            } else {
                alert('Erro ao alterar senha. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao trocar a senha:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <NavbarLogin />
                <div className={styles.page}>
                    <form className={styles.formLogin} onSubmit={handleTrocarSenha}>
                        <div className="flex flex-col mr-3">
                            <FiLock className={styles.icons} />
                            <input
                                type="password"
                                placeholder="Nova Senha"
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                            />
                             <FiLock className={styles.icons} />
                            <input
                                type="password"
                                placeholder="Confirmar Senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.btn}>
                            Trocar Senha
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

