import { create } from "zustand";

// Definimos la forma (interface) de todos los datos que tengas en el home
interface HomeData {
  // Cada uno de tus arrays:
  accionPelis: any[];
  aventuraPelis: any[];
  comediaPelis: any[];
  docs: any[];
  fantasiaPelis: any[];
  horrorPelis: any[];
  pelis: any[];
  tvs: any[];
  // popularData podría tener dentro un objeto con movies y tvShows
  popularData: {
    movies: any[];
    tvShows: any[];
  };
}

// Esta interfaz incluye también las funciones que mutan el estado
interface HomeStore extends HomeData {
  setHomeData: (data: Partial<HomeData>) => void;
}

// Creamos el store con Zustand
export const useHomeStore = create<HomeStore>((set) => ({
  // Estado inicial
  accionPelis: [],
  aventuraPelis: [],
  comediaPelis: [],
  docs: [],
  fantasiaPelis: [],
  horrorPelis: [],
  pelis: [],
  tvs: [],
  popularData: {
    movies: [],
    tvShows: [],
  },

  // Función para actualizar el estado global
  setHomeData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
