"use client";

import { useId, useMemo, useState, useEffect } from "react";
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
  startYear?: number;
  endYear?: number;
}

export function IndicatorChart({ data, countryCodes, indicatorName, overlayEras, startYear, endYear }: IndicatorChartProps) {
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

  // Use props if provided, otherwise derive from data
  const minYear = startYear ?? (data.length > 0 ? data[0].year : 1960);
  const maxYear = endYear ?? (data.length > 0 ? data[data.length - 1].year : 2025);
  const countriesToOverlay = overlayEras || (countryCodes.length === 1 ? countryCodes : []);
  // Dynamically create a configuration for shadcn chart based on selected countries
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    // const colors = [
    //   "var(--color-chart-1)",
    //   "var(--color-chart-2)",
    //   "var(--color-chart-3)",
    //   "var(--color-chart-4)",
    //   "var(--color-chart-5)"
    // ];
    // const colors = [
    //   "var(--color-blue-slate-700)",
    //   "var(--color-golden-bronze-400)",
    //   "var(--color-pale-oak-300)",
    //   "var(--color-dusty-olive-700)",
    //   "var(--color-cinnamon-wood-500)",
    //   "var(--color-dark-khaki-800)",
    //   "var(--color-reddish-brown-600)",
    //   "var(--color-steel-blue-400)",
    // ];
    const colors = [
      "var(--color-blue-slate-2-600)",
      "var(--color-strawberry-red-400)",
      "var(--color-dark-cyan-600)",
      "var(--color-cerulean-600)",
      "var(--color-carrot-orange-500)",
      "var(--color-coral-glow-400)",
      "var(--color-seagrass-500)",
      "var(--color-atomic-tangerine-400)",
      "var(--color-tuscan-sun-400)",
      "var(--color-willow-green-400)",
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
      const filteredPayload = payload.filter((entry: any, index: number, self: any[]) =>
        index === self.findIndex(t => t.dataKey === entry.dataKey)
      );

      const itemCount = filteredPayload.length;
      const isGrid = itemCount > 4;
      const gridCols = itemCount > 8 ? "grid-cols-3" : "grid-cols-2";
      let minWidth = "120px";
      if (!isSmallScreen) {
        if (isGrid) {
          if (itemCount > 8) { minWidth = "700px"; }
          else { minWidth = "500px"; }
        }
        else { minWidth = "240px"; }
      }
      else {
        if (isGrid) {
          if (itemCount > 8) { minWidth = "360px"; }
          else { minWidth = "240px"; }
        }
        else { minWidth = "120px"; }
      }

      return (
        <div className={`bg-background border rounded-none p-3 shadow-lg flex flex-col md:gap-3 max-w-[calc(100vw-32px)] min-w-[${minWidth}]`}>
          <PaperTexture />
          <p className="font-semibold text-foreground border-b pb-2 mb-1">{label}</p>
          <div className={isGrid ? `grid ${gridCols} gap-x-2 gap-y-1 md:gap-x-6 md:gap-y-4` : "flex flex-col gap-1 md:gap-3"}>
            {filteredPayload.map((entry: any, index: number) => {
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

              let formattedValue = "No Data";
              if (value !== null && value !== undefined) {
                const absValue = Math.abs(value);
                const sign = value < 0 ? '-' : '';
                formattedValue = value.toLocaleString(undefined, { maximumFractionDigits: 2 });
                if (absValue >= 1e12) formattedValue = sign + (absValue / 1e12).toFixed(3) + 'T';
                else if (absValue >= 1e9) formattedValue = sign + (absValue / 1e9).toFixed(3) + 'B';
                else if (absValue >= 1e6) formattedValue = sign + (absValue / 1e6).toFixed(1) + 'M';
                else if (absValue >= 1e3) formattedValue = sign + (absValue / 1e3).toFixed(2) + 'K';
              }

              return (
                <div key={index} className="flex flex-col gap-1 border-l-4 pl-3 py-1" style={{ borderLeftColor: entry.color }}>
                  <div className="flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium" style={{ color: entry.color }}>{countryCode}</span>
                      {isMissing && value !== null && value !== undefined && (
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          (Data from {dataSourceYear})
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-foreground">
                      {formattedValue}
                    </span>
                  </div>
                  {era ? (
                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded-none mt-1 flex flex-col gap-0.5">
                      <span className="block font-medium text-foreground text-sm truncate" title={era.leader}>{era.leader}</span>
                      <span className="block truncate" title={era.party}>{era.party}</span>
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
        </div>
      );
    }
    return null;
  };

  const getGradientId = (code: string) => `era-gradient-${code}-${chartId.replace(/:/g, '')}`;

  return (
    <div className="w-full flex-col flex items-start gap-4">
      {/* <h3 className="text-xl font-bold tracking-tight">{indicatorName}</h3> */}
      <div className="h-[540px] w-full bg-card rounded-none md:border md:p-4 relative overflow-hidden">
        <PaperTexture />
        <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
          <AreaChart accessibilityLayer data={data} margin={{ left: 16, right: 16, top: 16, bottom: 16 }}>
            <defs>
              {countryCodes.map(code => {
                // Find the first and last valid years for this country's data points
                // This is crucial because standard SVG gradients map x1=0, x2=1 to the Area's bounding box.
                // If a country has missing data at start/end, its Area box is narrower than the chart width.
                const validDataPoints = data.filter(d => d[code] !== null && d[code] !== undefined);
                const firstYear = validDataPoints.length > 0 ? validDataPoints[0].year : minYear;
                const lastYear = validDataPoints.length > 0 ? validDataPoints[validDataPoints.length - 1].year : maxYear;

                return generateEraGradient({
                  countryCode: code,
                  id: getGradientId(code),
                  minYear: firstYear,
                  maxYear: lastYear,
                  opacity: countriesToOverlay.length > 1 ? 0.08 : 0.3,
                  enabled: countriesToOverlay.includes(code)
                });
              })}
            </defs>
            <CartesianGrid vertical={false} opacity={0.3} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
              domain={[minYear, maxYear]}
              type="number"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={isSmallScreen ? 4 : 12}
              // allowDataOverflow={false}
              width={isSmallScreen ? 25 : 60}
              tickFormatter={(value) => {
                const fractionDigits = isSmallScreen ? 0 : 1;
                const absValue = Math.abs(value);
                const sign = value < 0 ? '-' : '';

                if (absValue >= 1e12) return sign + (absValue / 1e12).toFixed(fractionDigits) + 'T';
                if (absValue >= 1e9) return sign + (absValue / 1e9).toFixed(fractionDigits) + 'B';
                if (absValue >= 1e6) return sign + (absValue / 1e6).toFixed(fractionDigits) + 'M';
                if (absValue >= 1e3) return sign + (absValue / 1e3).toFixed(fractionDigits) + 'K';
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
                fill={`url(#${getGradientId(code)})`}
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
