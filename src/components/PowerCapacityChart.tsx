"use client";

import { useId, useMemo, useState, useEffect } from "react";
import { Area, CartesianGrid, AreaChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { generateEraGradient } from "./PoliticalEraBackground";
import { getPoliticalEra, PoliticalEra } from "@/lib/political-data";
import { PaperTexture } from "./PaperTexture";
import capacityDataRaw from "@/data/electricity-installed-capacity.json";

const chartConfig = {
  Coal: {
    label: "Coal",
    color: "var(--color-blue-slate-700)",
  },
  "Oil & Gas": {
    label: "Oil & Gas",
    color: "var(--color-carrot-orange-500)",
  },
  Nuclear: {
    label: "Nuclear",
    color: "var(--color-strawberry-red-400)",
  },
  Hydro: {
    label: "Hydro",
    color: "var(--color-cerulean-600)",
  },
  Wind: {
    label: "Wind",
    color: "var(--color-dark-cyan-600)",
  },
  Solar: {
    label: "Solar",
    color: "var(--color-tuscan-sun-400)",
  },
  "Small-Hydro": {
    label: "Small-Hydro",
    color: "var(--color-seagrass-500)",
  },
  "Bio Power": {
    label: "Bio Power",
    color: "var(--color-willow-green-400)",
  },
  "Renewables %": {
    label: "Renewables %",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PowerCapacityChart() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const chartId = useId();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const data = useMemo(() => {
    const indData = (capacityDataRaw as any).data.IND;
    const years = Object.keys(indData).sort((a, b) => parseInt(a) - parseInt(b));

    return years.map(yearStr => {
      const year = parseInt(yearStr);
      const yearData = indData[yearStr];
      const era = getPoliticalEra("IND", year);

      return {
        year,
        Coal: yearData.Coal || 0,
        "Oil & Gas": yearData["Oil & Gas"] || 0,
        Nuclear: yearData.Nuclear || 0,
        Hydro: yearData.Hydro || 0,
        Wind: yearData.Wind || 0,
        Solar: yearData.Solar || 0,
        // "Small-Hydro": yearData["Small-Hydro"] || 0,
        "Bio Power": yearData["Bio Power"] || 0,
        "Renewables %": (yearData["RES-Total"] / yearData.Total) * 100 || 0,
        total: yearData.Total || 0,
        IND_era: era,
      };
    });
  }, []);

  const startYear = 1948;
  const endYear = 2026;
  const getGradientId = (code: string) => `era-gradient-${code}-${chartId.replace(/:/g, '')}`;

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const era: PoliticalEra | undefined = payload[0].payload.IND_era;
      const sortedPayload = [...payload].sort((a, b) => (b.value || 0) - (a.value || 0));

      return (
        <div className="bg-background border rounded-none p-4 shadow-xl flex flex-col gap-4 min-w-[300px] max-w-[400px]">
          <PaperTexture />
          <div className="flex items-center justify-between border-b pb-2">
            <p className="font-bold text-lg text-foreground">{label}</p>
            <span className="text-xs font-mono bg-muted px-2 py-1 rounded-none text-muted-foreground uppercase tracking-tighter">Installed Capacity (MW)</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 overflow-hidden">
            {sortedPayload.map((entry: any, index: number) => {
              if (entry.dataKey === "total") return null;
              const value = entry.value;
              if (value === 0 && label < 1990) return null; // Hide zeros in old data to keep it clean

              return (
                <div key={index} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-2.5 h-2.5 flex-shrink-0" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-muted-foreground truncate">{entry.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-foreground whitespace-nowrap">
                    {value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-2 flex items-center justify-between font-bold text-foreground">
            <span>Total</span>
            <span className="font-mono">{payload[0].payload.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} MW</span>
          </div>

          <div className="pt-2 flex items-center justify-between font-bold text-foreground">
            <span>Renewables %</span>
            <span className="font-mono">{payload[0].payload["Renewables %"].toLocaleString(undefined, { maximumFractionDigits: 1 })} %</span>
          </div>

          {era ? (
            <div className="text-xs text-muted-foreground bg-muted/40 p-2 border border-border/50 rounded-none mt-1 flex flex-col gap-0.5">
              <span className="block font-medium text-foreground text-sm truncate">{era.leader}</span>
              <span className="block truncate opacity-80">{era.party}</span>
              <div className="w-full h-1 mt-1 rounded-none opacity-50" style={{ backgroundColor: era.color }}></div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-none mt-1 border border-dashed border-border/40">
              Unknown Era
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-card rounded-none md:border md:p-4 group/chart">
      <PaperTexture />
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={data}
          margin={{ left: isSmallScreen ? 4 : 16, right: isSmallScreen ? 4 : 16, top: 16, bottom: 16 }}
          stackOffset="none"
        >
          <defs>
            {generateEraGradient({
              countryCode: "IND",
              id: getGradientId("IND"),
              minYear: startYear,
              maxYear: endYear,
              opacity: 0.15,
              enabled: true
            })}
          </defs>

          <CartesianGrid vertical={false} opacity={0.2} strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            minTickGap={40}
            domain={[startYear, endYear]}
            type="number"
            tickFormatter={(year) => year.toString()}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            width={isSmallScreen ? 0 : 55}
            tickFormatter={(value) => {
              if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
              if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
              return value.toLocaleString();
            }}
            hide={isSmallScreen}
          />
          <ChartTooltip
            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }}
            content={<CustomTooltipContent />}
          />

          {/* Background Political Era Gradients applied via a non-stacked area */}
          <Area
            key="era-bg"
            dataKey="total"
            type="monotone"
            fill={`url(#${getGradientId("IND")})`}
            stroke="transparent"
            strokeWidth={0}
            isAnimationActive={false}
            stackId="none"
          />

          <Area
            dataKey="Coal"
            type="monotone"
            stackId="1"
            stroke={chartConfig.Coal.color}
            fill={chartConfig.Coal.color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={1500}
          />
          <Area
            dataKey="Oil & Gas"
            type="monotone"
            stackId="1"
            stroke={chartConfig["Oil & Gas"].color}
            fill={chartConfig["Oil & Gas"].color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={1700}
          />
          <Area
            dataKey="Nuclear"
            type="monotone"
            stackId="1"
            stroke={chartConfig.Nuclear.color}
            fill={chartConfig.Nuclear.color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={1900}
          />
          <Area
            dataKey="Hydro"
            type="monotone"
            stackId="1"
            stroke={chartConfig.Hydro.color}
            fill={chartConfig.Hydro.color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={2100}
          />
          <Area
            dataKey="Small-Hydro"
            type="monotone"
            stackId="1"
            stroke={chartConfig["Small-Hydro"].color}
            fill={chartConfig["Small-Hydro"].color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={2300}
          />
          <Area
            dataKey="Bio Power"
            type="monotone"
            stackId="1"
            stroke={chartConfig["Bio Power"].color}
            fill={chartConfig["Bio Power"].color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={2500}
          />
          <Area
            dataKey="Wind"
            type="monotone"
            stackId="1"
            stroke={chartConfig.Wind.color}
            fill={chartConfig.Wind.color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={2700}
          />
          <Area
            dataKey="Solar"
            type="monotone"
            stackId="1"
            stroke={chartConfig.Solar.color}
            fill={chartConfig.Solar.color}
            strokeWidth={1}
            fillOpacity={1}
            animationDuration={3000}
          />

        </AreaChart>
      </ChartContainer>
    </div>
  );
}
