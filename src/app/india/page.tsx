import Link from "next/link";
import { IndicatorChart } from "@/components/IndicatorChart";
import { RailwayElectrificationChart } from "@/components/visualizations/RailwayElectrificationChart";
import { PowerCapacityChart } from "@/components/visualizations/PowerCapacityChart";
import { PowerGenerationChart } from "@/components/visualizations/PowerGenerationChart";

import { getMergedChartData, MergedDataPoint } from "@/lib/data-merger";
import { INDICATORS_MAP } from "@/constants/indicators";
import { ChartSplineIcon, ArrowUpRight, BeakerIcon, UniversityIcon, MapPin } from "lucide-react";
import SvgIcon from "@/components/icons/svg-icon";
import { PaperTexture } from "@/components/PaperTexture";
import { getPoliticalEra } from "@/lib/political-data";
import { StartupData } from "@/lib/types";
import startupDataRaw from "@/data/india-startup-yearwise-count.json";

export default async function IndiaDashboard() {
  const countryCodes = ["IND"];
  const startYear = 1976;
  const endYear = 2024;

  const indiaIndicators = [
    "NY.GDP.MKTP.CD",      // GDP
    "NY.GDP.PCAP.CD",      // GDP per capita
    "FP.CPI.TOTL.ZG",      // Inflation, CPI
    "SP.POP.TOTL",         // Population
    "EG.ELC.ACCS.ZS",      // Electricity access
    "PV.TER.DTHS",         // Terrorism Deaths
  ];


  const chartsData = await Promise.all(
    indiaIndicators.map(async (indicatorCode) => {
      const data = await getMergedChartData(indicatorCode, countryCodes, startYear, endYear);
      return {
        indicatorCode,
        config: INDICATORS_MAP[indicatorCode] || { name: indicatorCode },
        data
      };
    })
  );

  // Process Startup Data
  const formattedStartupData: MergedDataPoint[] = (startupDataRaw as StartupData[]).map(item => {
    const year = item.Year;
    const era = getPoliticalEra("IND", year);
    const point: MergedDataPoint = {
      year,
      "IND": item.Count
    };
    if (era) {
      point["IND_era"] = era;
    }
    return point;
  });

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 xl:p-16 w-full mx-auto flex flex-col gap-8 md:gap-12 transition-all">
      <div className="flex flex-col gap-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-4">
          <SvgIcon className="h-12 w-12" icon={"IndiaFlag"} />
          India Dashboard
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A dedicated view for India&apos;s socio-economic metrics. I am curating granular data including industrial growth, railway electrification, and renewable energy capacity.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Special Startup Chart - Self-managed bounds */}
        <Link
          href="/india/startups"
          className="flex flex-col h-full group/link"
        >
          <div
            className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
          >
            <PaperTexture />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">Recognized Startups (DPIIT)</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
            </div>
            <div className="w-full flex-grow relative min-h-[300px]">
              <IndicatorChart
                data={formattedStartupData}
                countryCodes={countryCodes}
                indicatorName="Recognized Startups (DPIIT)"
                startYear={2016}
                endYear={2025}
              />
            </div>
          </div>
        </Link>

        {/* Specialized Railway Electrification Chart */}
        <Link
          href="/india/railways"
          className="flex flex-col h-full group/link"
        >
          <div
            className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
            style={{ animationDelay: "100ms" }}
          >
            <PaperTexture />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">Railway Electrification</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
            </div>
            <div className="w-full flex-grow relative min-h-[300px]">
              <RailwayElectrificationChart />
            </div>
          </div>
        </Link>

        {/* Specialized Power Installed Capacity Chart */}
        <Link
          href="/india/power"
          className="flex flex-col h-full group/link"
        >
          <div
            className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
            style={{ animationDelay: "200ms" }}
          >
            <PaperTexture />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">Power Installed Capacity</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
            </div>
            <div className="w-full flex-grow relative min-h-[450px]">
              <PowerCapacityChart />
            </div>
          </div>
        </Link>

        {/* Specialized Power Generation Chart */}
        <Link
          href="/india/generation"
          className="flex flex-col h-full group/link"
        >
          <div
            className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
            style={{ animationDelay: "300ms" }}
          >
            <PaperTexture />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">Power Generation (Production)</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
            </div>
            <div className="w-full flex-grow relative min-h-[450px]">
              <PowerGenerationChart />
            </div>
          </div>
        </Link>

        {/* New Geographic Mapping Section */}
        <Link
          href="/india/map"
          className="flex flex-col h-full group/link"
        >
          <div
            className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
            style={{ animationDelay: "400ms" }}
          >
            <PaperTexture />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">Regional Distribution (GeoJSON Map)</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
            </div>
            <div className="w-full flex-grow relative min-h-[450px] flex items-center justify-center bg-muted/20 border border-dashed border-border/50">
              <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                <MapPin className="h-12 w-12" />
                <span className="font-serif italic">GeoJSON Visualization</span>
              </div>
            </div>
          </div>
        </Link>


        {/* Standard World Bank + Custom Indicators */}
        {chartsData.map((item, index) => {
          if (!item.config || !item.data || item.data.length === 0) return null;

          return (
            <Link
              key={item.indicatorCode}
              href={`/explore?indicator=${item.indicatorCode}&countries=IND`}
              className="flex flex-col h-full group/link"
            >
              <div
                className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col group/chart overflow-hidden relative border border-transparent"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <PaperTexture />
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold group-hover/link:text-primary transition-colors tracking-tight">{item.config.shortName}</h2>
                  <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/chart:opacity-100 group-hover/chart:translate-x-1 group-hover/chart:-translate-y-1 transition-all text-primary" />
                </div>
                <div className="w-full flex-grow relative min-h-[300px]">
                  <IndicatorChart
                    data={item.data}
                    countryCodes={countryCodes}
                    indicatorName={item.config.name}
                    startYear={startYear}
                    endYear={endYear}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Upcoming Data Section */}
      <section className="bg-muted/30 border border-muted/80 hover:border-primary/10 p-8 rounded-none flex flex-col items-start gap-4 animate-in fade-in duration-700 delay-300 fill-mode-both relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 w-full">
          <h3 className="text-xl font-bold mb-2">Upcoming Data Series</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I am currently curating datasets for specialized metrics:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><ChartSplineIcon /></span>
              <span className="font-medium">FDI Net Inflows, especially Manufacturing</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><BeakerIcon /></span>
              <span className="font-medium">Patent Filing & Indicators relating to R&D</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><ChartSplineIcon /></span>
              <span className="font-medium">Break-up of the GDP in terms of Manufacturing, Services and Agriculture</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><UniversityIcon /></span>
              <span className="font-medium">New Institutes Built (AIIMS, IITs, IIMs, etc.)</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
