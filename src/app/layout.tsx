import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/provider/auth";

const robotoSans = Roboto({
  weight: ["100", "300", "400", "500"],
  subsets: ["latin"],
  variable: "--roboto",
});

export const metadata: Metadata = {
  title: "ChatBot DeepSarcastic",
  description: "ChatBot com respostas sarcástica",
  keywords: [
    "tecnologia, finanças, programação, curiosidades, inovação, aprendizado, desenvolvimento, transformação digital, exploração de ideias",
  ],

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
