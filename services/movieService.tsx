import RestHelper from "./RestHelper";
import { MovieData } from "@/types/Movie";
import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";
export async function getMovieData(idMovie: string): Promise<MovieData> {
  const response = await RestHelper.get<MovieData>(`/movie/${idMovie}`);
  (response);
  return response;
}

export async function getMoviesData(): Promise<MovieData[]> {
  const response = await RestHelper.get<MovieData[]>("/discover-movies");
  const filteredResponse = applyAllFiltersAndSorts(
    response,
    "vote_average",
    true, 
    "id", 
    ["poster_path", "title", "overview"], 
    [{ property: "vote_average", value: 0 }] 
  );
  return filteredResponse;
}
