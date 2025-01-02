"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getContentByGenre } from "@/services/genreService";
import { useGenreStore } from "@/store/useGenreStore";
import { Collection } from "@/app/components/Collection";
import { getGenreTitle } from "@/utils/genreUtils";
import { Leading } from "@/components/Leading";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function Genero() {
  const { genero } = useParams();
  const genre = Array.isArray(genero) ? genero[0] : genero;
  const { genres, setGenreData } = useGenreStore();
  const [loading, setLoading] = useState(true);

  const genreTitle = getGenreTitle(genre);

  useEffect(() => {
    if (!genre) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getContentByGenre(genre);
        setGenreData(response);
      } catch (error) {
        console.error("Error fetching genre content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [genre, setGenreData]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>{genreTitle}</Leading>
          <Collection list={genres} />
        </div>
      </div>
    </div>
  );
}