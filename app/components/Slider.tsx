import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MovieCard } from "./MovieCard";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";

interface SliderProps {
  movies: (MovieData | TVShowData)[];
}

const isMovie = (movie: MovieData | TVShowData): movie is MovieData => {
  return ((movie as MovieData).release_date !== undefined);
};

export const Slider = ({ movies }: SliderProps) => {
  return (
    <Carousel>
      <CarouselContent className="flex gap-4 cursor-grab justify-start select-none ml-0">
        {movies ? movies.map((movie, index) => (
          <CarouselItem className="basis-auto pl-0" key={index}>
            <div className="w-32 md:w-52">
              <MovieCard
                title={isMovie(movie) ? movie.title : movie.name}
                year={isMovie(movie) ? new Date(movie.release_date).getFullYear() : new Date(movie.first_air_date).getFullYear()}
                id={movie.id}
                isMovie={isMovie(movie)}
                imageUrl={"http://image.tmdb.org/t/p/w780/" + movie?.poster_path}
              />
            </div>
          </CarouselItem>
        )) : null}
      </CarouselContent>
    </Carousel>
  );
};