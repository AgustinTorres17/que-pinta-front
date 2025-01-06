"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getContentByGenre } from "@/services/genreService";
import { useGenreStore } from "@/store/useGenreStore";
import { Collection } from "@/app/components/Collection";
import { getGenreTitle } from "@/utils/genreUtils";
import { Leading } from "@/components/Leading";
import { Button } from "@/components/ui/button";

export default function Genero() {
  const { genero } = useParams();
  const genre = Array.isArray(genero) ? genero[0] : genero;
  const { genres, setGenreData } = useGenreStore();
  const [reload, setReload] = useState(false);

  const genreTitle = getGenreTitle(genre);

  useEffect(() => {
    if (!genre) return;
    const fetchData = async () => {
      try {
        const response = await getContentByGenre(genre);
        setGenreData(response);
      } catch (error) {
        console.error("Error fetching genre content:", error);
      }
    };
    fetchData();
  }, [genre, setGenreData, reload]);

  const handleReload = () => {
    if (typeof window !== "undefined") {
      const moviesComponent = document.getElementById("genresComponent");
      if (moviesComponent) {
        moviesComponent.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setGenreData([]);
    setReload((prev) => !prev); 
  };


  return (
    <div className="h-full overflow-auto pb-4" id="genresComponent">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-8">
        <div className="flex flex-col gap-2 w-full items-center">
          {genreTitle && (
            <Leading variant={"h1"}>
              Películas y series de {genreTitle.toLowerCase()}
            </Leading>
          )}

          <Collection list={genres} />
          {genreTitle && (
            <Button
              variant="outline"
              className="font-semibold"
              onClick={() => handleReload()}
            >
              Buscar más películas de {genreTitle.toLowerCase()}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
