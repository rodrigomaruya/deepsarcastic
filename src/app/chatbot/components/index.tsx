"use client";

import { useState } from "react";
import axios from "axios";

interface Mensagem {
  tipo: "user" | "bot";
  texto: string;
}

interface UserProp {
  user: string;
}

export default function HomeChat({ user }: UserProp) {
  const [mensagem, setMensagem] = useState("");
  const [respostas, setRespostas] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(false);

  const enviarMensagem = async () => {
    if (mensagem.trim() === "") return;

    setRespostas((prev) => [...prev, { tipo: "user", texto: mensagem }]);
    setCarregando(true);

    try {
      const response = await axios.post("/api/chat", {
        mensagem,
      });
      setRespostas((prev) => [
        ...prev,
        { tipo: "bot", texto: response.data.resposta },
      ]);
    } catch (error) {
      setRespostas((prev) => [
        ...prev,
        { tipo: "bot", texto: "Erro ao obter resposta!" },
      ]);
    } finally {
      setMensagem("");
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-3 py-4">
      <h1 className="text-xl font-bold text-center mb-1">
        Deep<span className="text-red-800">Sarcastic</span> 🤖
      </h1>

      <div className="border border-gray-300 p-4 h-96 overflow-y-auto rounded-md">
        {respostas.map((res, index) => (
          <p
            key={index}
            className={`p-2 my-1 rounded-md ${
              res.tipo === "user"
                ? "bg-blue-200 text-right"
                : "bg-green-200 text-left"
            }`}
          >
            {res.texto}
          </p>
        ))}
        {carregando && <p className="text-gray-500">Digitando...</p>}
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder={`Pergunte logo ${user}`}
          className="flex-1 border p-2 rounded-l-md"
        />
        <button
          onClick={enviarMensagem}
          disabled={carregando}
          className="bg-blue-500 text-white p-2 rounded-r-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
