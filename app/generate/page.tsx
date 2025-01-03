"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";
import { sendPrompt } from "@/services/aiService";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";
import { Leading } from "@/components/Leading";
import { Collection } from "../components/Collection";
import { useMemo } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
const GeneratePage = () => {
  const [movies, setMovies] = useState<(MovieData | TVShowData)[]>([]);
  const [loading, setLoading] = useState(true);

  const memoizedMovies = useMemo(() => movies, [movies]);
  const chatMessage = useChatStore((state) => state.chatMessage);
  const router = useRouter();

  useEffect(() => {
    if (chatMessage.trim()) {
      const generateContent = async () => {
        const response: (MovieData | TVShowData)[] = await sendPrompt(
          chatMessage
        );
        setMovies(response);
        setLoading(false);
      };
      generateContent();
    } else {
      router.push("/");
    }
  }, [chatMessage, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>Las recomendaciones de Chatplin:</Leading>
          <Collection list={memoizedMovies} />
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
