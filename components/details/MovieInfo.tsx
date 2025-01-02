// components/MovieInfo.tsx
"use client"; // si lo usarás en un Client Component
import React from "react";
import Image from "next/image";
import { Leading } from "@/components/Leading";
import Link from "next/link";

interface MovieInfoProps {
  title: string;
  poster_path: string | null;
  homepage: string;
  release_date: string;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({
  title,
  poster_path,
  homepage,
  release_date,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Leading variant="h1" className="text-3xl text-center max-w-96">
        {title}
      </Leading>
      <p className="text-fondo-800 dark:text-fondo-300 italic">{release_date}</p>
      {homepage ? (
        <Link target="_blank" href={homepage} className="hover:shadow-xl">
          <Image
            src={`http://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={300}
            height={450}
          />
        </Link>
      ) : (
        <Image
          className="hover:shadow-xl hover:shadow-fondo-950 duration-200"
          src={`http://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width={300}
          height={450}
        />
      )}
    </div>
  );
};
