"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";

const GeneratePage = () => {
  const chatMessage = useChatStore((state) => state.chatMessage);
  const router = useRouter();

  useEffect(() => {
    if (chatMessage.trim()) {
      // Aquí puedes enviar el prompt al backend
      console.log("Enviando prompt al backend:", chatMessage);
    } else {
      // Si no hay prompt, redirigir a otra página o mostrar un mensaje de error
      router.push("/");
    }
  }, [chatMessage, router]);

  return (
    <div>
      <h1>Generar Contenido</h1>
      <p>Prompt: {chatMessage}</p>
      {/* Aquí puedes mostrar el resultado de la generación de contenido */}
    </div>
  );
};

export default GeneratePage;