import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";
import RestHelper from "./RestHelper";
import { HomeResponse } from "@/types/HomeResponse";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";

export async function getHomeContent() {
  const response: HomeResponse = await RestHelper.get<HomeResponse>("/get-data-home");

  const applyFilters = (data: (MovieData | TVShowData)[]) => 
    Array.isArray(data) ? applyAllFiltersAndSorts(data, "vote_average", true, "id", ["poster_path", "overview"], [{ property: "vote_average", value: 0 }]) : [];

  const filteredResponse = {
    accionPelis: applyFilters(response.accionPelis),
    aventuraPelis: applyFilters(response.aventuraPelis),
    comediaPelis: applyFilters(response.comediaPelis),
    docs: applyFilters(response.docs),
    fantasiaPelis: applyFilters(response.fantasiaPelis),
    horrorPelis: applyFilters(response.horrorPelis),
    pelis: applyFilters(response.pelis),
    tvs: applyFilters(response.tvs),
    popularData: {
      movies: applyFilters(response.popularData.movies),
      tvShows: applyFilters(response.popularData.tvShows),
    },
  };

  return filteredResponse;
}