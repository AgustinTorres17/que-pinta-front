import { MovieData } from "@/types/Movie";
import { create } from "zustand";

interface MoviesData {
  movies: MovieData[];
}

interface MoviesStore extends MoviesData {
  setMoviesData: (data: Partial<MoviesData>) => void;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
  movies: [],
  setMoviesData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
