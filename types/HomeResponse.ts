import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";

export interface HomeResponse {
  accionPelis: (MovieData | TVShowData)[];
  aventuraPelis: (MovieData | TVShowData)[];
  comediaPelis: (MovieData | TVShowData)[];
  docs: (MovieData | TVShowData)[];
  fantasiaPelis: (MovieData | TVShowData)[];
  horrorPelis: (MovieData | TVShowData)[];
  pelis: MovieData[];
  tvs: TVShowData[];
  popularData: {
    movies: MovieData[];
    tvShows: TVShowData[];
  };
}