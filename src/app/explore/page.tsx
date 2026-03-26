import { IndicatorChart } from "@/components/IndicatorChart";
import { Controls } from "@/components/Controls";
import { getMergedChartData } from "@/lib/data-merger";
import { INDICATORS_MAP } from "@/constants/indicators";
import { trackView } from "@/lib/analytics";
import { TrendingComparisons } from "@/components/Trending";
import { PaperTexture } from "@/components/PaperTexture";

// Next.js 15: searchParams is a Promise for Server Components
export default async function Home(props: { searchParams: Promise<{ indicator?: string, countries?: string, start?: string, end?: string }> }) {
  const searchParams = await props.searchParams;

  // Parse parameters
  const indicatorCode = searchParams.indicator || "SP.POP.TOTL"; // Default: Population
  const countriesParam = searchParams.countries || "IND,CHN,USA";
  const startYear = parseInt(searchParams.start || "1976", 10);
  const endYear = parseInt(searchParams.end || "2024", 10);

  const countryCodes = countriesParam.split(",").filter(Boolean);

  const data = await getMergedChartData(indicatorCode, countryCodes, startYear, endYear);
  const indicatorConfig = INDICATORS_MAP[indicatorCode];

  // Track the view asynchronously
  if (countryCodes.length > 0) {
    trackView(indicatorCode, countriesParam);
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 xl:p-16 w-full mx-auto flex flex-col gap-8 md:gap-12 transition-all">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-8 flex flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-none p-5">
            <Controls
              initialIndicator={indicatorCode}
              initialCountries={countriesParam}
              initialStart={startYear}
              initialEnd={endYear}
            />
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-none p-5 mt-0 lg:mt-6 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
            <TrendingComparisons />
          </div>
        </aside>

        <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6 w-full min-w-0">
          <div className="bg-card/40 backdrop-blur-md md:border md:border-border/50 rounded-none md:p-6 min-h-[500px] animate-in fade-in slide-in-from-right-8 duration-500 delay-150 fill-mode-both w-full overflow-hidden">
            <PaperTexture />
            <h3 className="text-xl font-bold tracking-tight p-2 md:p-0 mb-4">{indicatorConfig?.name || indicatorCode}</h3>
            <h4 className="text-md font-regular text-muted-foreground tracking-tight p-2 md:p-0 mb-4">{indicatorConfig?.subtitle || ""}</h4>
            {countryCodes.length > 0 ? (
              <IndicatorChart
                data={data}
                countryCodes={countryCodes}
                indicatorName={indicatorConfig?.name || indicatorCode}
                startYear={startYear}
                endYear={endYear}
              />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center text-muted-foreground font-medium">
                Select at least one country to compare.
              </div>
            )}
          </div>

          {indicatorConfig?.caveat && (
            <div className="p-6 bg-muted/30 border border-muted/60 rounded-none text-sm text-muted-foreground flex flex-col gap-2">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed relative z-10">
                <strong className="text-foreground">Analytical Context:</strong> {indicatorConfig.caveat}
              </p>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-xs text-muted-foreground/50 leading-tight">
                  <span className="font-semibold tracking-tighter opacity-70 mr-1">Source:</span>
                  {indicatorConfig.citation.short}
                </p>
                <p className="italic text-xs text-muted-foreground/70 opacity-80">
                  <a href={indicatorConfig.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-dotted underline-offset-2">{indicatorConfig.source.text}</a>
                </p>
              </div>
            </div>
          )}

          {/* {countryCodes.includes("CHN") && (
            <div className="bg-muted/30 border border-muted/60 p-5 rounded-none flex items-start gap-4 animate-in fade-in duration-700 delay-500 fill-mode-both relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-2xl mt-0.5 relative z-10">🇨🇳</span>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed relative z-10">
                <strong className="text-foreground">China Dataset Note:</strong> Visualizations covering China automatically enforce comparative bounds including <strong>Macao SAR</strong> and <strong>Hong Kong SAR</strong> to capture the complete regional economic footprint as configured.
              </p>
            </div>
          )} */}
        </section>
      </div>
    </main>
  );
}
