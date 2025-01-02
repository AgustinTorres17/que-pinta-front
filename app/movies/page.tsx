"use client";
import { useState, useEffect } from "react";
import { Leading } from "@/components/Leading";
import { getMoviesData } from "@/services/movieService";
import { useMoviesStore } from "@/store/useMoviesStore";
import { Collection } from "../components/Collection";
import { LoadingScreen } from "../components/LoadingScreen";

export default function Movies() {
  const { movies, setMoviesData } = useMoviesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMoviesData();
        setMoviesData({ movies: data });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setMoviesData]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>PELÍCULAS</Leading>
          <Collection list={movies} />
        </div>
      </div>
    </div>
  );
}