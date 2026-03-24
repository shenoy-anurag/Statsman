"use client";

import { useId, useMemo, useState, useEffect } from "react";
import { Area, CartesianGrid, Line, ComposedChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { generateEraGradient } from "./PoliticalEraBackground";
import { getPoliticalEra, PoliticalEra } from "@/lib/political-data";
import { PaperTexture } from "./PaperTexture";
import railwayDataRaw from "@/data/india-railways-network-stats-1971-2024.json";

const chartConfig = {
  electrification: {
    label: "Electrification %",
    color: "var(--color-cerulean-600)",
  },
  erkm: {
    label: "Route Kilometers (Electrified)",
    color: "var(--color-blue-slate-2-600)",
  },
  trkm: {
    label: "Total Route Kilometers",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RailwayElectrificationChart() {
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
    return (railwayDataRaw as any[]).map(item => {
      const year = item.FY;
      const era = getPoliticalEra("IND", year);
      return {
        year,
        electrification: item["Electrification %"] * 100,
        erkm: item["RKM Electrified Cumulative"],
        trkm: item["Total Route Kms"],
        IND_era: era,
      };
    });
  }, []);

  const startYear = 1971;
  const endYear = 2024;
  const getGradientId = (code: string) => `era-gradient-${code}-${chartId.replace(/:/g, '')}`;

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const era: PoliticalEra | undefined = payload[0].payload.IND_era;
      const erkm = payload.find((p: any) => p.dataKey === "erkm")?.value;
      const trkm = payload.find((p: any) => p.dataKey === "trkm")?.value;
      const pct = payload.find((p: any) => p.dataKey === "electrification")?.value;

      return (
        <div className="bg-background border rounded-none p-3 shadow-lg flex flex-col gap-3 min-w-[240px]">
          <PaperTexture />
          <p className="font-semibold text-foreground border-b pb-2 mb-1">{label}</p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 border-l-4 pl-3 py-1" style={{ borderLeftColor: chartConfig.electrification.color }}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium" style={{ color: chartConfig.electrification.color }}>Electrification</span>
                <span className="font-semibold text-foreground">{pct?.toFixed(2)}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-l-4 pl-3 py-1" style={{ borderLeftColor: chartConfig.erkm.color }}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium" style={{ color: chartConfig.erkm.color }}>Total Electrified Route Kms</span>
                <span className="font-semibold text-foreground">{erkm?.toLocaleString()} km</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-l-4 pl-3 py-1" style={{ borderLeftColor: chartConfig.trkm.color }}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium" style={{ color: chartConfig.trkm.color }}>Total Route Kms</span>
                <span className="font-semibold text-foreground">{trkm?.toLocaleString()} km</span>
              </div>
            </div>

            {era ? (
              <div className="text-xs text-muted-foreground bg-muted p-2 rounded-none mt-1 flex flex-col gap-0.5">
                <span className="block font-medium text-foreground text-sm truncate">{era.leader}</span>
                <span className="block truncate">{era.party}</span>
                <div className="w-full h-1 mt-1 rounded-none opacity-70" style={{ backgroundColor: era.color }}></div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-none mt-1 border border-dashed">
                Unknown Leader Data
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-card rounded-none md:border md:p-4">
      <PaperTexture />
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ComposedChart data={data} margin={{ left: 16, right: 16, top: 16, bottom: 16 }}>
          <defs>
            {generateEraGradient({
              countryCode: "IND",
              id: getGradientId("IND"),
              minYear: startYear,
              maxYear: endYear,
              opacity: 0.3,
              enabled: true
            })}
          </defs>
          <CartesianGrid vertical={false} opacity={0.3} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            minTickGap={32}
            domain={[startYear, endYear]}
            type="number"
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            width={40}
            orientation="left"
            tickFormatter={(value) => `${value}`}
            domain={[0, 'auto']}
            hide={isSmallScreen}
          />
          <YAxis
            yAxisId="right"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            width={40}
            orientation="right"
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            hide={isSmallScreen}
          />
          <ChartTooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }} content={<CustomTooltipContent />} />

          {/* Background Political Era Gradients applied via a dummy area */}
          <Area
            yAxisId="right"
            dataKey="electrification"
            type="monotone"
            fill={`url(#${getGradientId("IND")})`}
            stroke="transparent"
            strokeWidth={0}
            isAnimationActive={false}
          />

          <Area
            yAxisId="left"
            dataKey="erkm"
            type="monotone"
            stroke={chartConfig.erkm.color}
            strokeWidth={1}
            fill={chartConfig.erkm.color}
            fillOpacity={0.1}
            dot={false}
            isAnimationActive={true}
            animationDuration={1500}
          />
          <Line
            yAxisId="left"
            dataKey="trkm"
            type="monotone"
            stroke={chartConfig.trkm.color}
            strokeWidth={1}
            dot={false}
            animationDuration={1500}
          />

          <Line
            yAxisId="right"
            dataKey="electrification"
            type="monotone"
            stroke={chartConfig.electrification.color}
            strokeWidth={3}
            dot={false}
            animationDuration={2000}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
