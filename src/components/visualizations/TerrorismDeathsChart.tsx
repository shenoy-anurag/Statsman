"use client";

import { useEffect, useState } from "react";
import { IndicatorChart } from "@/components/IndicatorChart";
import { getMergedChartData, MergedDataPoint } from "@/lib/data-merger";

interface TerrorismDeathsChartProps {
  countryCodes?: string[];
  startYear?: number;
  endYear?: number;
}

export function TerrorismDeathsChart({
  countryCodes = ["IND", "USA", "CHN"],
  startYear = 1970,
  endYear = 2021
}: TerrorismDeathsChartProps) {
  const [data, setData] = useState<MergedDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const chartData = await getMergedChartData("PV.TER.DTHS", countryCodes, startYear, endYear);
      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, [countryCodes, startYear, endYear]);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center min-h-[300px] text-muted-foreground animate-pulse">Loading Terrorism Deaths Data...</div>;
  }

  return (
    <IndicatorChart
      data={data}
      countryCodes={countryCodes}
      indicatorName="Terrorism Deaths"
      startYear={startYear}
      endYear={endYear}
    />
  );
}
