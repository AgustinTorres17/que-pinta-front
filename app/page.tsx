"use client";
import { useState, useEffect, useMemo } from "react";
import { Leading } from "@/components/Leading";
import { Slider } from "./components/Slider";
import Link from "next/link";
import { getHomeContent } from "@/services/homeService";
import { useHomeStore } from "@/store/useHomeStore";
import { Carousel } from "./components/Carousel";
import { LoadingScreen } from "./components/LoadingScreen";
import { Chat } from "@/components/details/Chat";
import "./components/Links.css"


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
    <div className="h-full w-full overflow-auto relative">
      <Carousel slides={popularData} />
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2">
          <Link href="/movies" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>PELÍCULAS</Leading>
          </Link>
          <Slider movies={pelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/series" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>SERIES</Leading>
          </Link>
          <Slider movies={tvs} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/accion" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>ACCIÓN</Leading>
          </Link>
          <Slider movies={accionPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/aventura" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>AVENTURA</Leading>
          </Link>
          <Slider movies={aventuraPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/comedia" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>COMEDIA</Leading>
          </Link>
          <Slider movies={comediaPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/documental" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>DOCUMENTALES</Leading>
          </Link>
          <Slider movies={docs} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/fantasy" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>FANTASÍA</Leading>
          </Link>
          <Slider movies={fantasiaPelis} />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/genre/terror" className="link-hover-effect w-fit">
            <Leading variant={"h2"}>HORROR</Leading>
          </Link>
          <Slider movies={horrorPelis} />
        </div>
      </div>
      <Chat />
    </div>
  );
}
