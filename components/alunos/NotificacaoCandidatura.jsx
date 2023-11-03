import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PiTrashSimple } from 'react-icons/pi'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import BarraDePesquisaNotificacao from '@/components/elementos/BarraDePesquisaNotificacao';

export default function NotificacaoCandidaturas({ projeto }) {
  const [mensagens, setMensagens] = useState([]);
  const [mensagensFiltradas, setMensagensFiltradas] = useState([]);
  const [paginaAtual, setpaginaAtual] = useState(1);
  const [mensagensPorPaginas, setmensagensPorPaginas] = useState(4);
  const [VisibildadePaginas, setVisibildadePaginas] = useState(5);
  const [paginaInicial, setpaginaInicial] = useState(1);
  const [mostrarMensagemDeletada, setMostrarMensagemDeletada] = useState(false);

  useEffect(() => {
    async function listarMensagens() {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
          throw new Error('Token não encontrado no localStorage');
        }

        const response = await fetch('http://localhost:8080/mensagem/listar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao obter a lista de mensagens');
        }

        const data = await response.json();
        setMensagens(data);
        setMensagensFiltradas(data);
      } catch (error) {
        console.error(error);
      }
    }

    listarMensagens();
  }, []);

  const handleSearch = ({ buscaMensagem, tipoPesquisa, dataInicial, dataFinal }) => {
    const mensagensFiltradas = mensagens.filter(mensagem => {
      if (tipoPesquisa === 'mensagem') {
        return (
          (mensagem.remetente && mensagem.remetente.toLowerCase().includes(buscaMensagem.toLowerCase())) ||
          (mensagem.mensagem && mensagem.mensagem.toLowerCase().includes(buscaMensagem.toLowerCase())) ||
          (mensagem.horarioEnvio && mensagem.horarioEnvio.toLowerCase().includes(buscaMensagem.toLowerCase()))
        );
      } else if (tipoPesquisa === 'remetente') {
        return mensagem.remetente.toLowerCase().includes(buscaMensagem.toLowerCase());
      } else if (tipoPesquisa === 'data') {
        const dataEnvio = new Date(mensagem.horarioEnvio);
        const dataInicialDate = new Date(dataInicial);
        let dataFinalDate = new Date(dataFinal);

        // Ajuste para o último segundo do dia
        dataFinalDate.setHours(23, 59, 59, 999);

        // Converter datas para o mesmo fuso horário
        dataEnvio.setUTCHours(0, 0, 0, 0);
        dataInicialDate.setUTCHours(0, 0, 0, 0);
        dataFinalDate.setUTCHours(0, 0, 0, 0);

        return dataEnvio >= dataInicialDate && dataEnvio <= dataFinalDate;
      }
    });
    setMensagensFiltradas(mensagensFiltradas);
    setpaginaAtual(1);
    setpaginaInicial(1);
  }

  const handleDeleteMensagem = async (mensagemId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }

      const response = await fetch(`http://localhost:8080/mensagem/deletar/${mensagemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const updatedMensagens = mensagens.filter(mensagem => mensagem.id !== mensagemId);
        setMensagens(updatedMensagens);
        setMensagensFiltradas(updatedMensagens);
        setMostrarMensagemDeletada(true)

        setTimeout(() => {
          setMostrarMensagemDeletada(false)
        }, 3000)
      } else {
        console.error('Erro ao deletar a mensagem:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar a mensagem:', error);
    }
  };

  const paginate = (paginaInicial) => {
    setpaginaAtual(paginaInicial);
    setpaginaInicial(paginaInicial);
  }

  const nextPage = () => {
    if (paginaInicial < Math.ceil(mensagensFiltradas.length / mensagensPorPaginas)) {
      setpaginaAtual(paginaInicial + 1);
      setpaginaInicial(paginaInicial + 1);
    }
  }

  const prevPage = () => {
    if (paginaInicial > 1) {
      setpaginaAtual(paginaInicial - 1);
      setpaginaInicial(paginaInicial - 1);
    }
  }

  const indexOfLastMessage = paginaAtual * mensagensPorPaginas;
  const indexOfFirstMessage = indexOfLastMessage - mensagensPorPaginas;
  const currentMessages = mensagensFiltradas.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginaInicials = [];
  for (let i = paginaInicial; i <= Math.min(paginaInicial + VisibildadePaginas - 1, Math.ceil(mensagensFiltradas.length / mensagensPorPaginas)); i++) {
    paginaInicials.push(i);
  }

  const highlightWord = (text, wordToHighlight) => {
    const regex = new RegExp(`\\b${wordToHighlight}\\b`, 'gi');
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  }; //constante para deixar negrito a mensagem pré-definida do back end

  return (
    <div>
      <BarraDePesquisaNotificacao onSearch={handleSearch} />
      {mostrarMensagemDeletada &&
        <span className="block text-center bg-red-100 border border-red-400 text-green-700 font-bold text-base rounded mt-2">Mensagem deletada com sucesso!</span>}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className='bg-gray-400'>
              <th className="py-2 px-4 border border-gray-300">Remetente</th>
              <th className="py-2 px-4 border border-gray-300">Mensagem</th>
              <th className="py-2 px-4 border border-gray-300">Data</th>
              <th className="py-2 px-4 border border-gray-300">Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map(mensagem => (
              <tr key={mensagem.id} className="hover:bg-gray-100 cursor-pointer text-center">
                <td className="py-2 px-4 border border-gray-300">{mensagem.remetente}</td>
                <td className="py-2 px-4 border border-gray-300 text-justify">
                  <div dangerouslySetInnerHTML={{ __html: highlightWord(mensagem.mensagem, 'suaPalavra') }} /> {/*validação do negrito no backEnd */}
                </td>
                <td className="py-2 px-4 border border-gray-300">{format(new Date(mensagem.horarioEnvio), 'dd/MM/yyyy HH:mm a')}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="bg-slate-400 text-white py-1 px-2 rounded"
                    onClick={() => handleDeleteMensagem(mensagem.id)}
                  >
                    <PiTrashSimple />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 justify-center items-center mt-2">
        <button
          onClick={prevPage}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          <FaAngleDoubleLeft className="text-xl" />
        </button>
        {paginaInicials.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-10 h-10 rounded-lg transition duration-300 ${paginaAtual === number ? 'bg-blue-900 text-white' : 'bg-blue-500 text-white hover:bg-blue-900 hover:text-gray-100'}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          <FaAngleDoubleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}
