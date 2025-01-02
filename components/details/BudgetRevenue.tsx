"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Leading } from "../Leading";

interface BudgetRevenueProps {
  budget: number;
  revenue: number;
}

// (Opcional) Formateo en moneda
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

// Abreviar números
const formatShortNumber = (value: number) => {
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
  return value.toString();
};

export const BudgetRevenue: React.FC<BudgetRevenueProps> = ({
  budget,
  revenue,
}) => {
  const data = [{ name: "Presupuesto vs. Ingresos", budget, revenue }];

  // 1) Usamos la variable CSS de Tailwind
  const axisColor = "var(--axis-color)";

  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <Leading variant={"h3"} className="text-center">
        Finanzas de la Película
      </Leading>

      <div className="h-80 w-full flex justify-center">
        <ResponsiveContainer width="80%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barGap={50}
          >
            {/* Ejes usando la variable: */}
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis
              tickFormatter={formatShortNumber}
              stroke={axisColor}
              domain={[0, "auto"]}
              padding={{ bottom: 1 }}
            />


            <Bar
              dataKey="budget"
              name="Presupuesto"
              fill="red"
              barSize={50}
              label={{
                position: "top",
                formatter: (value: number) => formatShortNumber(value),
                // Etiqueta en el mismo color que el eje
                fill: axisColor,
              }}
            />
            <Bar
              dataKey="revenue"
              name="Ingresos"
              fill="green"
              barSize={50}
              label={{
                position: "top",
                formatter: (value: number) => formatShortNumber(value),
                fill: axisColor,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
