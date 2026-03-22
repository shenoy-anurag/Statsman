"use client";

import { useMemo } from "react";
import { CartesianGrid, Area, AreaChart, XAxis, YAxis } from "recharts";
import { generateEraGradient } from "@/components/PoliticalEraBackground";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { MergedDataPoint } from "@/lib/data-merger";
import { PoliticalEra } from "@/lib/political-data";
import { PaperTexture } from "@/components/PaperTexture";

interface IndicatorChartProps {
  data: MergedDataPoint[];
  countryCodes: string[];
  indicatorName: string;
  overlayEras?: string[]; // Optionally specify exactly which countries should overlay backgrounds
}

export function IndicatorChart({ data, countryCodes, indicatorName, overlayEras }: IndicatorChartProps) {
  const minYear = data.length > 0 ? data[0].year : 1900;
  const maxYear = data.length > 0 ? data[data.length - 1].year : 2025;
  const countriesToOverlay = overlayEras || (countryCodes.length === 1 ? countryCodes : []);
  // Dynamically create a configuration for shadcn chart based on selected countries
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    const colors = [
      "var(--color-chart-1)",
      "var(--color-chart-2)",
      "var(--color-chart-3)",
      "var(--color-chart-4)",
      "var(--color-chart-5)"
    ];
    countryCodes.forEach((code, i) => {
      config[code] = {
        label: code,
        color: colors[i % colors.length],
      };
    });
    return config;
  }, [countryCodes]);

  // We build a highly customized tooltip to expose the political rulers per country for a given year
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-none p-3 shadow-lg flex flex-col gap-3 min-w-[240px]">
          <PaperTexture />
          <p className="font-semibold text-foreground border-b pb-2 mb-1">{label}</p>
          {payload
            .filter((entry: any, index: number, self: any[]) => index === self.findIndex(t => t.dataKey === entry.dataKey))
            .map((entry: any, index: number) => {
              const countryCode = entry.dataKey;
              const era: PoliticalEra | undefined = entry.payload[`${countryCode}_era`];

              let value = entry.value;
              let dataSourceYear = label as number;
              let isMissing = false;

              if (value === null || value === undefined) {
                isMissing = true;
                if (era) {
                  // Find all valid data points for this country within the same political era
                  const validPointsInEra = data.filter(d => {
                    const dEra = d[`${countryCode}_era`] as PoliticalEra | undefined;
                    return dEra && dEra.leader === era.leader && d[countryCode] !== null && d[countryCode] !== undefined;
                  });

                  if (validPointsInEra.length > 0) {
                    // Fall back to the closest available data point in this era
                    const closest = validPointsInEra.reduce((prev, curr) =>
                      Math.abs(curr.year - (label as number)) < Math.abs(prev.year - (label as number)) ? curr : prev
                    );
                    value = closest[countryCode];
                    dataSourceYear = closest.year;
                  }
                }
              }

              return (
                <div key={index} className="flex flex-col gap-1 border-l-4 pl-3 py-1" style={{ borderLeftColor: entry.color }}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium" style={{ color: entry.color }}>{countryCode}</span>
                      {isMissing && value !== null && value !== undefined && (
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          (Data from {dataSourceYear})
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-foreground">
                      {value !== null && value !== undefined
                        ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                        : "No Data"}
                    </span>
                  </div>
                  {era ? (
                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded-none mt-1 flex flex-col gap-0.5">
                      <span className="block font-medium text-foreground text-sm">{era.leader}</span>
                      <span className="block">{era.party}</span>
                      <div className="w-full h-1 mt-1 rounded-none opacity-70" style={{ backgroundColor: era.color }}></div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-none mt-1 border border-dashed">
                      Unknown Leader Data
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex-col flex items-start gap-4">
      {/* <h3 className="text-xl font-bold tracking-tight">{indicatorName}</h3> */}
      <div className="h-[500px] w-full bg-card rounded-none border p-4 relative overflow-hidden">
        <PaperTexture />
        <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
          <AreaChart accessibilityLayer data={data} margin={{ left: 16, right: 16, top: 16, bottom: 16 }}>
            <defs>
              {countryCodes.map(code =>
                generateEraGradient({
                  countryCode: code,
                  minYear,
                  maxYear,
                  opacity: countriesToOverlay.length > 1 ? 0.08 : 0.18,
                  enabled: countriesToOverlay.includes(code)
                })
              )}
            </defs>
            <CartesianGrid vertical={false} opacity={0.3} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              width={80}
              tickFormatter={(value) => {
                if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
                if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
                if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
                return value.toLocaleString();
              }}
            />
            <ChartTooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }} content={<CustomTooltipContent />} />

            {/* Continuous background areas with dashed interpolation linking data gaps */}
            {countryCodes.map((code) => (
              <Area
                key={`bg-${code}`}
                dataKey={code}
                type="monotone"
                connectNulls={true}
                fill={`url(#era-gradient-${code})`}
                stroke={`var(--color-${code})`}
                strokeWidth={3}
                strokeDasharray="6 8"
                fillOpacity={1}
                dot={false}
                activeDot={false}
              />
            ))}

            {/* Solid foreground lines overlapping and bounding only contiguous data points */}
            {countryCodes.map((code) => (
              <Area
                key={`fg-${code}`}
                dataKey={code}
                type="monotone"
                connectNulls={false}
                fill="transparent"
                stroke={`var(--color-${code})`}
                strokeWidth={3}
                fillOpacity={0}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
