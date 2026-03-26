import { PowerGenerationChart } from "@/components/visualizations/PowerGenerationChart";
import { ChevronLeft, Info, ExternalLink, Calendar, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { PaperTexture } from "@/components/PaperTexture";

export default function GenerationPage() {
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
            India's Electricity Generation
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Exploring the actual energy produced (in Million Units) across different sources in India, tracking the historical growth and the shift toward renewable output.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 w-full">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md rounded-none p-8 min-h-[600px] border border-border/50 relative overflow-hidden flex flex-col">
            <PaperTexture />
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Generation Mix Transformation (1948–2026)</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 border border-border/50">
                <TrendingUp className="h-4 w-4" />
                Production Stats (MU)
              </div>
            </div>
            <div className="w-full flex-grow relative min-h-[550px]">
              <PowerGenerationChart />
            </div>
            <div className="mt-6 pt-6 border-t border-border/20 text-sm text-muted-foreground flex flex-col gap-2 leading-relaxed">
              <p>While "Capacity" measures the maximum potential output, "Generation" tracks the actual energy produced. This chart highlights the operational reality of India's grid—revealing how much of our daily energy consumption is met by fossil fuels versus renewables.</p>
              <div className="flex flex-col italic text-xs font-serif text-muted-foreground/70 mt-2">
                <span>Source: MNRE & CEA (Govt. of India)</span>
                <span>Dataset updated as of January 2026</span>
              </div>
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
                <h3 className="text-xl font-bold">Operational Context</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Unit of Measure</span>
                  <span className="font-medium text-foreground">Million Units (MU) / Gigawatt-hours (GWh)</span>
                </div>

                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Latest Snapshot</span>
                  </div>
                  <span className="font-medium text-foreground text-sm">FY 2025-26 (Up to Jan'26)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="https://iced.niti.gov.in/energy/electricity/generation/power-generation"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  India Climate & Energy Dashboard
                </Link>
                <Link
                  href="https://cea.nic.in/generation-report/?lang=en"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  CEA Generation Reports
                </Link>
              </div>
            </div>
          </section>

          <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-none text-sm leading-relaxed text-muted-foreground italic font-serif relative overflow-hidden">
            Tracking generation is critical for understanding the "Plant Load Factor" (PLF) and the real-world impact of intermittent renewable sources on the national power balance.
          </div>
        </div>
      </div>
    </main>
  );
}
