"use client";
import { Bot, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Leading } from "../Leading";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useChatStore } from "@/store/useChatStore";

export const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const chatMessage = useChatStore((state) => state.chatMessage);
  const setChatMessage = useChatStore((state) => state.setChatMessage);
  const router = useRouter();

  const handleChatClick = () => {
    setChatOpen(!chatOpen);
  };

  const handleSearchButtonClick = () => {
    if (chatMessage.trim()) {
      router.push("/generate");
      setChatOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  return (
    <div className="fixed bottom-0 right-6 z-[9999]">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="group rounded-t-xl w-96 p-4 bg-fondo-50/90 dark:bg-fondo-950/90 flex flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <Leading variant={"h3"}>Asesórate con Chatplin</Leading>
              <Button
                onClick={() => handleChatClick()}
                variant={"ghost"}
                size={"icon"}
                className="group"
              >
                <CircleX />
              </Button>
            </div>
            <div className="h-[2px] bg-fondo-200 dark:bg-fondo-900/70 w-full mb-2"></div>
            <div className="px-4">
              <p className="text-neutral-900 dark:text-neutral-50 text-lg font-semibold">
                ¡Hola! 👋 <br />
                <br />
                Soy Chatplin, la IA de{" "}
                <span className="text-fondo-900 dark:text-fondo-200 italic">
                  QuePinta
                </span>
                . <br />
                <br />
                Mi trabajo es ayudarte a encontrar la película o serie que estás
                buscando! Ten en cuenta que mientras más preciso (o precisa)
                seas, mejores serán mis recomendaciones para ti! <br />
                <br />
                Para que te pueda ayudar mejor, nómbrame géneros o actores que
                te gusten para adecuar mi busqueda. <br />
                <br />
                Una vez que finalices de escribir, presiona la tecla enter para
                ver mis recomendaciones.
              </p>
            </div>
            <div className="grid grid-cols-1fr-auto gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="w-full mt-2"
              />
              <Button
                onClick={handleSearchButtonClick}
                variant={"outline"}
                className="mt-2"
              >
                Enviar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-4 right-4"
          >
            <Button
              onClick={() => handleChatClick()}
              variant={"chat"}
              size={"chat"}
              className="group"
            >
              <Bot className="group-hover:text-yellow-500 duration-200" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
