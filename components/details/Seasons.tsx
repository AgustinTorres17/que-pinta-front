"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Leading } from "../Leading";

interface Season {
  id: number;
  season_number: number;
  episode_count: number;
  name: string;
  air_date: string | null;
  overview: string;
  poster_path: string | null;
}

interface SeasonsProps {
  seasons: Season[];
}

export const Seasons: React.FC<SeasonsProps> = ({ seasons }) => {
  const data = seasons
    .filter(
      (season) => season.episode_count > 0 && season.season_number !== 0 
    )
    .map((season) => ({
      name: `T${season.season_number}`, 
      episodes: season.episode_count,  
    }));

  const barColor = "var(--axis-color)";
  const infoColor = "var(--info-color)";

  return (
    <div className="w-full p-4">
      <Leading variant={"h3"} className="text-center">Temporadas</Leading>
      <div className="h-80 w-full flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barGap={10}
          >
            <XAxis dataKey="name" stroke={barColor} />
            <YAxis
              tickFormatter={(value) => value.toString()}
              stroke={barColor}
              domain={[0, "auto"]}
              padding={{ bottom: 0 }}
            />
            <Bar
              dataKey="episodes"
              name="Episodios"
              fill={barColor}
              barSize={40}
              label={{
                position: "middle",
                formatter: (value: number) =>
                  value > 0
                    ? `${value.toString().padStart(2, "0")} eps` 
                    : "", 
                fill: infoColor,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Seasons;
