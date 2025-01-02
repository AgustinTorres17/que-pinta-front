import { GenreData } from "@/types/GenreCollection";
import RestHelper from "./RestHelper";
import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";

export async function getContentByGenre(genre: string): Promise<GenreData> {
  const response = await RestHelper.get<GenreData>(`/genre?genre=${genre}`);
  const filteredResponse = applyAllFiltersAndSorts(
    response,
    "vote_average",
    true,
    "id",
    ["poster_path", "overview"],
    [{ property: "vote_average", value: 0 }]
  );
  return filteredResponse;
}
