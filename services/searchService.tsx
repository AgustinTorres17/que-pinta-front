import { SearchCollection } from "@/store/useSearchStore";
import RestHelper from "./RestHelper";
import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";

export async function searchMovieByTitle(
  title: string
): Promise<SearchCollection> {
  const response: SearchCollection = await RestHelper.get(
    `/search-movies?title=${encodeURIComponent(title)}`
  );
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
