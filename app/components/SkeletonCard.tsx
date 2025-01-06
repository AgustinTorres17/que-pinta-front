import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden aspect-[12/18] bg-fondo-800 animate-pulse rounded-xl">
      <div className="absolute inset-0 bg-fondo-900"></div>
    </div>
  );
};