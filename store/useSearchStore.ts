import { create } from "zustand";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";

export type SearchCollection = (MovieData | TVShowData)[];

interface SearchState {
  search: string;
  results: SearchCollection;
  setSearch: (search: string) => void;
  setResults: (results: SearchCollection) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  results: [],
  setSearch: (search) => set({ search }),
  setResults: (results) => set({ results }),
}));
