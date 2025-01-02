"use client";
import { useState, useEffect } from "react";
import { Leading } from "@/components/Leading";
import { getTVShowsData } from "@/services/serieService";
import { useSeriesStore } from "@/store/useSeriesStore";
import { Collection } from "../components/Collection";
import { LoadingScreen } from "../components/LoadingScreen";
import { Button } from "@/components/ui/button";

export default function Series() {
  const { series, setSeriesData } = useSeriesStore();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getTVShowsData();
        setSeriesData({ series: data });
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setSeriesData, reload]);

  const handleSearchMore = () => {
    setSeriesData({ series: [] });
    setReload(!reload);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col w-full overflow-hidden gap-5 pl-4 pt-4">
        <div className="flex flex-col gap-2 w-full items-center">
          <Leading variant={"h1"}>SERIES</Leading>
          <Collection list={series} />
          <Button onClick={handleSearchMore}>Buscar de nuevo</Button>
        </div>
      </div>
    </div>
  );
}