"use client";

import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Leading } from "../Leading";

// Función para decidir el color de la barra según el voto
const getColorForVote = (vote: number) => {
  if (vote < 3) return "red";
  if (vote < 5) return "orange";
  if (vote < 7) return "yellow";
  return "green";
};

interface VoteCircleProps {
  voteAverage: number;
}

export const VoteCircle: React.FC<VoteCircleProps> = ({ voteAverage }) => {
  const data = [
    {
      name: "Voto",
      value: voteAverage,
      fill: getColorForVote(voteAverage),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <Leading variant="h3" className="text-center">
        Voto Promedio
      </Leading>
      <div style={{ width: 150, height: 150 }}>
        <RadialBarChart
          width={150}
          height={150}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={10}
          startAngle={90}
          endAngle={-270}
        >
          {/* Ocultamos ticks del eje */}
          <PolarAngleAxis type="number" domain={[0, 10]} tick={false} />

          {/* Barra de fondo dinámica */}
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "var(--circle-bg-color)" }} // Color dinámico
          />

          {/* Texto centrado */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-color)" // Texto dinámico según el modo
            fontSize="16"
          >
            {voteAverage.toFixed(1)} / 10
          </text>
        </RadialBarChart>
      </div>
    </div>
  );
};
