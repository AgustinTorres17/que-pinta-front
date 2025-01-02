"use client";
import React from "react";
import Image from "next/image";
import { Leading } from "@/components/Leading";
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  [key: string]: any;
}
interface ProductionCompaniesProps {
  companies: ProductionCompany[];
}
export const ProducedBy = ({ companies }: ProductionCompaniesProps) => {
  if (!companies || companies.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center w-full text-center gap-2">
      <Leading variant="h3" className="text-center">
        Productoras
      </Leading>
      <div className="w-full flex gap-3 flex-wrap justify-center rounded-xl">
        {companies.slice(0, 2).map((company) => {
          if (!company.logo_path) {
            return null;
          }
          return (
            <div
              key={company.id}
              className="h-32 w-32 flex items-center p-4 rounded-lg bg-fondo-200"
            >
              <Image
                src={`http://image.tmdb.org/t/p/original${company.logo_path}`}
                alt={company.name}
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
