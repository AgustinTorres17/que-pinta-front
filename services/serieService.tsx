import RestHelper from "./RestHelper";
import { TVShowData } from "@/types/Serie";
import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";

export async function getTVShowData(idTVShow: string): Promise<TVShowData> {
  const response = await RestHelper.get<TVShowData>(`/serie/${idTVShow}`);
  (response);
  return response;
}

export async function getTVShowsData(): Promise<TVShowData[]> {
  const response = await RestHelper.get<TVShowData[]>("/discover-series");
  const filteredResponse = applyAllFiltersAndSorts(
    response,
    "vote_average", 
    true, 
    "id",
    ["vote_average", "poster_path", "overview", "name"], 
    [{ property: "vote_average", value: 0 }]
  );
  return filteredResponse;
}
