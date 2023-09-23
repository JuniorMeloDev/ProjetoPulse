import React from 'react'
import BarraDePesquisa from '../elementos/BarraDePesquisa'
import Paginacao from '../elementos/Paginacao'

export default function ProjetosProf() {
    return (
        <div>
            <BarraDePesquisa />
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none pt-8">
                <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                    <div className="p-4">
                        <span className="text-blue-600 font-normal text-base">News</span>
                        <p className="font-semibold text-xl py-2">Desenvolver um app em NextJs</p>
                        <p className="font-light text-gray-700 text-justify line-clamp-3">Projeto com base no Framework NextJs com chamada API com Spring Boot. Iremos usar o Tailwind CSS</p>
                        <div className="flex flex-wrap mt-10 space-x-4 align-bottom">
                            <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU" />
                            <div className="flex flex-col space-y-0">
                                <p className="font-semibold text-base">@djpfs (Github)</p>
                                <p className="font-light text-sm">20 de Dezembro de 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                    <div className="p-4">
                        <span className="text-blue-600 font-normal text-base">News</span>
                        <p className="font-semibold text-xl py-2">Desenvolver um CRUD em Spring Boot</p>
                        <p className="font-light text-gray-700 text-justify line-clamp-3">The longest word in any of the major English language dictionaries, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.</p>
                        <div className="flex flex-wrap mt-10 space-x-4 align-bottom">
                            <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU" />
                            <div className="flex flex-col space-y-0">
                                <p className="font-semibold text-base">@djpfs (Github)</p>
                                <p className="font-light text-sm">20 de Dezembro de 2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                    <div className="p-4">
                        <span className="text-blue-600 font-normal text-base">News</span>
                        <p className="font-semibold text-xl py-2">Criação de um BD Relacional</p>
                        <p className="font-light text-gray-700 text-justify line-clamp-3">The longest word in any of the major English language dictionaries, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.</p>
                        <div className="flex flex-wrap mt-10 space-x-4 align-bottom">
                            <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU" />
                            <div className="flex flex-col space-y-0">
                                <p className="font-semibold text-base">@djpfs (Github)</p>
                                <p className="font-light text-sm">20 de Dezembro de 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                    <div class="p-4">
                        <span class="text-blue-600 font-normal text-base">News</span>
                        <p class="font-semibold text-xl py-2">Pesquisas em IA</p>
                        <p class="font-light text-gray-700 text-justify line-clamp-3">The longest word in any of the major English language dictionaries, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.</p>
                        <div class="flex flex-wrap mt-10 space-x-4 align-bottom">
                            <img class="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU" />
                            <div class="flex flex-col space-y-0">
                                <p class="font-semibold text-base">@djpfs (Github)</p>
                                <p class="font-light text-sm">20 de Dezembro de 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-32'>
                    <Paginacao />
                </div>
        </div>
    )
}
