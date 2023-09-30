import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="http://localhost:3000" className="flex items-center">
        <img src="./imagens/logo.png" className="h-10 mr-3 rounded-full" alt="Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Projeto Pulse</span>
    </a>
    <div className="hidden w-full md:block md:w-auto">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li>
        <Link legacyBehavior href="/alunos/login">
        <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Aluno</a>
          </Link>
        </li>
        <li>
        <Link legacyBehavior href="/professor/login">
          <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Professor</a>
          </Link>
        </li>
        <li>
        <Link legacyBehavior href="/alunos/login">
          <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin</a>
          </Link>
        </li>
        <li>
          <a href="/contatos" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contatos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;


