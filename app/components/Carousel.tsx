"use client";
import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MovieData } from "@/types/Movie";
import { TVShowData } from "@/types/Serie";
import Image from "next/legacy/image";
import "./Carousel.css";
import { Leading } from "@/components/Leading";

interface CarouselProps {
  slides: {
    movies: MovieData[];
    tvShows: TVShowData[];
  };
}

export const Carousel = ({ slides }: CarouselProps) => {
  let slidesL = 0;
  const combinedSlides: (MovieData | TVShowData)[] = [];

  if (slides && slides.movies && slides.tvShows) {
    slidesL = slides.movies.length + slides.tvShows.length;
    for (let i = 0; i < slidesL / 2; i++) {
      if (i < slides.movies.length) {
        combinedSlides.push(slides.movies[i]);
      }
      if (i < slides.tvShows.length) {
        combinedSlides.push(slides.tvShows[i]);
      }
    }
  }

  const [curr, setCurr] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const prev = () => setCurr((curr) => (curr === 0 ? slidesL - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slidesL - 1 ? 0 : curr + 1));

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setOffsetX((clientX - startX) * 10);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (offsetX > 800) {
      prev();
    } else if (offsetX < -800) {
      next();
    }
    setOffsetX(0);
  };

  return (
    <div
      id="carousel-homepage"
      className="overflow-hidden relative lg:min-h-full w-full cursor-grab"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div
        className="relative flex transition-transform duration-500 ease-in-out h-72 md:h-[calc(100vh-56px)]"
        style={{
          width: `${slidesL * 100}%`,
          transform: `translateX(calc(-${
            (curr * 100) / slidesL
          }% + ${offsetX}px))`,
        }}
      >
        {combinedSlides.map((slide, index) => (
          <div key={index} className="relative h-full w-full">
            <Image
              src={`http://image.tmdb.org/t/p/original${slide.backdrop_path}`}
              alt={"title" in slide ? slide.title : slide.name || "No Title"}
              layout="fill"
              objectFit="cover"
              className="overflow-hidden w-full h-full object-cover object-center fade-bottom"
            />
            <div className="absolute bottom-4 left-4 p-2 rounded">
              <Leading
                className="text-fondo-200 shadow-black"
                variant={"h2"}
                style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                }}
              >
                {"title" in slide ? slide.title : slide.name}
              </Leading>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-20 inset-y-0 flex items-center justify-between w-full p-4">
        <button
          onClick={prev}
          className="rounded-full shadow opacity-100 bg-fuente p-4 bg-fondo-50 text-black dark:bg-fondo-950 dark:text-fondo-50 transition-all ease-in-out duration-300"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          color="secondary"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={next}
          className="rounded-full shadow opacity-100 bg-fuente p-4 bg-fondo-50 text-black dark:bg-fondo-950 dark:text-fondo-50 transition-all ease-in-out duration-300"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          color="secondary"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
