import Link from 'next/link';
import { useState } from 'react';

const NavbarLogin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="border-gray-200 bg-white bg-opacity-90 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link legacyBehavior href="/">
            <a className="flex items-center">
              <img src="./imagens/logo.png" className="h-14 mr-4 rounded-full" alt="Logo" />
            </a>
          </Link>
          
          <div className="md:hidden ml-auto">
            <button onClick={toggleMenu} className="text-gray-900 dark:text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          <div className={`md:flex md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col font-medium mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link legacyBehavior href="/">
                  <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-300">Voltar ao Site</a>
                </Link>
              </li>
              {/* Adicione mais itens de menu aqui */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
