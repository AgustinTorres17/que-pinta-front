"use client";
import { useState, useEffect, useMemo } from "react";
import { Leading } from "@/components/Leading";
import { Slider } from "./components/Slider";
import Link from "next/link";
import { getHomeContent } from "@/services/homeService";
import { useHomeStore } from "@/store/useHomeStore";
import { Carousel } from "./components/Carousel";
import { LoadingScreen } from "./components/LoadingScreen";

export default function Home() {
  const {
    accionPelis,
    aventuraPelis,
    comediaPelis,
    docs,
    fantasiaPelis,
    horrorPelis,
    pelis,
    tvs,
    popularData,
    setHomeData,
  } = useHomeStore();

  const [loading, setLoading] = useState(true);

  const shouldFetch = useMemo(() => !pelis || pelis.length === 0, [pelis]);

  useEffect(() => {
    if (!shouldFetch) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getHomeContent();
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching home content:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [shouldFetch, setHomeData]);

  if (loading && shouldFetch) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <div className="h-full overflow-auto">
      <Carousel slides={popularData} />
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2">
          <Link href="/movies">
            <Leading variant={"h2"}>PELÍCULAS</Leading>
          </Link>
          <Slider movies={pelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/series">
            <Leading variant={"h2"}>SERIES</Leading>
          </Link>
          <Slider movies={tvs} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/accion">
            <Leading variant={"h2"}>ACCIÓN</Leading>
          </Link>
          <Slider movies={accionPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/aventura">
            <Leading variant={"h2"}>AVENTURA</Leading>
          </Link>
          <Slider movies={aventuraPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/comedia">
            <Leading variant={"h2"}>COMEDIA</Leading>
          </Link>
          <Slider movies={comediaPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/documental">
            <Leading variant={"h2"}>DOCUMENTALES</Leading>
          </Link>
          <Slider movies={docs} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/fantasy">
            <Leading variant={"h2"}>FANTASÍA</Leading>
          </Link>
          <Slider movies={fantasiaPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/terror">
            <Leading variant={"h2"}>HORROR</Leading>
          </Link>
          <Slider movies={horrorPelis} />
        </div>
      </div>
    </div>
  );
}
