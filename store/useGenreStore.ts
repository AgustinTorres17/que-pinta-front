import { create } from "zustand";
import { GenreData } from "@/types/GenreCollection";

interface GenreStore {
  genres: GenreData;
  setGenreData: (data: GenreData) => void;
}

export const useGenreStore = create<GenreStore>((set) => ({
  genres: [],
  setGenreData: (data) =>
    set((state) => ({
      ...state,
      genres: data,
    })),
}));