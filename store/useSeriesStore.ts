import { TVShowData } from "@/types/Serie";
import { create } from "zustand";

interface SeriesData {
  series: TVShowData[];
}

interface SeriesStore extends SeriesData {
  setSeriesData: (data: Partial<SeriesData>) => void;
}

export const useSeriesStore = create<SeriesStore>((set) => ({
  series: [],
  setSeriesData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
