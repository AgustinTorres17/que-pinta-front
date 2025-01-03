import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leading } from "@/components/Leading";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  year: number;
  imageUrl: string;
  id: number;
  isMovie: boolean;
}

export const MovieCard = ({ title, year, imageUrl, id, isMovie }: MovieCardProps) => {
  return (
    <div className="relative overflow-hidden aspect-[12/18]">
      {imageUrl === "http://image.tmdb.org/t/p/w500/null" ? (
        <Image
          src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
          alt="No Image Available"
          layout="fill"
          objectFit="cover"
          className="transform transition duration-500 ease-in-out hover:scale-110 active:scale-110"
        />
      ) : (
        <Image
          className="transform transition duration-500 ease-in-out hover:scale-110 active:scale-110"
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      )}

      <div className="absolute inset-0 h-full text-center text-pretty bg-black bg-opacity-60 flex flex-col items-center justify-center gap-3 md:p-4 md:gap-3 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity duration-500">
        <Leading variant="h3" className="text-fondo-100">{title}</Leading>
        <p className="text-fondo-300">{year}</p>
        <Link href={isMovie ? `/movie/${id}` : `/serie/${id}`}>
          <Button className="font-bold" variant="default">Ver más</Button>
        </Link>
      </div>
    </div>
  );
};