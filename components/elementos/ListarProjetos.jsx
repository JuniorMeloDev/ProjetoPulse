import React from 'react'
import { format } from 'date-fns';

export default function ListarProjetos({projeto}) {
    return (  
        <div>
        <div>
            <div className="cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                <div >
                    <span className="text-blue-600 font-normal text-base">{projeto.titulo}</span>
                    <p className="font-semibold text-xl">Descrição: {projeto.descricao}</p>
                    <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Requisitos:</strong> {projeto.requesito}</p>
                    <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Vagas disponíveis:</strong> {projeto.vagas}</p>
                    <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Data Inicial:</strong> {format(new Date(projeto.dataInicial), 'dd/MM/yyyy')}</p>
                    <p className="font-light text-gray-700 text-justify line-clamp-3"><strong className='text-zinc-950'>Data Final:</strong> {format(new Date(projeto.dataFinal), 'dd/MM/yyyy')}</p>
                    <div className="flex flex-wrap mt-10 space-x-4 align-bottom">
                        <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU" />
                        <div className="flex flex-col space-y-0">
                            <p className="font-semibold text-base">@djpfs (Github)</p>
                            <p className="font-light text-sm">20 de Dezembro de 2021</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div >
    )
}