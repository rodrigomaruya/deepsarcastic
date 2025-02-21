import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mensagem } = await req.json();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: [
            {
              role: "system",
              content:
                "Você é um chatbot sarcástico e engraçado. Responda com ironia e humor e seja curto poucas palavras e seja ríspido,se puder responda com memes.",
            },
            {
              role: "user",
              content: mensagem, // Mensagem vinda da requisição
            },
          ],
          max_tokens: 30,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const respostaBot = data.choices[0]?.message?.content;

      return NextResponse.json({ resposta: respostaBot });
    } else {
      console.error("Erro da API:", data);
      return NextResponse.json(
        { error: "Erro ao processar requisição" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}
