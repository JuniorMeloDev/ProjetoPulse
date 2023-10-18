
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { RxExit } from 'react-icons/rx'
import { VscNotebook } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import { HiOutlineUser } from 'react-icons/hi'

export default function Sidebar() {

	const [imagemUsuario, setimagemUsuario] = useState('');
	const { data: session } = useSession()
	const router = useRouter();


	// função para mostrar a foto do usuario
	useEffect(() => {
		async function carregarImagem() {
			try {
				const token = JSON.parse(localStorage.getItem('token'));
				const response = await fetch('http://localhost:8080/usuario/dados', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.blob();
					const url = URL.createObjectURL(data);
					setimagemUsuario(url);
				} else {
					console.error('Erro ao buscar os dados do usuário:(else)', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao buscar os dados do usuário:(catch)', error);
			}
		}

		carregarImagem();
	}, []);

	const handleSignOut = async () => {
		await signOut(); // Faz o logout
		localStorage.removeItem('token'); // Remove o token do Local Storage
	};


	return (
		<div>
			 <div className="h-full p-3 space-y-2 w-full md:w-60 dark:bg-gray-900 dark:text-gray-100">
    <div className="flex flex-col items-center md:items-start">
					<div className='h-20 flex items-center px-8'>
						<Link href='/professor/home' className='flex-none'>
							<img src="../../imagens/Logo.png" width={100} className="mt-9 rounded-full" />
						</Link>
					</div>
				</div>

				<div className="pt-7 pb-8 divide-y divide-gray-700">
					<ul className="pt-2 pb-4 space-y-1 text-sm">
						<li>
							<Link href="/professor/meusprojetos" className={`flex items-center p-2 space-x-3 rounded-md transition-all duration-300 hover:bg-slate-400 ${router.asPath === '/professor/meusprojetos' ? 'bg-slate-400' : ''}`}>
								<VscNotebook className='w-5 h-5' />
								<span>Meus projetos</span>
							</Link>
						</li>
						<li>
							<Link href="/professor/notificacoes" className={`flex items-center p-2 space-x-3 rounded-md transition-all duration-300 hover:bg-slate-400 ${router.asPath === '/professor/notificacoes' ? 'bg-slate-400' : ''}`}>
								<IoIosNotificationsOutline className='w-5 h-5' />
								<span>Notificações</span>
							</Link>
						</li>
					</ul>
					<ul className="pt-4 pb-2 space-y-1 text-sm">
						<li>
							<Link href="/professor/configuracoes" className={`flex items-center p-2 space-x-3 rounded-md transition-all duration-300 hover:bg-slate-400 ${router.asPath === '/professor/configuracoes' ? 'bg-slate-400' : ''}`}>
								<AiOutlineSetting className='w-5 h-5' />
								<span>Configurações</span>
							</Link>
						</li>
						<li>
							<Link href="/professor/ajuda" className={`flex items-center p-2 space-x-3 rounded-md transition-all duration-300 hover:bg-slate-400 ${router.asPath === '/professor/ajuda' ? 'bg-slate-400' : ''}`}>
								<BiHelpCircle className='w-5 h-5' />
								<span>Ajuda</span>
							</Link>
						</li>
						<li>
							<button onClick={handleSignOut} className="flex items-center p-2 space-x-3 rounded-md transition-all duration-300 hover:bg-slate-400">
								<RxExit className='w-5 h-5' />
								<span>Sair</span>
							</button>
						</li>
					</ul>
				</div>
				<div className="flex items-center pt-14">
					{imagemUsuario && (
						<img src={imagemUsuario} className='w-16 rounded-full' alt="Imagem do usuário" />
					)}

					{!imagemUsuario && (
						<div className="w-16 h-16 rounded-full border-1 bg-gray-600 flex items-center justify-center">
							<HiOutlineUser className="w-10 h-10 text-white" />
						</div>
					)}
					<div className='ml-4'>
						<p>{session.user.nome}</p>
					</div>
				</div>
			</div>
		</div >
	)
}
