import React from "react";
import { Avatar } from "./Avatar";
import { Leading } from "@/components/Leading";

export const LoadingScreen = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-start pt-24">
      <Leading
        variant={"h2"}
        className="font-bold text-2xl text-center m-5 relative z-10"
      >
        Cargando...
      </Leading>
      <div className="w-96 h-96 flex justify-center relative">
        <Avatar />
      </div>
    </section>
  );
};
