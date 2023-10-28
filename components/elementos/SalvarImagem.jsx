import React, { useState, useRef } from 'react';

export default function SalvarImagem() {

    const [imagem, setImagem] = useState(null);
    const [previewImagem, setPreviewImagem] = useState(null);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [mostrarBotaoSalvar, setMostrarBotaoSalvar] = useState(true);
    const inputRef = useRef(null);

    const handleSelecionarImagem = (e) => {
        const arquivoSelecionado = e.target.files[0];
        const tamanhoMaximo = 10 * 1024 * 1024;

        if (arquivoSelecionado) {
            if (arquivoSelecionado.size <= tamanhoMaximo) {
                setImagem(arquivoSelecionado);

                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewImagem(reader.result);
                };
                reader.readAsDataURL(arquivoSelecionado);
                
                // Esconde a mensagem ao selecionar uma nova imagem
                setMostrarMensagem(false);
            } else {
                setMensagemErro('A imagem é muito grande. O tamanho máximo permitido é de 10MB.');
                setMostrarMensagem(true);
                setImagem(null);
                setPreviewImagem(null);
                inputRef.current.value = '';
            }
        }
    };

    const enviarImagem = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));

            if (!token) {
                console.error('Token não encontrado.');
                return;
            }

            const formData = new FormData();
            formData.append('imagem', imagem);

            const response = await fetch('http://localhost:8080/usuario/salvar/imagem', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Imagem enviada com sucesso!');
                setMostrarMensagem(true);
                setMensagemErro('Imagem enviada com sucesso!');
                setMostrarBotaoSalvar(false);
                setTimeout(() => {
                    setMostrarMensagem(false);
                    window.location.reload();
                }, 1500);

            } else {
                console.error('Erro ao enviar a imagem:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    return (
        <div>
            <div className='flex'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelecionarImagem}
                    ref={inputRef}
                />
            </div>
            {previewImagem && <img src={previewImagem} alt="Pré-visualização" className="w-24 mt-1" />}
            <div className="flex mt-2">
                {mostrarBotaoSalvar && (
                    <button
                        onClick={enviarImagem}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Salvar
                    </button>
                )}
            </div>
            {mostrarMensagem && (
                 <span className="block text-center bg-green-100 border border-green-400 text-black font-bold px-4 py-2 rounded mt-2 text-xl">
                    {mensagemErro}
                </span>
            )}
        </div>
    );
}