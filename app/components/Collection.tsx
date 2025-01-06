import React from "react";
import { MovieCard } from "./MovieCard";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";
import { motion } from "framer-motion";
import { SkeletonCard } from "./SkeletonCard";

interface CollectionProps {
  list: (MovieData | TVShowData)[];
}

export const Collection = ({ list }: CollectionProps) => {
  const skeletonCount = 21; 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 w-full overflow-hidden p-5 gap-4">
      {list.length === 0
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : list.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
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
            </motion.div>
          ))}
    </div>
  );
};