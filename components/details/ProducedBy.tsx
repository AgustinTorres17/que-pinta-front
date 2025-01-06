"use client";
import React from "react";
import Image from "next/legacy/image";
import { Leading } from "@/components/Leading";
import { motion } from "framer-motion";
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
}
interface ProductionCompaniesProps {
  companies: ProductionCompany[];
}
export const ProducedBy = ({ companies }: ProductionCompaniesProps) => {
  if (!companies || companies.length === 0 || companies.some((company) => !company.logo_path)) {
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
              className="relative h-24 w-32 flex items-center rounded-lg bg-fondo-200"
            >
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={`http://image.tmdb.org/t/p/original${company.logo_path}`}
                  alt={company.name}
                  objectFit="contain"
                  width={128}
                  height={96}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
