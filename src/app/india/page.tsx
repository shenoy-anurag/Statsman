import { IndicatorChart } from "@/components/IndicatorChart";
import { getMergedChartData } from "@/lib/data-merger";
import { INDICATORS_MAP } from "@/constants/indicators";
import { RocketIcon, TrainIcon, SunIcon, ChartSplineIcon } from "lucide-react";
import SvgIcon from "@/components/icons/svg-icon";
import { PaperTexture } from "@/components/PaperTexture";

export default async function IndiaDashboard() {
  const countryCodes = ["IND"];
  const startYear = 1976;
  const endYear = 2024;

  const indiaIndicators = [
    "NY.GDP.MKTP.CD",      // GDP
    "NY.GDP.PCAP.CD",      // GDP per capita
    "SP.POP.TOTL",         // Population
    "EG.ELC.ACCS.ZS",      // Electricity access
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

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 xl:p-16 w-full mx-auto flex flex-col gap-8 md:gap-12 transition-all">
      <div className="flex flex-col gap-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-4">
          <SvgIcon className="h-12 w-12" icon={"IndiaFlag"} />
          India Dashboard
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A dedicated view for India's socio-economic metrics. I'll be curating more granular data including inflation rate, entrepreneurship data, renewable energy capacity, and railway electrification.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {chartsData.map((item, index) => {
          if (!item.config || !item.data || item.data.length === 0) return null;

          return (
            <div
              key={item.indicatorCode}
              className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:border-primary/50 hover:bg-card/60 transition-all flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PaperTexture />
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{item.config.name}</h2>
              </div>
              <div className="w-full flex-grow relative min-h-[300px]">
                <IndicatorChart
                  data={item.data}
                  countryCodes={countryCodes}
                  indicatorName={item.config.name}
                />
              </div>
            </div>
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
              <span className="font-medium">Inflation Rate & Price Indices</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><RocketIcon /></span>
              <span className="font-medium">Entrepreneurship Data</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><SunIcon /></span>
              <span className="font-medium">Renewable Energy Capacity</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 border border-border/50 p-4 rounded-none">
              <span className="text-2xl"><TrainIcon /></span>
              <span className="font-medium">Railway Electrification</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
