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

## Verification Plan

### Automated Tests
- Unit tests for data transformation/merging logic (ensuring the political eras correctly align with the World Bank data points).
- Tests validating the URL state query parsing.

### Manual Verification
- Visual design review against "premium" standards.
- Interaction testing for the chart tooltips to ensure they clearly show the requested leader data.
- Performance testing to ensure removing/adding filters is responsive.
