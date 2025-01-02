import React from "react";
import { MovieCard } from "./MovieCard";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";

interface CollectionProps {
  list: (MovieData | TVShowData)[];
}

export const Collection = ({ list }: CollectionProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 w-full overflow-hidden p-5 gap-4">
      {list.map((item) => (
        <div key={item.id}>
          <MovieCard
            title={"title" in item ? item.title : item.name}
            year={
              "release_date" in item
                ? new Date(item.release_date).getFullYear()
                : "first_air_date" in item
                ? new Date(item.first_air_date).getFullYear()
                : 0 
            }
            id={item.id}
            imageUrl={"http://image.tmdb.org/t/p/w780/" + item?.poster_path}
            isMovie={"title" in item}
          />
        </div>
      ))}
    </div>
  );
};
