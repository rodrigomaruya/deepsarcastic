import Image from "next/image";
import logo from "/public/logo.png";
import { ButtonLogin } from "@/components/buttonLogar";

export default function Home() {
  return (
    <main className="h-[calc(100vh-80px)] w-full">
      <div className="flex flex-col items-center justify-center pt-20 md:pt-36">
        <Image
          src={logo}
          alt="logo do site"
          width={100}
          height={200}
          className="w-auto h-auto"
          priority={true}
        />
        <h1 className="text-3xl md:text-5xl font-bold mb-5">
          Deep<span className="text-red-800">Sarcastic</span>
        </h1>
        <p className="mb-4 font-semibold text-zinc-500">
          IA mais sarcástica do momento!
        </p>
        <ButtonLogin />
      </div>
      <div className="flex items-center justify-center mt-16 px-3">
        <p className="border p-2 rounded-md text-center bg-red-800 text-white font-semibold">
          Por favor, use com moderação!
        </p>
      </div>
    </main>
  );
}
