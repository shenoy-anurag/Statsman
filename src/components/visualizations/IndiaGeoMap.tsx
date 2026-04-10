"use client";

import {
  type ChartData,
  type GeoFeature,
  type TopoTopology,
  getTopoFeature,
  getStates
} from 'india-geo-charts';
import topoJsonIndia from '@/data/india.topo.json';
import { IndiaMap } from "india-geo-charts/react";

interface IndiaGeoMapProps {
  data?: Record<string, number>;
  title?: string;
  subtitle?: string;
  source?: string;
}

export function IndiaGeoMap({
  data = {},
  title = "",
  subtitle = "",
  source = ""
}: IndiaGeoMapProps) {
  const topoIndia = topoJsonIndia as unknown as TopoTopology;
  const states = getStates(topoIndia);
  const nation: GeoFeature = getTopoFeature(topoIndia, 'states') as GeoFeature;

  const chartData: ChartData = {
    labels: states.map(f => (f.properties.name as string) || 'Unknown'),
    datasets: [{
      label: 'Indian States',
      outline: nation as GeoFeature,
      showOutline: true,
      data: states.map(f => {
        return {
          feature: f as GeoFeature,
          value: data[f.properties.name as string]
        };
      })
    }]
  };

  // useEffect(() => {
  // }, [data]);

  if (!topoIndia || !data) return <div>Loading chart…</div>;

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-muted/20 border border-dashed border-border/50 relative">
      <IndiaMap
        topoJson={topoIndia}
        data={chartData}
        chartType="choropleth"
        width={900}
        height={700}
        title={title}
        subtitle={subtitle}
        source={source}
        legend={{ position: "top-right" }}
      />
    </div>
  );
}
