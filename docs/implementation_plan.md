# Goal Description
Create a highly interactive and stunning web application to visualize economic and social metrics across countries, overlaid with political leadership and party data. Users will be able to easily track and compare national performance during specific political eras.

## Proposed Architecture & Tech Stack

### Core Framework
- **Next.js (App Router)**: Perfect for handling dynamic routing, SEO, and API route caching. We can heavily utilize Server Components.
- **TypeScript**: Essential for ensuring type safety.
- **Styling**: Tailwind CSS + standard CSS for bespoke premium animations.

### UI & Visualizations
- **Shadcn UI**: Beautiful, accessible, and customizable base components.
- **State Management (URLs)**: Standard Next.js `useSearchParams` combined with `nuqs` for type-safe URL query parameters.
- **Charts**: **Shadcn Charts (Recharts)** is a great starting point for multi-line charts. 
- **Animations**: **Framer Motion** for smooth layout transitions and interactive micro-animations.

### Data Strategy
1. **Indicator Data Dual-Strategy**: We will offer two modes for World Bank data:
   - **Offline Dataset**: A local JSON dataset copy that is updated once a year. This guarantees extremely fast visualization rendering.
   - **REST API Fallback**: The ability to query the World Bank API directly for the freshest data if needed.
2. **Contextual Caveats**: A local configuration map linking World Bank Indicator IDs to short contextual sentences/caveats.
3. **Political Data**: A JSON dataset compiled from Wikidata sources, complete with references. This will map country -> year ranges -> leader name/party color.

### Phase Breakdown

#### Phase 1: Foundation & Data Integration
- Set up Next.js, TypeScript, and Shadcn UI.
- Build the dual data client (Offline JSON + World Bank API).
- Build URL state synchronization.

#### Phase 2: Visualization Construction
- Render multi-line charts comparing dynamic countries and indicators.
- Develop the political leadership timeline overlays (shading plot areas based on Wikidata JSON).
- Implement the contextual caveat system.

#### Phase 3: Analytics & Trending Frontpage
- Set up the database to record anonymous searches and chart views.
- Create the trending algorithm to surface popular indicators on the landing page.

#### Phase 4: Global UI Components
- Develop a global navigation bar with branding, GitHub repository link, and support link.
- Develop a global site footer with copyright, About page, and relevant source links.

#### Phase 5: Data Expansion & Refinement
- Curated and integrated expanded political leadership datasets (from roughly post-WWII onwards) for the UK, Germany, Japan, France, Italy, Russia, Canada, Australia, Bangladesh, and Pakistan.
- Addressed TypeScript interfaces (e.g., `IndicatorConfig` `type` fields) ensuring all items correctly flag whether they are absolute figures or percentages.
- Dropped irrelevant localized regions to simplify user visualizations (e.g., Hong Kong, Macao).

#### Phase 6: Homepage Redesign & Dashboard
- Move the core interactive data exploration tool to a dedicated `/explore` route.
- Create a new root dashboard (`/`) displaying a 5x2 grid of the 10 most critical indicators for major structural economies (India, China, USA).
- Wrap each mini-chart in a smooth programmatic link to seamlessly transition into the interactive `/explore` view.

#### Phase 7: Localization & Custom Dashboards
- Create a dedicated dashboard `/india` that focuses entirely on India's specific structural and economic metrics.
- Build a curated list of upcoming indicators (Inflation, Entrepreneurship, Renewable Energy, Railway Electrification).
- Implement custom SVG component system for icons (e.g., India Flag, GitHub, Buy Me a Coffee) to replace external dependencies or generic icons in the global Navigation Bar.
- Integrated curated Indian Startup data (DPIIT) with a dedicated detail page (`/india/startups`) and summary chart on the India Dashboard.

#### Phase 8: Polish & Refinement
- Fixed tooltip data formatting issues in `IndicatorChart.tsx`, resolving variable scope errors and fine-tuning numeric precision for trillion (T), billion (B), million (M), and thousand (K) scales to improve readability across different economic metrics.
- Added a separator in the navbar to visually distinguish between the logo and dashboards.
- Curated a new color palette for the visualizations.
- Implemented a collapsible navbar for mobile devices with smaller screens.
- Enhanced chart interactivity across all dashboards with clickable cards, linking World Bank indicators to the `/explore` view and custom series to their detail pages.
- Implemented visual feedback on charts, including borders upon hover and animated exploration arrows (`ArrowUpRight`).
- Fixed a critical political era alignment bug by implementing per-country data bounding and explicit `startYear`/`endYear` props for `IndicatorChart`, ensuring gradients map correctly to the active timeline.
- Refined typography by introducing `Libre Baskerville` as a semantic serif face (`--font-serif`) and removing unused mono font variants to streamline the design system.

#### Phase 9: Expanded Indicators & Categories

- Added 28 new World Bank indicators to `src/constants/indicators.ts`, organized into 7 thematic categories:
  1. **Macroeconomic Stability & Investment** (5 indicators): Inflation, Capital Formation (% GDP & US$), Fixed Capital Growth, Current Account Balance.
  2. **Financial System Health** (3 indicators): Bank Capital Ratio, NPL Ratio, Lending Rate.
  3. **Economic Structure & Industrialization** (3 indicators): Agriculture Growth, Manufacturing (% GDP), Services (% GDP).
  4. **Trade, Innovation & Competitiveness** (4 indicators): Export Growth, Import Duties, Resident Patents, R&D Spending.
  5. **Social Equity & Human Capital** (4 indicators): Gini Index, Youth LFP (Female/Male), Undernourishment.
  6. **Infrastructure & Environment** (6 indicators): Clean Cooking Access, Water Access, Grid Losses, Forest Cover, CO₂ Emissions, Carbon Intensity.
  7. **Demographics & Dependency Burden** (3 indicators): Total/Old/Young Dependency Ratios.
- Exported `IndicatorCategory` interface and `INDICATOR_CATEGORIES` constant grouping indicator codes with titles and descriptions.
- Rendered all categorized sections below the top-10 hero grid on the main dashboard page.

#### Phase 10: Lazy Loading & Collapsible Categories
- **API Route** (`src/app/api/indicator/route.ts`): New GET endpoint exposing `getMergedChartData` for client-side on-demand fetching. Accepts `indicator`, `countries`, `startYear`, `endYear` query params.
- **LazyChartCard** (`src/components/LazyChartCard.tsx`): Client component using `IntersectionObserver` (200px rootMargin) to detect viewport proximity and fetch chart data on-demand. Shows a shimmer skeleton with faux chart SVG lines while loading.
- **CategorySection** (`src/components/CategorySection.tsx`): Collapsible accordion section using CSS `grid-template-rows: 0fr → 1fr` animation. Features rotating chevron, category description, and indicator count badge. Defaults to collapsed state.
- **Page update** (`src/app/page.tsx`): Top-10 hero charts remain server-rendered for fast initial paint. Category sections are rendered client-side via `CategorySection` → `LazyChartCard`, fetching data only when expanded and scrolled into view.
- **CSS** (`src/app/globals.css`): Added `skeleton-shimmer` keyframe animation and utility class for the loading placeholders.

## Verification Plan

### Automated Tests
- Unit tests for data transformation/merging logic (ensuring the political eras correctly align with the World Bank data points).
- Tests validating the URL state query parsing.
- TypeScript compilation check (`npx tsc --noEmit`) after each change.

### Manual Verification
- Visual design review against "premium" standards.
- Interaction testing for the chart tooltips to ensure they clearly show the requested leader data.
- Performance testing to ensure removing/adding filters is responsive.
- Verify lazy-loading: skeletons appear immediately on expand, charts load after API response.
- Verify collapsible accordion: smooth expand/collapse animation, chevron rotation, indicator count badges.
- Verify categories default to collapsed and only fetch data when expanded and scrolled into view.

