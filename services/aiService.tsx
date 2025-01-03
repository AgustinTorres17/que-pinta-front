import { MovieData } from "@/types/Movie";
import RestHelper from "./RestHelper";
import { TVShowData } from "@/types/Serie";
import { applyAllFiltersAndSorts } from "@/utils/arrayUtils";

export async function sendPrompt(prompt: string) {
  const response: (MovieData | TVShowData)[] = await RestHelper.post("/generate", { prompt });
  const filteredResponse = applyAllFiltersAndSorts(
    response,
    "vote_average",
    true,
    "id",
    ["poster_path", "overview"],
    [{ property: "vote_average", value: 0 }, {property: "overview", value: ""}]
  );
  return filteredResponse;
}
