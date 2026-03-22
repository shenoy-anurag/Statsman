import { IndicatorChart } from "@/components/IndicatorChart";
import { getMergedChartData } from "@/lib/data-merger";
import { INDICATORS_MAP, TOP_INDICATORS } from "@/constants/indicators";
import Link from "next/link";
import { PaperTexture } from "@/components/PaperTexture";

export default async function DashboardHome() {
  const countryCodes = ["IND", "CHN", "USA"];
  const startYear = 1976;
  const endYear = 2024;

  // Fetch data for all top indicators
  const chartsData = await Promise.all(
    TOP_INDICATORS.map(async (indicatorCode) => {
      const data = await getMergedChartData(indicatorCode, countryCodes, startYear, endYear);
      return {
        indicatorCode,
        config: INDICATORS_MAP[indicatorCode],
        data
      };
    })
  );

  const topChartCountries = ["IND"];
  const topChartCountryName = "India";
  const topChartIndicatorCode = "NY.GDP.MKTP.CD";
  const topChartIndicatorName = "GDP (current US$)";
  const topChartData = await getMergedChartData(topChartIndicatorCode, topChartCountries, startYear, endYear);

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 xl:p-16 w-full mx-auto flex flex-col gap-8 md:gap-12 transition-all">
      <div className="flex flex-col gap-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Global Macro Dashboard
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Comparing the top 10 socio-economic indicators between the world's most populous and influential countries. Click on any chart to explore other metrics, regions, and dates in detail.
        </p>
      </div>

      <Link
        key="main-chart"
        href={`/explore?indicator=${topChartIndicatorCode}&countries=${topChartCountries.join(",")}`}
      >
        <div className="w-full flex-col flex items-start gap-4">
          <h2 className="text-xl font-bold tracking-tight">{topChartIndicatorName} - {topChartCountryName}</h2>
          <IndicatorChart
            data={topChartData}
            countryCodes={topChartCountries}
            indicatorName={topChartIndicatorCode}
          />
        </div>
      </Link>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {chartsData.map((item, index) => {
          if (!item.config) return null;

          return (
            <Link
              key={item.indicatorCode}
              href={`/explore?indicator=${item.indicatorCode}&countries=${countryCodes.join(",")}`}
              className="group block"
            >
              <div
                className="bg-card/40 backdrop-blur-md rounded-none p-6 min-h-[400px] h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:bg-card/60 transition-all flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PaperTexture />
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {item.config.name}
                  </h2>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    Explore →
                  </span>
                </div>
                <div className="w-full flex-grow relative min-h-[300px]">
                  <IndicatorChart
                    data={item.data}
                    countryCodes={countryCodes}
                    indicatorName={item.config.name}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
