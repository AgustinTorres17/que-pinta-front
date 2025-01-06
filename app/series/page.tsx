"use client";
import { useState, useEffect } from "react";
import { Leading } from "@/components/Leading";
import { getTVShowsData } from "@/services/serieService";
import { useSeriesStore } from "@/store/useSeriesStore";
import { Collection } from "../components/Collection";
import { Button } from "@/components/ui/button";

export default function Series() {
  const { series, setSeriesData } = useSeriesStore();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTVShowsData();
        setSeriesData({ series: data });
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    })();
  }, [setSeriesData, reload]);

  const handleReload = () => {
    if (typeof window !== "undefined") {
      const moviesComponent = document.getElementById("series");
      if (moviesComponent) {
        moviesComponent.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setSeriesData({ series: [] });
    setReload((prev) => !prev);
  };

  return (
    <div className="h-full overflow-auto pb-4" id="series">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-8">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>SERIES</Leading>
          <Collection list={series} />
          <Button
            variant="outline"
            className="font-semibold"
            onClick={handleReload}
          >
            Buscar más series
          </Button>
        </div>
      </div>
    </div>
  );
}
