
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { RxExit } from 'react-icons/rx'
import { VscNotebook } from 'react-icons/vsc'


export default function Sidebar() {

	const [userData, setUserData] = useState(null);
	const [imagemURL, setImagemURL] = useState('');

	const MostrarNomeUsuario = async (e) => {

		try {
			const token = JSON.parse(localStorage.getItem('token'));

			if (token) {
				const response = await fetch('http://localhost:8080/usuario/nome', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				})

				const data = await response.text();
				setUserData(data);
			}
		} catch (error) {
			console.error('Erro ao enviar os dados:', error);
		}
	};
	useEffect(() => {
		MostrarNomeUsuario();
	}, []); // O array vazio [] significa que este efeito será executado uma vez após a montagem

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
					setImagemURL(url);
				} else {
					console.error('Erro ao buscar os dados do usuário:', response.statusText);
				}
			} catch (error) {
				console.error('Erro ao buscar os dados do usuário:', error);
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
			<div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
				<div class="flex flex-col">
					<div className='h-20 flex items-center px-8'>
						<Link href='/professor/home' className='flex-none'>
							<img src="../../imagens/Logo.png" width={100} className="mt-9 rounded-full" />
						</Link>
					</div>
				</div>

				<div className="pt-7 pb-23 divide-y divide-gray-700">
					<ul className="pt-2 pb-4 space-y-1 text-sm">
						<li className="dark:bg-gray-800 dark:text-gray-50">
							<Link href="/professor/home" className="flex items-center p-2 space-x-3 rounded-md">
								<AiOutlineHome className='w-5 h-5' />
								<span>Início</span>
							</Link>
						</li>
						<li>
							<Link href="/professor/notificacoes" className="flex items-center p-2 space-x-3 rounded-md">
								<IoIosNotificationsOutline className='w-5 h-5' />
								<span>Notificações</span>
							</Link>
						</li>
						<li>
							<Link href="/professor/meusprojetos" className="flex items-center p-2 space-x-3 rounded-md">
								<VscNotebook className='w-5 h-5' />
								<span>Meus projetos</span>
							</Link>
						</li>
					</ul>
					<ul className="pt-4 pb-2 space-y-1 text-sm">
						<li>
							<Link href="/professor/configuracoes" className="flex items-center p-2 space-x-3 rounded-md">
								<AiOutlineSetting className='w-5 h-5' />
								<span>Configurações</span>
							</Link>
						</li>
						<li>
							<Link href="/professor/ajuda" className="flex items-center p-2 space-x-3 rounded-md">
								<BiHelpCircle className='w-5 h-5' />
								<span>Ajuda</span>
							</Link>
						</li>
						<li>
							<button onClick={handleSignOut} className="flex items-center p-2 space-x-3 rounded-md">
								<RxExit className='w-5 h-5' />
								<span>Sair</span>
							</button>
					</li>
				</ul>
			</div>
			<div className="flex items-center pt-14">
				{imagemURL && <img src={imagemURL} className='w-16 rounded-full' alt="Imagem do usuário" />}
				{userData && (
					<div className='ml-4'>
						<p>{userData}</p>
					</div>
				)}
			</div>
		</div>
		</div >
	)
}
