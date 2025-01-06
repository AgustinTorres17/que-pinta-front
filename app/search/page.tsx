"use client";
import { useState, useEffect } from "react";
import { Leading } from "@/components/Leading";
import { searchMovieByTitle } from "@/services/searchService";
import { useSearchStore } from "@/store/useSearchStore";
import { Collection } from "../components/Collection";
import { LoadingScreen } from "../components/LoadingScreen";

export default function Search() {
  const search = useSearchStore((state) => state.search);
  const results = useSearchStore((state) => state.results);
  const setResults = useSearchStore((state) => state.setResults);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await searchMovieByTitle(search);
        setResults(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
        setIsFirstSearch(false);
      }
    };

    if (search) {
      searchMovies();
    }
  }, [search, setResults]);

  if (isLoading && isFirstSearch) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2 w-full items-center">
          {search ? (
            <Leading variant={"h2"}>
              Buscaste{" "}
              <span className="italic text-yellow-700 dark:text-yellow-400">
                {search}
              </span>
            </Leading>
          ) : (
            <Leading variant={"h2"}>Busca cualquier película</Leading>
          )}
          <Collection list={results} />
        </div>
      </div>
    </div>
  );
}
