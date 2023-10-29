import { useState } from 'react';
import Styles from '@/styles/login.module.css'
import NavbarLogin from "@/components/elementos/NavBarLogin";
import { FiLock } from "react-icons/fi"

import { useRouter } from 'next/router';

export default function TrocarSenhaEmail() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const router = useRouter();
  const { token } = router.query;
  const [mostrarMensagem, setMostrarMensagem] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem('senhaToken', token);
      const response = await fetch(`http://localhost:8080/auth/trocar/senha/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          senha: novaSenha,
        }),
      });

      if (response.ok) {
        setMostrarMensagem(true)
        setTimeout(() => {
            router.push('/login')
        }, 2000);
       
      } else {
        console.error('Erro ao trocar a senha:', response.statusText);
        alert('Erro ao trocar a senha. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao trocar a senha:', error);
      alert('Erro ao trocar a senha. Por favor, tente novamente.');
    }
  };

  return (
    <div className={Styles.container}>
        <div className={Styles.background}>
            <NavbarLogin />
            <div className={Styles.page}>
                <form className={Styles.formLogin} onSubmit={handleSubmit}>
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
                            <span className="block text-center bg-green-100 border border-green-400 text-black font-bold px-4 py-2 rounded mt-2 text-xl">
                                Senha alterada com sucesso
                            </span>
                        )}
                </form>
            </div>
        </div>
    </div>
);
}



