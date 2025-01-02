import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MovieCard } from "./MovieCard"

export const Slider = ({ movies } : any) => {
  return (
    <Carousel>
      <CarouselContent className="flex gap-4 cursor-grab justify-start select-none ml-0">
        {movies ? movies.map((movie : any, index : any) => (
          <CarouselItem className="basis-auto pl-0" key={index}>
            <div className="w-32 md:w-52">
              <MovieCard
                title={movie.title ? movie.title : movie.name}
                genre={movie.genre_ids}
                year={movie.release_date ? new Date(movie.release_date).getFullYear() : new Date(movie.first_air_date).getFullYear()}
                id={movie.id}
                isMovie={movie.name ? false : true}
                imageUrl={"http://image.tmdb.org/t/p/w500/" + movie?.poster_path}
              />
            </div>
          </CarouselItem>
        )) : ("")}
      </CarouselContent>
    </Carousel>
  );
};