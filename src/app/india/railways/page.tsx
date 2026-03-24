import { RailwayElectrificationChart } from "@/components/RailwayElectrificationChart";
import { ChevronLeft, Info, ExternalLink, Calendar, Database, Train } from "lucide-react";
import Link from "next/link";
import { PaperTexture } from "@/components/PaperTexture";

export default function RailwayPage() {
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
            Indian Railway Electrification
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Visualizing the transformation of the Indian Railways network through large-scale electrification initiatives over the decades.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 w-full">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md rounded-none p-8 min-h-[600px] border border-border/50 relative overflow-hidden flex flex-col">
            <PaperTexture />
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Electrification Progress (1971–2024)</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 border border-border/50">
                <Train className="h-4 w-4" />
                Railway Stats
              </div>
            </div>
            <div className="w-full flex-grow relative min-h-[450px]">
              <RailwayElectrificationChart />
            </div>
            <div className="mt-6 pt-6 border-t border-border/20 text-sm text-muted-foreground flex flex-col gap-2">
              <p>This chart tracks the percentage of the Indian Railways network that is electrified, alongside the cumulative electrified Route Kilometres (RKM) in the background area. The total route kilometers (electrified + not electrified) is shown in the background for context.</p>
              <p className="italic text-xs font-serif text-muted-foreground/70">Source: Ministry of Railways (Govt. of India) / Indian Railways Statistical Year Books</p>
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
                  <span className="font-medium text-foreground">Ministry of Railways, Govt. of India</span>
                </div>

                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Last Updated</span>
                  </div>
                  <span className="font-medium text-foreground">January 31, 2026</span>
                </div>
                {/* 
                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4 py-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Key Fields</span>
                  <span className="font-medium text-foreground italic">FY, RKM Electrified, Total Route Kms, Electrification %</span>
                </div> */}
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="https://indianrailways.gov.in/railwayboard/uploads/directorate/ele_engg/2026/Status%20of%20Railway%20Electrification%20(as%20on%2031_01_2026)%20(1).pdf"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Status Report (2026)
                </Link>
                <Link
                  href="https://www.data.gov.in/resource/electrified-route-kilometres-upto-2013-14"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary py-3 transition-all border border-primary/20 font-semibold text-center leading-tight text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Electrified Route Kms (upto 2013-14)
                </Link>
                <Link
                  href="https://www.energymonitor.ai/tech/electrification/how-india-made-45-of-its-railway-network-electric-in-just-five-years/?cf-view"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary/5 hover:bg-primary/10 text-muted-foreground py-2 transition-all border border-border/50 text-xs text-center"
                >
                  <ExternalLink className="h-3 w-3" />
                  Energy Monitor Report
                </Link>
              </div>
            </div>
          </section>

          <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-none text-sm leading-relaxed text-muted-foreground italic font-serif relative overflow-hidden">
            The mission to achieve 100% electrification of the Broad Gauge network is one of the largest green transformations in the world, significantly reducing the carbon footprint of the nation's transportation backbone.
          </div>
        </div>
      </div>
    </main>
  );
}
