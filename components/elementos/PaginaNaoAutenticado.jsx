import Link from 'next/link';
import React from 'react';
import { FaLock } from 'react-icons/fa';

const PaginaNaoAutenticada = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="message text-black font-poppins">
          Você não está autorizado.
        </div>
        <div className="message2 text-black font-poppins">
          Volte para a tela inicial e tente fazer o login para navegar nessa página.
        </div>
        <div className="neon text-red-500 text-center font-varela text-90 text-4xl w-300 mb-10">
          403
        </div>
        <div className="door-frame h-495 w-295 bg-gray-400 rounded-b-90 flex justify-center items-center relative">  
          <div className="lock-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaLock className="text-white text-4xl" />
          </div>
          <div className="door h-450 w-250 bg-gray-100 rounded-b-70 relative">
            <div className="rectangle h-70 w-25 bg-blue-300 rounded absolute mt-220 ml-20"></div>
            <div className="handle h-8 w-50 bg-blue-200 rounded absolute mt-250 ml-30"></div>
            <div className="window h-40 w-130 bg-gray-100 rounded-md mx-auto relative">
              <div className="eye top-15 left-25 h-5 w-15 rounded-full bg-white absolute"></div>
              <div className="eye eye2 left-65 top-15 h-5 w-15 rounded-full bg-white absolute"></div>
              <div className="leaf h-40 w-130 bg-gray-700 rounded-md mx-auto animate-leaf"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-7">
        <div className=" bg-slate-600 hover:bg-slate-900 text-white py-2 px-4 rounded inline-block w-auto text-center">
        <Link href='/'>Voltar a tela inicial</Link>
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default PaginaNaoAutenticada;
