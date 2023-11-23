import React, { useState } from 'react'
import Styles from '@/styles/login.module.css'
import NavbarLogin from './NavBarLogin';
import { AiOutlineMail } from "react-icons/ai"

export default function RecuperarSenhaEmail() {

    const [email, setEmail] = useState()
    const [mostrarMensagem, setMostrarMensagem] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/recuperar/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.text();
                console.log('E-mail de recuperação enviado com sucesso:', data);
                setMostrarMensagem(true)
            } else {
                console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
                alert('Erro ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail de recuperação:', error);
            alert('Erro ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.background}>
                <NavbarLogin />
                <div className={Styles.page}>
                    <form className={Styles.formLogin} onSubmit={handleSubmit}>
                        <div className='flex '>
                            <AiOutlineMail className={Styles.icons} />
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={Styles.btn}>
                            Enviar
                        </button>
                        {mostrarMensagem && (
                            <span className="block text-center bg-green-100 border border-green-400 text-green-700 font-bold text-base px-4 py-2 rounded mt-2">
                                Email de recuperação<br />enviado com sucesso!
                            </span>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}