import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./Carousel.css";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";



export const Carousel = ({ slides } : any) => {

  let slidesL = 0;
  let combinedSlides = [];

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

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slidesL - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slidesL - 1 ? 0 : curr + 1));

  const handleStart = (clientX: any) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX : any) => {
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
      className="overflow-hidden relative h-full w-full cursor-grab"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div
        className="relative flex transition-transform duration-300 ease-in-out h-full select-none"
        style={{
          width: `${slidesL * 100}%`,
          transform: `translateX(calc(-${(curr * 100) / slidesL}% + ${offsetX}px))`,
        }}
      >
        {combinedSlides.map((slide, index) => (
          <div key={index} className="relative h-full w-full">
            <img
              src={"http://image.tmdb.org/t/p/original/" + slide.backdrop_path}
              alt="slide"
              className="overflow-hidden w-full h-full object-cover object-center fade-bottom"
            />
            <div className="hidden md:block absolute bottom-4 right-4">
              <h1 className="text-4xl text-white font-semibold">{slide.title ? slide.title : slide.name}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-20 inset-y-0 flex items-center justify-between w-full p-4">
        <button
          onClick={prev}
          className="rounded-full shadow opacity-100 bg-fondo-100 text-fondo-950 dark:bg-fondo-950 dark:text-fondo-100 p-4 hover:bg-primary  hover:text-accent transition-all ease-in-out duration-300"
          style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          color="secondary"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={next}
          className="rounded-full shadow opacity-100 bg-fondo-100 text-fondo-950 dark:bg-fondo-950 dark:text-fondo-100 p-4 hover:bg-primary hover:text-accent transition-all ease-in-out duration-300"
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          color="secondary"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>

  );
};