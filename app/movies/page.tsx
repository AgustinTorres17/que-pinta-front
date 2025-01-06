"use client";
import { useState, useEffect } from "react";
import { Leading } from "@/components/Leading";
import { getMoviesData } from "@/services/movieService";
import { useMoviesStore } from "@/store/useMoviesStore";
import { Collection } from "../components/Collection";
import { Button } from "@/components/ui/button";

export default function Movies() {
  const { movies, setMoviesData } = useMoviesStore();
  const [reload, setReload] = useState(false); // Estado para forzar la recarga

  useEffect(() => {
    (async () => {
      try {
        const data = await getMoviesData();
        setMoviesData({ movies: data });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [setMoviesData, reload]);

  const handleReload = () => {
    const moviesComponent = document.getElementById("moviesComponent");
    moviesComponent.scrollTo({ top: 0, behavior: "smooth" });
    setMoviesData({ movies: [] });
    setReload((prev) => !prev); 
  };

  return (
    <div className="h-full overflow-auto pb-4" id="moviesComponent">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-8">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>PELÍCULAS</Leading>
          <Collection list={movies} />
          {movies && (
            <Button
              variant="outline"
              className="font-semibold"
              onClick={handleReload}
            >
              Buscar más películas
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
