"use client";

import { getPoliticalErasForCountry } from "@/lib/political-data";
import React from "react";

export interface EraGradientProps {
  countryCode: string;
  minYear: number;
  maxYear: number;
  opacity?: number;
  enabled?: boolean;
}

/**
 * Generates an SVG `<linearGradient>` with hard stops corresponding exactly to 
 * the political eras within the X-axis bounds. This is used as an Area fill in Recharts.
 */
export function generateEraGradient({ countryCode, minYear, maxYear, opacity = 0.2, enabled = true }: EraGradientProps) {
  const defaultGradient = (
    <linearGradient id={`era-gradient-${countryCode}`} x1="0" y1="0" x2="0" y2="1" key={`era-gradient-${countryCode}`}>
      <stop offset="5%" stopColor="transparent" stopOpacity={0}/>
      <stop offset="95%" stopColor="transparent" stopOpacity={0}/>
    </linearGradient>
  );

  if (!enabled) return defaultGradient;

  const eras = getPoliticalErasForCountry(countryCode);
  const range = maxYear - minYear;
  
  if (!eras || eras.length === 0 || range <= 0) return defaultGradient;

  // Pre-calculate party streaks globally so shading remains stable during scrolling bounds
  let runningParty = "";
  let runningStreak = 0;
  const processedEras = eras.map((era) => {
    if (era.party === runningParty) {
      runningStreak++;
    } else {
      runningParty = era.party;
      runningStreak = 0;
    }
    return { ...era, streak: runningStreak };
  });

  // Filter and sort eras strictly within our timeline
  const activeEras = processedEras
    .filter(e => e.end > minYear && e.start < maxYear)
    .sort((a, b) => a.start - b.start);

  if (activeEras.length === 0) return defaultGradient;

  const stops: React.ReactNode[] = [];
  let currentYear = minYear;
  let keyCounter = 0;

  const addBlock = (start: number, end: number, color: string, blockOpacity: number) => {
    const startPct = Math.max(0, (start - minYear) / range);
    const endPct = Math.min(1, (end - minYear) / range);
    
    // Hard boundary start and end strictly mapping to exact percentages on the chart path width
    stops.push(
      <stop key={`stop-${keyCounter++}`} offset={`${(startPct * 100).toFixed(3)}%`} stopColor={color} stopOpacity={blockOpacity} />,
      <stop key={`stop-${keyCounter++}`} offset={`${(endPct * 100).toFixed(3)}%`} stopColor={color} stopOpacity={blockOpacity} />
    );
  };

  activeEras.forEach((era) => {
    const eraStart = Math.max(minYear, era.start);
    const eraEnd = Math.min(maxYear, era.end);

    // If there is a gap before this era begins, fill it with transparent stop
    if (eraStart > currentYear) {
      addBlock(currentYear, eraStart, "transparent", 0);
    }

    // Alternate the opacity to create distinct shades within the same party regime
    const shadeOpacity = era.streak % 2 === 0 ? opacity : opacity * 0.4;

    addBlock(eraStart, eraEnd, era.color, shadeOpacity);
    currentYear = eraEnd;
  });

  // Gap after the last era
  if (currentYear < maxYear) {
    addBlock(currentYear, maxYear, "transparent", 0);
  }

  // Using horizontal gradient spanning exactly the bounding box width of the `<Area>` path map
  return (
    <linearGradient id={`era-gradient-${countryCode}`} x1="0" y1="0" x2="1" y2="0" key={`era-gradient-${countryCode}`}>
      {stops}
    </linearGradient>
  );
}
