import React from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenresProps {
  genres: Genre[];
}

export const Genres = ({ genres }: GenresProps) => {
  if (!genres) {
    return null;
  }
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-wrap gap-2 w-full h-full items-start px-4 justify-center">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-4 py-2 bg-fondo-50 dark:bg-fondo-950 rounded-xl  text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};
