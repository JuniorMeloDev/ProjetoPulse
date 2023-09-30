import React, { useState, useRef } from 'react';

export default function SalvarImagem() {

    const [imagem, setImagem] = useState(null);
    const inputRef = useRef(null);

    const handleSelecionarImagem = (e) => {
        const arquivoSelecionado = e.target.files[0];
        const tamanhoMaximo = 10 * 1024 * 1024; // 10MB em bytes

        if (arquivoSelecionado && arquivoSelecionado.size <= tamanhoMaximo) {
            setImagem(arquivoSelecionado);
        } else if (arquivoSelecionado) {
            alert('A imagem é muito grande. O tamanho máximo permitido é de 10MB.');
            setImagem(null);
            inputRef.current.value = ''; // Limpa o valor do input
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
            formData.append('imagem', imagem); // 'imagem' é o objeto File da imagem que você quer enviar

            const response = await fetch('http://localhost:8080/usuario/salvar/imagem', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Imagem enviada com sucesso!');
            } else {
                console.error('Erro ao enviar a imagem:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleSelecionarImagem}
                ref={inputRef}
            />
            <div className="flex mt-6">
                <button
                    onClick={enviarImagem}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}