"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IndicatorChart } from "@/components/IndicatorChart";
import { IndicatorConfig } from "@/constants/indicators";
import { PaperTexture } from "@/components/PaperTexture";
import { MergedDataPoint } from "@/lib/data-merger";

interface LazyChartCardProps {
  indicatorCode: string;
  config: IndicatorConfig;
  countryCodes: string[];
  startYear: number;
  endYear: number;
  animationDelay?: number;
}

function ChartSkeleton() {
  return (
    <div className="w-full flex-grow relative min-h-[300px] flex flex-col justify-end gap-3 p-4 overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 skeleton-shimmer" />

      {/* Fake Y-axis ticks */}
      <div className="absolute left-2 top-4 bottom-12 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-8 rounded-sm bg-muted-foreground/10" />
        ))}
      </div>

      {/* Fake area chart lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
        <path
          d="M 40 160 Q 80 140 120 120 T 200 80 T 280 100 T 360 40"
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.15)"
          strokeWidth="3"
          strokeDasharray="8 6"
        />
        <path
          d="M 40 170 Q 100 150 140 140 T 220 110 T 300 90 T 360 60"
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.10)"
          strokeWidth="3"
          strokeDasharray="8 6"
        />
      </svg>

      {/* Fake X-axis ticks */}
      <div className="absolute bottom-2 left-10 right-4 flex justify-between">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-3 w-8 rounded-sm bg-muted-foreground/10" />
        ))}
      </div>
    </div>
  );
}

export function LazyChartCard({
  indicatorCode,
  config,
  countryCodes,
  startYear,
  endYear,
  animationDelay = 0,
}: LazyChartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MergedDataPoint[] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fetchedRef = useRef(false);

  // Intersection Observer — trigger when card scrolls into view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // start fetching 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fetch data when visible
  useEffect(() => {
    if (!isVisible || fetchedRef.current) return;
    fetchedRef.current = true;

    const params = new URLSearchParams({
      indicator: indicatorCode,
      countries: countryCodes.join(","),
      startYear: String(startYear),
      endYear: String(endYear),
    });

    fetch(`/api/indicator?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setHasError(true));
  }, [isVisible, indicatorCode, countryCodes, startYear, endYear]);

  return (
    <Link
      href={`/explore?indicator=${indicatorCode}&countries=${countryCodes.join(",")}`}
      className="group block"
    >
      <div
        ref={cardRef}
        className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col border border-transparent"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <PaperTexture />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {config.shortName}
          </h2>
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
            Explore →
          </span>
        </div>

        {hasError ? (
          <div className="w-full flex-grow relative min-h-[300px] flex items-center justify-center text-muted-foreground text-sm">
            Failed to load chart data.
          </div>
        ) : data ? (
          <div className="w-full flex-grow relative min-h-[300px]">
            <IndicatorChart
              data={data}
              countryCodes={countryCodes}
              indicatorName={config.name}
              startYear={startYear}
              endYear={endYear}
            />
          </div>
        ) : (
          <ChartSkeleton />
        )}
      </div>
    </Link>
  );
}
