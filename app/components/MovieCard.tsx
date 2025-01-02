import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leading } from "@/components/Leading";

export const MovieCard = ({ title, year, imageUrl, id, isMovie }: any) => {
  return (
    <div className="relative overflow-hidden aspect-[12/18]">
      {imageUrl === "http://image.tmdb.org/t/p/w500/null" ? (
        <img
          src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
          alt=""
          className="h-full object-cover transform transition duration-500 ease-in-out hover:scale-110 active:scale-110"
        />
      ) : (
        <img
          className="h-full w-full transform transition duration-500 ease-in-out hover:scale-110 active:scale-110"
          src={imageUrl}
          alt={title}
        />
      )}

      <div className="absolute inset-0 h-full text-center text-pretty bg-black bg-opacity-60 flex flex-col items-center justify-center gap-3 md:p-4 md:gap-3 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity duration-500">
        <Leading variant={"h3"}>
          {title} ({year})
        </Leading>

        {isMovie ? (
          <Link href={`/movie/${id}`}>
            <Button className="p-2" variant="default">
              Ver Detalles
            </Button>
          </Link>
        ) : (
          <Link href={`/serie/${id}`}>
            <Button className="p-2" variant="default">
              Ver Detalles
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
