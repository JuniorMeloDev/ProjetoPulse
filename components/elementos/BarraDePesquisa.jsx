import React from 'react'

export default function BarraDePesquisa() {
    return (

        <div className="bg-gray-100 flex justify-center items-center">
            <div className="container mx-auto bg-zinc-400 rounded-lg p-2">
                <form>
                    <h1 className="text-center font-bold text-white text-4xl">Meus projetos</h1>
                    <p className="mx-auto font-normal text-sm my-2 max-w-lg text-center">Pesquise seus projetos cadastrados pelas áreas correspondentes </p>
                    <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                        <input className="text-base text-gray-400 flex-grow outline-none px-2 " type="text" placeholder="Digite o nome do projeto" />
                        <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                            <select id="Com" className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg">
                                <option value="todos" selected>todos</option>
                                <option value="">Front End</option>
                                <option value="org">Back End</option>
                                <option value="io">Banco de Dados</option>
                            </select>
                            <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">Pesquisar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
