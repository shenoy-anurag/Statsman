import { IndicatorChart } from "@/components/IndicatorChart";
import { MergedDataPoint } from "@/lib/data-merger";
import { ChevronLeft, Info, ExternalLink, Calendar, Database } from "lucide-react";
import Link from "next/link";
import { PaperTexture } from "@/components/PaperTexture";
import startupDataRaw from "@/data/india-startup-yearwise-count.json";
import { getPoliticalEra } from "@/lib/political-data";
import { StartupData } from "@/lib/types";

export default function StartupPage() {
  const countryCodes = ["IND"];

  // Format Startup Data
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
      <div className="flex flex-col gap-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link
          href="/india"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group w-fit"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to India Dashboard
        </Link>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-4">
            Indian Startup Ecosystem
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Visualizing the growth of DPIIT recognized startups in India over the years.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 w-full">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md rounded-none p-8 min-h-[600px] border border-border/50 relative overflow-hidden flex flex-col">
            <PaperTexture />
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recognized Startups (Annual Count)</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 border border-border/50">
                <Database className="h-4 w-4" />
                DPIIT Dataset
              </div>
            </div>
            <div className="w-full flex-grow relative min-h-[450px]">
              <IndicatorChart
                data={formattedStartupData}
                countryCodes={countryCodes}
                indicatorName="Recognized Startups"
                startYear={2016}
                endYear={2025}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-border/20 text-sm text-muted-foreground flex flex-col gap-2">
              <p>This chart tracks the number of startups recognized by the Department for Promotion of Industry and Internal Trade (DPIIT) each year.</p>
              <p className="italic text-xs font-serif text-muted-foreground/70">Source: Open Government Data (OGD) Platform India</p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6">
          <section className="bg-muted/30 border border-muted/80 p-8 rounded-none relative overflow-hidden group">
            <PaperTexture />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Dataset Metadata</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Publisher</span>
                  <span className="font-medium text-foreground">DPIIT, Govt. of India</span>
                </div>

                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Last Updated</span>
                  </div>
                  <span className="font-medium text-foreground">February 18, 2025</span>
                </div>

                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Fields Included</span>
                  <span className="font-medium text-foreground italic">Industry, State, Year, Count</span>
                </div>
              </div>

              <Link
                href="https://www.data.gov.in/resource/industry-state-and-year-wise-startups-recognized-dpiit-till-last-week"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                View Original Dataset
              </Link>
            </div>
          </section>

          <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-none text-sm leading-relaxed text-muted-foreground italic font-serif relative overflow-hidden">
            {/* <div className="absolute top-0 right-0 p-2 opacity-10">
              <Database className="h-12 w-12" />
            </div> */}
            The Startup India initiative, launched in 2016, has catalyzed a massive surge in entrepreneurship. This dataset reflects the formalized growth of that ecosystem through DPIIT recognition.
          </div>
        </div>
      </div>
    </main>
  );
}
