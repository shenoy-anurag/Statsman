"use client";

import { useEffect, useState } from "react";
import { IndicatorChart } from "@/components/IndicatorChart";
import { getMergedChartData, MergedDataPoint } from "@/lib/data-merger";

interface TerrorismAttacksChartProps {
  countryCodes?: string[];
  startYear?: number;
  endYear?: number;
}

export function TerrorismAttacksChart({
  countryCodes = ["IND", "USA", "CHN"],
  startYear = 1970,
  endYear = 2021
}: TerrorismAttacksChartProps) {
  const [data, setData] = useState<MergedDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const chartData = await getMergedChartData("PV.TER.INCD", countryCodes, startYear, endYear);
      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, [countryCodes, startYear, endYear]);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center min-h-[300px] text-muted-foreground animate-pulse">Loading Terrorist Attacks Data...</div>;
  }

  return (
    <IndicatorChart
      data={data}
      countryCodes={countryCodes}
      indicatorName="Terrorist Attacks"
      startYear={startYear}
      endYear={endYear}
    />
  );
}
