import React, { useState } from 'react';

function Paginacao({ projetosPaginas, totalProjects, paginate }) {

    // constante para definir a paginação
    const [currentPage, setCurrentPage] = useState(1);

    const numerosPaginas = [];

    for (let i = 1; i <= Math.ceil(totalProjects / projetosPaginas); i++) {
        numerosPaginas.push(i);
    }

    const handlePaginate = (number) => {
        setCurrentPage(number);
        paginate(number);
    }

    return (
        <nav>
            <div className="flex items-center justify-center cursor-pointer">
                <ul className='flex gap-2'>
                    <li>
                        <a
                            
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                    {numerosPaginas.map(number => (
                        <li className={`block h-8 w-8 text-center rounded border ${currentPage === number ? 'bg-blue-900 text-white' : 'border-blue-600 bg-blue-600 text-white'}`} key={number}>
                            <a onClick={() => handlePaginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Paginacao;
