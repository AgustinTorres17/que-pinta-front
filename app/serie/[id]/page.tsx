"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTVShowData } from "@/services/serieService";
import { TVShowData } from "@/types/Serie";
import Image from "next/legacy/image";
import { Leading } from "@/components/Leading";
import { ProducedBy } from "@/components/details/ProducedBy";
import { VoteCircle } from "@/components/details/VoteCircle";
import { Genres } from "@/components/details/Genres";
import { Seasons } from "@/components/details/Seasons";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { MovieInfo } from "@/components/details/MovieInfo";

export default function Serie() {
  const { id } = useParams();
  const tvShowId = Array.isArray(id) ? id[0] : id;
  const [tvShowData, setTVShowData] = useState<TVShowData | null>(null);

  useEffect(() => {
    if (!tvShowId) return;
    const fetchData = async () => {
      const response: TVShowData = await getTVShowData(tvShowId);
      setTVShowData(response);
    };
    fetchData();

    return () => {
      setTVShowData(null);
    };
  }, [tvShowId]);

  if (!tvShowData) return <LoadingScreen />;

  return (
    <div className="relative min-h-full w-full overflow-x-hidden lg:flex overflow-y-auto lg:items-start lg:justify-center">
      <div className="flex flex-col md:grid md:grid-cols-2 items-start lg:w-[80%] justify-start gap-5 z-10 relative">
        <div className="w-full flex flex-col items-center justify-start gap-8 pt-8 md:sticky md:top-0">
          <div className="text-center flex flex-col items-center justify-center gap-2">
            <MovieInfo
              title={tvShowData.name}
              poster_path={tvShowData.poster_path}
              homepage={tvShowData.homepage}
              release_date={tvShowData.first_air_date}
            />
          </div>
          <Genres genres={tvShowData.genres} />
          {tvShowData.vote_average && (
            <VoteCircle voteAverage={tvShowData.vote_average} />
          )}
        </div>
        <div className="h-full w-full flex flex-col items-center justify-start gap-8 p-8 pt-0 md:pt-8">
          <div className="lg:flex lg:items-start lg:w-full">
            {tvShowData.overview && (
              <div className="w-full text-center lg:max-w-full text-lg flex flex-col gap-2">
                <Leading variant={"h3"}>Sinópsis</Leading>
                <p className="text-pretty">{tvShowData.overview}</p>
              </div>
            )}
          </div>
          <Seasons seasons={tvShowData.seasons} />
          {tvShowData.production_companies && (
            <ProducedBy companies={tvShowData.production_companies} />
          )}
        </div>
      </div>
      {tvShowData.backdrop_path && (
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none select-none">
          <Image
            src={`http://image.tmdb.org/t/p/w1280${tvShowData.backdrop_path}`}
            alt={tvShowData.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
}
