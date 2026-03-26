export const metadata = {
  title: "About | Statsman",
  description: "Learn more about the Statsman application and its goals.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 text-left w-full h-full my-auto py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Statsman</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground text-lg leading-relaxed">
          <p>
            <strong>Statsman</strong> is an interactive analytical tool designed to bridge the gap between abstract socio-economic statistics and tangible historical contexts.
          </p>
          <p>
            By overlaying social, economic, environmental and other indicators from curated datasets directly onto the political eras of ruling leaders and parties, Statsman enables users to visualize the real-world impact of different governments, regimes, and policy eras across India, China, the United States, and other major nations.
          </p>
        </div>
      </div>
    </main>
  );
}
