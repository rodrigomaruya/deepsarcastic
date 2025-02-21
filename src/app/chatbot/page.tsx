import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeChat from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBot DeepSarcastic",
  description: "ChatBot com respostas sarcástica",
  keywords: [
    "tecnologia, finanças, programação, curiosidades, inovação, aprendizado, desenvolvimento, transformação digital, exploração de ideias",
  ],
  icons: "/favicon.png",
  openGraph: {
    title: "ChatBot DeepSarcastic",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default async function ChatBot() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <main>
      <HomeChat user={session.user.name} />
    </main>
  );
}
