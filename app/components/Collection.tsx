import React from "react";
import { MovieCard } from "./MovieCard";

interface CollectionProps {
  list: any[];
}
export const Collection = ({ list }: CollectionProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 w-full overflow-hidden p-5 gap-4">
      {list.map((item) => (
        <div key={item.id}>
          <MovieCard
            title={item.title ? item.title : item.name}
            year={
              item.release_date
                ? new Date(item.release_date).getFullYear()
                : new Date(item.first_air_date).getFullYear()
            }
            id={item.id}
            imageUrl={"http://image.tmdb.org/t/p/w780/" + item?.poster_path}
            isMovie={item.name ? false : true}
          />
        </div>
      ))}
    </div>
  );
};
