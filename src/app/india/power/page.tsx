import { PowerCapacityChart } from "@/components/PowerCapacityChart";
import { ChevronLeft, Info, ExternalLink, Calendar, Zap } from "lucide-react";
import Link from "next/link";
import { PaperTexture } from "@/components/PaperTexture";

export default function PowerPage() {
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
            India's Power Installed Capacity
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A comprehensive look at the evolution of India's electricity generation installed capacity mix from 1948 to the projected goals of 2026.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 w-full">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md rounded-none p-8 min-h-[600px] border border-border/50 relative overflow-hidden flex flex-col">
            <PaperTexture />
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Energy Mix Transformation (1948–2026)</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 border border-border/50">
                <Zap className="h-4 w-4" />
                Capacity Stats (MW)
              </div>
            </div>
            <div className="w-full flex-grow relative min-h-[450px]">
              <PowerCapacityChart />
            </div>
            <div className="mt-6 pt-6 border-t border-border/20 text-sm text-muted-foreground flex flex-col gap-2">
              <p>This stacked area chart illustrates the rapid transition in India's power sector. While coal remains a significant baseline, the exponential growth in Solar and Wind capacity over the last decade highlights the nation's pivot towards renewable energy sources.</p>
              <div className="flex flex-col italic text-xs font-serif text-muted-foreground/70">
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
                <h3 className="text-xl font-bold">Data Insights</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Reporting Body</span>
                  <span className="font-medium text-foreground">Central Electricity Authority (CEA)</span>
                </div>

                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Live Monitoring</span>
                  </div>
                  <span className="font-medium text-foreground text-sm">Targeting 500 GW Non-Fossil by 2030</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="https://iced.niti.gov.in/energy/electricity/generation/capacity"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  India Climate & Energy Dashboard
                </Link>
                <Link
                  href="https://cea.nic.in/installed-capacity-report/?lang=en"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  CEA Latest Monthly Report
                </Link>
              </div>
            </div>
          </section>

          <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-none text-sm leading-relaxed text-muted-foreground italic font-serif relative overflow-hidden">
            The growth in renewable energy capacity represents one of the most ambitious sustainability projects in global history, reflecting a shift from a fossil-reliant past to a decentralized, green future.
          </div>
        </div>
      </div>
    </main>
  );
}
