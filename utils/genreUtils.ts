import genres from "@/app/constants/genres.json";

export function getGenreTitle(genre: string | undefined) {
    if (!genre) return "-";
    const genreData = genres as Record<string, any>;
    return genreData[genre];
}