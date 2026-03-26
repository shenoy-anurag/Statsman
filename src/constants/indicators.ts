export interface IndicatorConfig {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  caveat: string;
  source: {
    url: string;
    text: string;
  };
  citation: {
    short: string;
    full: string;
  };
  type: string;
}

export const INDICATORS: IndicatorConfig[] = [
  {
    id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annual %)",
    shortName: "GDP Growth Rate",
    subtitle: "Annual percentage growth rate of GDP at market prices based on constant local currency.",
    caveat: "Growth is calculated from constant price GDP year-over-year. Does not account for informal economies or inflation recalculation anomalies.",
    source: {
      url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). GDP growth (annual %). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG",
      full: "World Bank. (2024). GDP growth (annual %). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG",
    },
    type: "percentage",
  },
  {
    id: "NY.GDP.MKTP.CD",
    name: "GDP (current US$)",
    shortName: "GDP",
    subtitle: "Gross domestic product (GDP) at market prices is the sum of the gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the valuation of outputs.",
    caveat: "GDP measures formal economic activity and doesn't account for inequality, unpaid labor, or the informal sector prevalent in emerging markets.",
    source: {
      url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). GDP (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
      full: "World Bank. (2024). GDP (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
    },
    type: "absolute",
  },
  {
    id: "NY.GDP.PCAP.CD",
    name: "GDP per capita (current US$)",
    shortName: "GDP per Capita",
    subtitle: "GDP per capita is gross domestic product divided by midyear population estimates. It is calculated without adjustments for inflation.",
    caveat: "Averages total economic output by population size. High wealth concentration and inequality can heavily distort this figure from average lived reality.",
    source: {
      url: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). GDP per capita (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.PCAP.CD",
      full: "World Bank. (2024). GDP per capita (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GDP.PCAP.CD",
    },
    type: "absolute",
  },
  {
    id: "NY.GNP.PCAP.CD",
    name: "GNI per capita, Atlas method (current US$)",
    shortName: "GNI per Capita",
    subtitle: "GNI per capita is gross national income divided by midyear population estimates. It is calculated without adjustments for inflation.",
    caveat: "GNI accounts for income from abroad. The Atlas method smooths exchange rate fluctuations, but informal remittances are often underreported.",
    source: {
      url: "https://data.worldbank.org/indicator/NY.GNP.PCAP.CD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). GNI per capita, Atlas method (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GNP.PCAP.CD",
      full: "World Bank. (2024). GNI per capita, Atlas method (current US$). World Development Indicators. https://data.worldbank.org/indicator/NY.GNP.PCAP.CD",
    },
    type: "absolute",
  },
  {
    id: "NY.GNS.ICTR.GN.ZS",
    name: "Gross Savings (% of GNI)",
    shortName: "Gross Savings Rate",
    subtitle: "Gross savings are calculated as GNI minus total consumption.",
    caveat: "Calculated as GNI minus total consumption. High savings rates can indicate capital accumulation potential, but may also reflect lack of domestic consumption.",
    source: {
      url: "https://data.worldbank.org/indicator/NY.GNS.ICTR.GN.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Gross savings (% of GNI). World Development Indicators. https://data.worldbank.org/indicator/NY.GNS.ICTR.GN.ZS",
      full: "World Bank. (2024). Gross savings (% of GNI). World Development Indicators. https://data.worldbank.org/indicator/NY.GNS.ICTR.GN.ZS",
    },
    type: "percentage",
  },
  {
    id: "SI.POV.NAHC",
    name: "Poverty headcount ratio at national poverty lines",
    shortName: "National Poverty",
    subtitle: "Percentage of population living below the national poverty line.",
    caveat: "National poverty lines are defined differently by each country based on local economic conditions, making direct cross-country numerical comparisons statistically invalid.",
    source: {
      url: "https://data.worldbank.org/indicator/SI.POV.NAHC",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Poverty headcount ratio at national poverty lines. World Development Indicators. https://data.worldbank.org/indicator/SI.POV.NAHC",
      full: "World Bank. (2024). Poverty headcount ratio at national poverty lines. World Development Indicators. https://data.worldbank.org/indicator/SI.POV.NAHC",
    },
    type: "percentage",
  },
  {
    id: "SI.POV.LMIC",
    name: "Poverty headcount ratio at $3.65 a day (2017 PPP)",
    shortName: "Absolute Poverty",
    subtitle: "Percentage of population living below the international poverty line of $3.65 a day (2017 PPP).",
    caveat: "Standardized metric for lower-middle-income countries using Purchasing Power Parity. Price fluctuations and localized inflation significantly impact real tracking.",
    source: {
      url: "https://data.worldbank.org/indicator/SI.POV.LMIC",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Poverty headcount ratio at $3.65 a day (2017 PPP). World Development Indicators. https://data.worldbank.org/indicator/SI.POV.LMIC",
      full: "World Bank. (2024). Poverty headcount ratio at $3.65 a day (2017 PPP). World Development Indicators. https://data.worldbank.org/indicator/SI.POV.LMIC",
    },
    type: "percentage",
  },
  {
    id: "SI.DST.FRST.20",
    name: "Income share held by lowest 20%",
    shortName: "Bottom 20% Income",
    subtitle: "Percentage of income held by the lowest 20% of the population.",
    caveat: "Relies on rigorous household surveys which are frequently irregular or delayed in developing nations, leading to structural reporting lags.",
    source: {
      url: "https://data.worldbank.org/indicator/SI.DST.FRST.20",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Income share held by lowest 20%. World Development Indicators. https://data.worldbank.org/indicator/SI.DST.FRST.20",
      full: "World Bank. (2024). Income share held by lowest 20%. World Development Indicators. https://data.worldbank.org/indicator/SI.DST.FRST.20",
    },
    type: "percentage",
  },
  {
    id: "SL.UEM.TOTL.ZS",
    name: "Unemployment, total (% of total labor force)",
    shortName: "Unemployment",
    subtitle: "Percentage of total labor force that is unemployed.",
    caveat: "Does not count discouraged workers who stopped looking for jobs, nor does it capture underemployment or extremely poor quality informal work.",
    source: {
      url: "https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Unemployment, total (% of total labor force). World Development Indicators. https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS",
      full: "World Bank. (2024). Unemployment, total (% of total labor force). World Development Indicators. https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS",
    },
    type: "percentage",
  },
  {
    id: "SL.TLF.CACT.ZS",
    name: "Labor force participation rate, total (15+)",
    shortName: "Labor Force Part.",
    subtitle: "Percentage of the population aged 15 and above that is economically active.",
    caveat: "Varies heavily based on cultural norms surrounding women in the workplace and shifts in the retirement or compulsory schooling ages.",
    source: {
      url: "https://data.worldbank.org/indicator/SL.TLF.CACT.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Labor force participation rate, total (15+). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.CACT.ZS",
      full: "World Bank. (2024). Labor force participation rate, total (15+). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.CACT.ZS",
    },
    type: "percentage",
  },
  {
    id: "SE.PRM.ENRR",
    name: "School enrollment, primary (% gross)",
    shortName: "Primary Enrollment",
    subtitle: "Percentage of population enrolled in primary school.",
    caveat: "Gross enrollment can exceed 100% due to over-age / under-age students and grade repetition. Does not guarantee quality of education or daily attendance.",
    source: {
      url: "https://data.worldbank.org/indicator/SE.PRM.ENRR",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). School enrollment, primary (% gross). World Development Indicators. https://data.worldbank.org/indicator/SE.PRM.ENRR",
      full: "World Bank. (2024). School enrollment, primary (% gross). World Development Indicators. https://data.worldbank.org/indicator/SE.PRM.ENRR",
    },
    type: "percentage",
  },
  {
    id: "SE.ADT.1524.LT.ZS",
    name: "Literacy rate, youth total (% of people ages 15-24)",
    shortName: "Youth Literacy",
    subtitle: "Percentage of population aged 15-24 that can read and write.",
    caveat: "Methodologies vary greatly; some nations use self-reporting while others use empirical testing. Usually lags behind rapid demographic shifts.",
    source: {
      url: "https://data.worldbank.org/indicator/SE.ADT.1524.LT.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Literacy rate, youth total (% of people ages 15-24). World Development Indicators. https://data.worldbank.org/indicator/SE.ADT.1524.LT.ZS",
      full: "World Bank. (2024). Literacy rate, youth total (% of people ages 15-24). World Development Indicators. https://data.worldbank.org/indicator/SE.ADT.1524.LT.ZS",
    },
    type: "percentage",
  },
  {
    id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total (years)",
    shortName: "Life Expectancy",
    subtitle: "Average number of years a newborn is expected to live.",
    caveat: "Highly sensitive to infant mortality rates. Rapid changes in medical infrastructure or epidemic outbreaks can radically alter trajectory estimates.",
    source: {
      url: "https://data.worldbank.org/indicator/SP.DYN.LE00.IN",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Life expectancy at birth, total (years). World Development Indicators. https://data.worldbank.org/indicator/SP.DYN.LE00.IN",
      full: "World Bank. (2024). Life expectancy at birth, total (years). World Development Indicators. https://data.worldbank.org/indicator/SP.DYN.LE00.IN",
    },
    type: "absolute",
  },
  {
    id: "SH.DYN.MORT",
    name: "Mortality rate, under-5 (per 1,000 live births)",
    shortName: "Under-5 Mortality",
    subtitle: "Number of deaths of children under five years old per 1,000 live births.",
    caveat: "Relies on civil registration systems which are often incomplete in lower-income areas, prompting researchers to use demographic models and estimates.",
    source: {
      url: "https://data.worldbank.org/indicator/SH.DYN.MORT",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Mortality rate, under-5 (per 1,000 live births). World Development Indicators. https://data.worldbank.org/indicator/SH.DYN.MORT",
      full: "World Bank. (2024). Mortality rate, under-5 (per 1,000 live births). World Development Indicators. https://data.worldbank.org/indicator/SH.DYN.MORT",
    },
    type: "absolute",
  },
  {
    id: "SP.POP.TOTL",
    name: "Population, total",
    shortName: "Population",
    subtitle: "Total population of a country.",
    caveat: "Relies on decennial census data and mid-year estimates. Margin of error expands the further away a country is from its last comprehensive physical census.",
    source: {
      url: "https://data.worldbank.org/indicator/SP.POP.TOTL",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Population, total. World Development Indicators. https://data.worldbank.org/indicator/SP.POP.TOTL",
      full: "World Bank. (2024). Population, total. World Development Indicators. https://data.worldbank.org/indicator/SP.POP.TOTL",
    },
    type: "absolute",
  },
  {
    id: "EG.ELC.ACCS.ZS",
    name: "Access to electricity (% of population)",
    shortName: "Electricity Access",
    subtitle: "Percentage of population with access to electricity.",
    caveat: "Measures access to the grid but does not account for reliability, brownouts, or affordability of the power actually provided to households.",
    source: {
      url: "https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Access to electricity (% of population). World Development Indicators. https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS",
      full: "World Bank. (2024). Access to electricity (% of population). World Development Indicators. https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS",
    },
    type: "percentage",
  },
  {
    id: "IT.NET.USER.ZS",
    name: "Individuals using the Internet (% of population)",
    shortName: "Internet Users",
    subtitle: "Percentage of population using the internet.",
    caveat: "Definition of 'internet user' varies significantly by country, often relying on self-reporting or limited surveys, leading to potential overstatement of actual access.",
    source: {
      url: "https://data.worldbank.org/indicator/IT.NET.USER.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Individuals using the Internet (% of population). World Development Indicators. https://data.worldbank.org/indicator/IT.NET.USER.ZS",
      full: "World Bank. (2024). Individuals using the Internet (% of population). World Development Indicators. https://data.worldbank.org/indicator/IT.NET.USER.ZS",
    },
    type: "percentage",
  },
  {
    id: "AG.LND.FRST.ZS",
    name: "Forest area (% of land area)",
    shortName: "Forest Cover",
    subtitle: "Percentage of land area covered by forests.",
    caveat: "Definition of 'forest' can include commercial plantations depending on the reporting body, sometimes masking real old-growth deforestation.",
    source: {
      url: "https://data.worldbank.org/indicator/AG.LND.FRST.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Forest area (% of land area). World Development Indicators. https://data.worldbank.org/indicator/AG.LND.FRST.ZS",
      full: "World Bank. (2024). Forest area (% of land area). World Development Indicators. https://data.worldbank.org/indicator/AG.LND.FRST.ZS",
    },
    type: "percentage",
  },
  {
    id: "NE.EXP.GNFS.ZS",
    name: "Exports of goods and services (% of GDP)",
    shortName: "Exports",
    subtitle: "Percentage of GDP that is exported.",
    caveat: "High percentages indicate deep integration into the global supply chain but also signify structural vulnerability to global market shocks.",
    source: {
      url: "https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Exports of goods and services (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS",
      full: "World Bank. (2024). Exports of goods and services (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS",
    },
    type: "percentage",
  },
  {
    id: "BX.KLT.DINV.CD.WD",
    name: "Foreign direct investment, net inflows (BoP)",
    shortName: "FDI Inflows",
    subtitle: "Net inflows of foreign direct investment.",
    caveat: "Represents net inflows (new investment minus disinvestment). Subject to massive volatility caused by singular mega-deals or sudden geopolitical shifts.",
    source: {
      url: "https://data.worldbank.org/indicator/BX.KLT.DINV.CD.WD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Foreign direct investment, net inflows (BoP). World Development Indicators. https://data.worldbank.org/indicator/BX.KLT.DINV.CD.WD",
      full: "World Bank. (2024). Foreign direct investment, net inflows (BoP). World Development Indicators. https://data.worldbank.org/indicator/BX.KLT.DINV.CD.WD",
    },
    type: "absolute",
  },

  // ── Macroeconomic Stability & Investment ──────────────────────────────
  {
    id: "FP.CPI.TOTL.ZG",
    name: "Inflation, consumer prices (annual %)",
    shortName: "Inflation Rate",
    subtitle: "Annual percentage increase in the cost of living.",
    caveat: "CPI baskets differ across countries. Administered prices, energy subsidies, and base-year effects can all distort the headline figure.",
    source: {
      url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Inflation, consumer prices (annual %). World Development Indicators. https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG",
      full: "World Bank. (2024). Inflation, consumer prices (annual %). World Development Indicators. https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG",
    },
    type: "percentage",
  },
  {
    id: "NE.GDI.TOTL.ZS",
    name: "Gross capital formation (% of GDP)",
    shortName: "Capital Formation (% GDP)",
    subtitle: "Percentage of GDP that is invested in fixed assets and inventory changes.",
    caveat: "Includes fixed assets and inventory changes. High ratios may reflect overinvestment or construction booms that correct sharply.",
    source: {
      url: "https://data.worldbank.org/indicator/NE.GDI.TOTL.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Gross capital formation (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.TOTL.ZS",
      full: "World Bank. (2024). Gross capital formation (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.TOTL.ZS",
    },
    type: "percentage",
  },
  {
    id: "NE.GDI.TOTL.CD",
    name: "Gross capital formation (current US$)",
    shortName: "Capital Formation (US$)",
    subtitle: "Total investment in fixed assets and inventory changes, in current US dollars.",
    caveat: "Nominal value subject to exchange-rate swings. Does not convey efficiency or quality of the investments made.",
    source: {
      url: "https://data.worldbank.org/indicator/NE.GDI.TOTL.CD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Gross capital formation (current US$). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.TOTL.CD",
      full: "World Bank. (2024). Gross capital formation (current US$). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.TOTL.CD",
    },
    type: "absolute",
  },
  {
    id: "NE.GDI.FTOT.KD.ZG",
    name: "Gross fixed capital formation (annual % growth)",
    shortName: "Fixed Capital Growth",
    subtitle: "Annual percentage growth in fixed capital formation.",
    caveat: "Tracks long-term physical asset investment growth. Large government projects or real-estate bubbles can inflate this figure temporarily.",
    source: {
      url: "https://data.worldbank.org/indicator/NE.GDI.FTOT.KD.ZG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Gross fixed capital formation (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.FTOT.KD.ZG",
      full: "World Bank. (2024). Gross fixed capital formation (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NE.GDI.FTOT.KD.ZG",
    },
    type: "percentage",
  },
  {
    id: "BN.CAB.XOKA.GD.ZS",
    name: "Current account balance (% of GDP)",
    shortName: "Current Account Balance",
    subtitle: "Percentage of GDP that is in current account balance.",
    caveat: "Persistent deficits signal reliance on foreign capital; persistent surpluses may reflect suppressed domestic consumption.",
    source: {
      url: "https://data.worldbank.org/indicator/BN.CAB.XOKA.GD.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Current account balance (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/BN.CAB.XOKA.GD.ZS",
      full: "World Bank. (2024). Current account balance (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/BN.CAB.XOKA.GD.ZS",
    },
    type: "percentage",
  },

  // ── Financial System Health ───────────────────────────────────────────
  {
    id: "FB.BNK.CAPA.ZS",
    name: "Bank capital to assets ratio (%)",
    shortName: "Bank Capital Ratio",
    subtitle: "Ratio of bank capital to total assets.",
    caveat: "Higher ratios suggest resilience, but can also indicate banks are not lending enough. Off-balance-sheet exposures are not captured.",
    source: {
      url: "https://data.worldbank.org/indicator/FB.BNK.CAPA.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Bank capital to assets ratio (%). World Development Indicators. https://data.worldbank.org/indicator/FB.BNK.CAPA.ZS",
      full: "World Bank. (2024). Bank capital to assets ratio (%). World Development Indicators. https://data.worldbank.org/indicator/FB.BNK.CAPA.ZS",
    },
    type: "percentage",
  },
  {
    id: "FB.AST.NPER.ZS",
    name: "Bank nonperforming loans to total gross loans (%)",
    shortName: "NPL Ratio",
    subtitle: "Ratio of nonperforming loans to total gross loans.",
    caveat: "Definitions of 'nonperforming' vary across jurisdictions. Banks may restructure loans to avoid classification, masking true asset quality.",
    source: {
      url: "https://data.worldbank.org/indicator/FB.AST.NPER.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Bank nonperforming loans to total gross loans (%). World Development Indicators. https://data.worldbank.org/indicator/FB.AST.NPER.ZS",
      full: "World Bank. (2024). Bank nonperforming loans to total gross loans (%). World Development Indicators. https://data.worldbank.org/indicator/FB.AST.NPER.ZS",
    },
    type: "percentage",
  },
  {
    id: "FR.INR.LEND",
    name: "Lending interest rate (%)",
    shortName: "Lending Rate",
    subtitle: "",
    caveat: "Represents the rate at which banks lend to prime customers. Actual rates for SMEs and consumers can be significantly higher.",
    source: {
      url: "https://data.worldbank.org/indicator/FR.INR.LEND",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Lending interest rate (%). World Development Indicators. https://data.worldbank.org/indicator/FR.INR.LEND",
      full: "World Bank. (2024). Lending interest rate (%). World Development Indicators. https://data.worldbank.org/indicator/FR.INR.LEND",
    },
    type: "percentage",
  },

  // ── Economic Structure & Industrialization ────────────────────────────
  {
    id: "NV.AGR.TOTL.KD.ZG",
    name: "Agriculture, forestry, and fishing, value added (annual % growth)",
    shortName: "Agriculture Growth",
    subtitle: "Annual percentage growth in agriculture, forestry, and fishing.",
    caveat: "Highly weather-dependent. Policy changes such as land reform or subsidy shifts can create volatile year-over-year swings.",
    source: {
      url: "https://data.worldbank.org/indicator/NV.AGR.TOTL.KD.ZG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Agriculture, forestry, and fishing, value added (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NV.AGR.TOTL.KD.ZG",
      full: "World Bank. (2024). Agriculture, forestry, and fishing, value added (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NV.AGR.TOTL.KD.ZG",
    },
    type: "percentage",
  },
  {
    id: "NV.IND.MANF.ZS",
    name: "Manufacturing, value added (% of GDP)",
    shortName: "Manufacturing (% GDP)",
    subtitle: "Percentage of GDP that is in manufacturing.",
    caveat: "Declining share may reflect deindustrialization or simply that services are growing faster. Does not capture informal manufacturing.",
    source: {
      url: "https://data.worldbank.org/indicator/NV.IND.MANF.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Manufacturing, value added (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NV.IND.MANF.ZS",
      full: "World Bank. (2024). Manufacturing, value added (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NV.IND.MANF.ZS",
    },
    type: "percentage",
  },
  {
    id: "NV.SRV.TOTL.ZS",
    name: "Services, value added (% of GDP)",
    shortName: "Services (% GDP)",
    subtitle: "Percentage of GDP that is in services.",
    caveat: "High services share correlates with advanced economies, but can also reflect premature deindustrialization in developing nations.",
    source: {
      url: "https://data.worldbank.org/indicator/NV.SRV.TOTL.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Services, value added (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NV.SRV.TOTL.ZS",
      full: "World Bank. (2024). Services, value added (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/NV.SRV.TOTL.ZS",
    },
    type: "percentage",
  },

  // ── Trade, Innovation & Competitiveness ───────────────────────────────
  {
    id: "NE.EXP.GNFS.KD.ZG",
    name: "Exports of goods and services (annual % growth)",
    shortName: "Export Growth",
    subtitle: "Annual percentage growth in exports of goods and services.",
    caveat: "Growth rates are volatile and highly sensitive to global recessions, commodity price swings, and trade policy changes.",
    source: {
      url: "https://data.worldbank.org/indicator/NE.EXP.GNFS.KD.ZG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Exports of goods and services (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NE.EXP.GNFS.KD.ZG",
      full: "World Bank. (2024). Exports of goods and services (annual % growth). World Development Indicators. https://data.worldbank.org/indicator/NE.EXP.GNFS.KD.ZG",
    },
    type: "percentage",
  },
  {
    id: "GC.TAX.IMPT.CN",
    name: "Customs and other import duties (current LCU)",
    shortName: "Import Duties",
    subtitle: "Customs and other import duties in local currency.",
    caveat: "Reported in local currency, making cross-country comparison difficult without conversion. Reflects protectionist tendency and trade-tax reliance.",
    source: {
      url: "https://data.worldbank.org/indicator/GC.TAX.IMPT.CN",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Customs and other import duties (current LCU). World Development Indicators. https://data.worldbank.org/indicator/GC.TAX.IMPT.CN",
      full: "World Bank. (2024). Customs and other import duties (current LCU). World Development Indicators. https://data.worldbank.org/indicator/GC.TAX.IMPT.CN",
    },
    type: "absolute",
  },
  {
    id: "IP.PAT.RESD",
    name: "Patent applications, residents",
    shortName: "Resident Patents",
    subtitle: "Number of patent applications filed by residents.",
    caveat: "Volume does not equate to quality. Some countries incentivize patent filing through subsidies, inflating counts without proportional innovation.",
    source: {
      url: "https://data.worldbank.org/indicator/IP.PAT.RESD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Patent applications, residents. World Development Indicators. https://data.worldbank.org/indicator/IP.PAT.RESD",
      full: "World Bank. (2024). Patent applications, residents. World Development Indicators. https://data.worldbank.org/indicator/IP.PAT.RESD",
    },
    type: "absolute",
  },
  {
    id: "GB.XPD.RSDV.GD.ZS",
    name: "Research and development expenditure (% of GDP)",
    shortName: "R&D Spending",
    subtitle: "Percentage of GDP spent on research and development.",
    caveat: "Includes government, business, and academic R&D. Military R&D is often excluded or classified, understating true national effort.",
    source: {
      url: "https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Research and development expenditure (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS",
      full: "World Bank. (2024). Research and development expenditure (% of GDP). World Development Indicators. https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS",
    },
    type: "percentage",
  },

  // ── Social Equity & Human Capital ─────────────────────────────────────
  {
    id: "SI.POV.GINI",
    name: "Gini index",
    shortName: "Gini Index",
    subtitle: "Measure of income inequality.",
    caveat: "The gold standard for inequality measurement, but relies on household survey data that is infrequent in many developing nations.",
    source: {
      url: "https://data.worldbank.org/indicator/SI.POV.GINI",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Gini index. World Development Indicators. https://data.worldbank.org/indicator/SI.POV.GINI",
      full: "World Bank. (2024). Gini index. World Development Indicators. https://data.worldbank.org/indicator/SI.POV.GINI",
    },
    type: "absolute",
  },
  {
    id: "SL.TLF.ACTI.1524.FE.NE.ZS",
    name: "Labor force participation rate for ages 15-24, female (%) (national estimate)",
    shortName: "Youth LFP (Female)",
    subtitle: "Labor force participation rate for ages 15-24, female.",
    caveat: "Cultural norms, educational enrollment, and survey methodology differences limit cross-country comparability.",
    source: {
      url: "https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.FE.NE.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Labor force participation rate for ages 15-24, female (%) (national estimate). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.FE.NE.ZS",
      full: "World Bank. (2024). Labor force participation rate for ages 15-24, female (%) (national estimate). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.FE.NE.ZS",
    },
    type: "percentage",
  },
  {
    id: "SL.TLF.ACTI.1524.MA.NE.ZS",
    name: "Labor force participation rate for ages 15-24, male (%) (national estimate)",
    shortName: "Youth LFP (Male)",
    subtitle: "Labor force participation rate for ages 15-24, male.",
    caveat: "Declining rates may reflect higher educational attainment rather than discouragement. Military conscription affects some countries.",
    source: {
      url: "https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.MA.NE.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Labor force participation rate for ages 15-24, male (%) (national estimate). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.MA.NE.ZS",
      full: "World Bank. (2024). Labor force participation rate for ages 15-24, male (%) (national estimate). World Development Indicators. https://data.worldbank.org/indicator/SL.TLF.ACTI.1524.MA.NE.ZS",
    },
    type: "percentage",
  },
  {
    id: "SN.ITK.DEFC.ZS",
    name: "Prevalence of undernourishment (% of population)",
    shortName: "Undernourishment",
    subtitle: "Percentage of the population that is undernourished.",
    caveat: "Based on food availability and distribution models. Does not capture micronutrient deficiencies or diet quality.",
    source: {
      url: "https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Prevalence of undernourishment (% of population). World Development Indicators. https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS",
      full: "World Bank. (2024). Prevalence of undernourishment (% of population). World Development Indicators. https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS",
    },
    type: "percentage",
  },

  // ── Infrastructure & Environment ──────────────────────────────────────
  {
    id: "EG.CFT.ACCS.ZS",
    name: "Access to clean fuels and technologies for cooking (% of population)",
    shortName: "Clean Cooking Access",
    subtitle: "Percentage of the population with access to clean fuels and technologies for cooking.",
    caveat: "Self-reported data; actual usage patterns may differ from access. Does not capture seasonal or regional variation within countries.",
    source: {
      url: "https://data.worldbank.org/indicator/EG.CFT.ACCS.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Access to clean fuels and technologies for cooking (% of population). World Development Indicators. https://data.worldbank.org/indicator/EG.CFT.ACCS.ZS",
      full: "World Bank. (2024). Access to clean fuels and technologies for cooking (% of population). World Development Indicators. https://data.worldbank.org/indicator/EG.CFT.ACCS.ZS",
    },
    type: "percentage",
  },
  {
    id: "SH.H2O.BASW.ZS",
    name: "People using at least basic drinking water services (% of population)",
    shortName: "Basic Water Access",
    subtitle: "Percentage of the population using at least basic drinking water services.",
    caveat: "'Basic' is a minimum service level. It does not guarantee water safety, reliability, or proximity of the source.",
    source: {
      url: "https://data.worldbank.org/indicator/SH.H2O.BASW.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). People using at least basic drinking water services (% of population). World Development Indicators. https://data.worldbank.org/indicator/SH.H2O.BASW.ZS",
      full: "World Bank. (2024). People using at least basic drinking water services (% of population). World Development Indicators. https://data.worldbank.org/indicator/SH.H2O.BASW.ZS",
    },
    type: "percentage",
  },
  {
    id: "EG.ELC.LOSS.ZS",
    name: "Electric power transmission and distribution losses (% of output)",
    shortName: "Power Grid Losses",
    subtitle: "Percentage of electric power lost during transmission and distribution.",
    caveat: "High losses can indicate aging infrastructure, theft, or poor governance. Technical vs. commercial losses are not separated.",
    source: {
      url: "https://data.worldbank.org/indicator/EG.ELC.LOSS.ZS",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Electric power transmission and distribution losses (% of output). World Development Indicators. https://data.worldbank.org/indicator/EG.ELC.LOSS.ZS",
      full: "World Bank. (2024). Electric power transmission and distribution losses (% of output). World Development Indicators. https://data.worldbank.org/indicator/EG.ELC.LOSS.ZS",
    },
    type: "percentage",
  },
  {
    id: "EN.GHG.CO2.MT.CE.AR5",
    name: "CO2 emissions (Mt CO2e)",
    shortName: "CO₂ Emissions",
    subtitle: "Carbon dioxide emissions in million metric tons of CO₂ equivalent.",
    caveat: "Production-based accounting; does not attribute emissions embedded in imported goods to the consuming country.",
    source: {
      url: "https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). CO2 emissions (Mt CO2e). World Development Indicators. https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5",
      full: "World Bank. (2024). CO2 emissions (Mt CO2e). World Development Indicators. https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5",
    },
    type: "absolute",
  },
  {
    id: "EN.GHG.CO2.RT.GDP.KD",
    name: "CO2 intensity of GDP (kg CO2e per constant 2015 US$ of GDP)",
    shortName: "Carbon Intensity",
    subtitle: "Carbon dioxide emissions per constant 2015 US$ of GDP.",
    caveat: "Declining intensity can mask rising absolute emissions if GDP is growing fast. Sector mix heavily influences the ratio.",
    source: {
      url: "https://data.worldbank.org/indicator/EN.GHG.CO2.RT.GDP.KD",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). CO2 intensity of GDP (kg CO2e per constant 2015 US$ of GDP). World Development Indicators. https://data.worldbank.org/indicator/EN.GHG.CO2.RT.GDP.KD",
      full: "World Bank. (2024). CO2 intensity of GDP (kg CO2e per constant 2015 US$ of GDP). World Development Indicators. https://data.worldbank.org/indicator/EN.GHG.CO2.RT.GDP.KD",
    },
    type: "absolute",
  },

  // ── Demographics & Dependency Burden ──────────────────────────────────
  {
    id: "SP.POP.DPND",
    name: "Age dependency ratio (% of working-age population)",
    shortName: "Dependency Ratio",
    subtitle: "Percentage of the working-age population that is dependent.",
    caveat: "Assumes 15–64 as working age, which varies by country. Does not reflect actual labor force participation or retirement ages.",
    source: {
      url: "https://data.worldbank.org/indicator/SP.POP.DPND",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Age dependency ratio (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND",
      full: "World Bank. (2024). Age dependency ratio (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND",
    },
    type: "percentage",
  },
  {
    id: "SP.POP.DPND.OL",
    name: "Age dependency ratio, old (% of working-age population)",
    shortName: "Old-Age Dependency",
    subtitle: "Percentage of the working-age population that is old.",
    caveat: "Rising ratios signal pension and healthcare cost pressures. Does not account for seniors who continue to work.",
    source: {
      url: "https://data.worldbank.org/indicator/SP.POP.DPND.OL",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Age dependency ratio, old (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND.OL",
      full: "World Bank. (2024). Age dependency ratio, old (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND.OL",
    },
    type: "percentage",
  },
  {
    id: "SP.POP.DPND.YG",
    name: "Age dependency ratio, young (% of working-age population)",
    shortName: "Youth Dependency",
    subtitle: "Percentage of the working-age population that is young.",
    caveat: "High ratios can indicate a demographic dividend opportunity or an education/employment challenge, depending on policy context.",
    source: {
      url: "https://data.worldbank.org/indicator/SP.POP.DPND.YG",
      text: "The World Bank: World Development Indicators",
    },
    citation: {
      short: "World Bank. (2024). Age dependency ratio, young (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND.YG",
      full: "World Bank. (2024). Age dependency ratio, young (% of working-age population). World Development Indicators. https://data.worldbank.org/indicator/SP.POP.DPND.YG",
    },
    type: "percentage",
  },
  // ── Political Violence & Crimes ──────────────────────────────────
  {
    id: "PV.TER.DTHS",
    name: "Terrorism Deaths",
    shortName: "Terrorism Deaths",
    subtitle: "Confirmed deaths, including all victims and attackers who died because of a terrorist attack.  ",
    caveat: "Data includes deaths from terrorist incidents. Reporting may vary by region and conflict intensity.",
    source: {
      url: "https://ourworldindata.org/terrorism",
      text: "START / Our World in Data",
    },
    citation: {
      short: "National Consortium for the Study of Terrorism and Responses to Terrorism (START) (2022) – with major processing by Our World in Data",
      full: "National Consortium for the Study of Terrorism and Responses to Terrorism (START) (2022) – with major processing by Our World in Data. “Fatalities” [dataset]. National Consortium for the Study of Terrorism and Responses to Terrorism (START), “Global Terrorism Database”; National Consortium for the Study of Terrorism and Responses to Terrorism (START), “Global Terrorism Database (2020-2021)” [original data].",
    },
    type: "absolute",
  },
  {
    id: "PV.TER.INCD",
    name: "Terrorist Attacks",
    shortName: "Terrorist Attacks",
    subtitle: "Number of recorded terrorist attacks.",
    caveat: "Number of recorded terrorist incidents. Definitions of terrorism and reporting consistency can differ across countries.",
    source: {
      url: "https://ourworldindata.org/terrorism",
      text: "START / Our World in Data",
    },
    citation: {
      short: "National Consortium for the Study of Terrorism and Responses to Terrorism (START) (2022) – with major processing by Our World in Data",
      full: "National Consortium for the Study of Terrorism and Responses to Terrorism (START) (2022) – with major processing by Our World in Data. “Fatalities” [dataset]. National Consortium for the Study of Terrorism and Responses to Terrorism (START), “Global Terrorism Database”; National Consortium for the Study of Terrorism and Responses to Terrorism (START), “Global Terrorism Database (2020-2021)” [original data].",
    },
    type: "absolute",
  },
];

// Provide an easy lookup map for UI rendering context
export const INDICATORS_MAP = INDICATORS.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as Record<string, IndicatorConfig>);

export const TOP_INDICATORS = [
  "NY.GDP.MKTP.CD",      // GDP
  "NY.GDP.PCAP.CD",      // GDP per capita
  "NY.GNS.ICTR.GN.ZS",   // Gross Savings
  "SL.UEM.TOTL.ZS",      // Unemployment
  "SE.PRM.ENRR",         // School enrollment
  "SP.DYN.LE00.IN",      // Life expectancy
  "EG.ELC.ACCS.ZS",      // Electricity access
  "IT.NET.USER.ZS",      // Internet Users
  "BX.KLT.DINV.CD.WD",   // FDI
  "SP.POP.TOTL"          // Population
];

// ── Categorized Indicator Groups for the Dashboard ──────────────────────

export interface IndicatorCategory {
  id: string;
  title: string;
  description: string;
  indicators: string[];
}

export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
  {
    id: "core",
    title: "Core Economic & Social Indicators",
    description: "Foundational metrics covering GDP, poverty, employment, education, health, and population.",
    indicators: [
      "NY.GDP.MKTP.KD.ZG",
      "NY.GDP.MKTP.CD",
      "NY.GDP.PCAP.CD",
      "NY.GNP.PCAP.CD",
      "NY.GNS.ICTR.GN.ZS",
      "SI.POV.NAHC",
      "SI.POV.LMIC",
      "SI.DST.FRST.20",
      "SL.UEM.TOTL.ZS",
      "SL.TLF.CACT.ZS",
      "SE.PRM.ENRR",
      "SE.ADT.1524.LT.ZS",
      "SP.DYN.LE00.IN",
      "SH.DYN.MORT",
      "SP.POP.TOTL",
      "EG.ELC.ACCS.ZS",
      "IT.NET.USER.ZS",
      "AG.LND.FRST.ZS",
      "NE.EXP.GNFS.ZS",
      "BX.KLT.DINV.CD.WD",
    ],
  },
  {
    id: "macroeconomic",
    title: "Macroeconomic Stability & Investment",
    description: "How a leader manages the national ledger and whether they are reinvesting in the future.",
    indicators: [
      "FP.CPI.TOTL.ZG",
      "NE.GDI.TOTL.ZS",
      "NE.GDI.TOTL.CD",
      "NE.GDI.FTOT.KD.ZG",
      "BN.CAB.XOKA.GD.ZS",
    ],
  },
  {
    id: "financial-health",
    title: "Financial System Health",
    description: "Risk and efficiency of the banking sector — critical for comparing modern economies.",
    indicators: [
      "FB.BNK.CAPA.ZS",
      "FB.AST.NPER.ZS",
      "FR.INR.LEND",
    ],
  },
  {
    id: "economic-structure",
    title: "Economic Structure & Industrialization",
    description: "The DNA of the economy — comparing agrarian focus vs. industrial pivot vs. services dominance.",
    indicators: [
      "NV.AGR.TOTL.KD.ZG",
      "NV.IND.MANF.ZS",
      "NV.SRV.TOTL.ZS",
    ],
  },
  {
    id: "trade-innovation",
    title: "Trade, Innovation & Competitiveness",
    description: "Openness to the world and commitment to future technology.",
    indicators: [
      "NE.EXP.GNFS.KD.ZG",
      "GC.TAX.IMPT.CN",
      "IP.PAT.RESD",
      "GB.XPD.RSDV.GD.ZS",
    ],
  },
  {
    id: "social-equity",
    title: "Social Equity & Human Capital",
    description: "Who actually benefits from a leader's economic policies.",
    indicators: [
      "SI.POV.GINI",
      "SL.TLF.ACTI.1524.FE.NE.ZS",
      "SL.TLF.ACTI.1524.MA.NE.ZS",
      "SN.ITK.DEFC.ZS",
    ],
  },
  {
    id: "infrastructure-environment",
    title: "Infrastructure & Environment",
    description: "The bones of the country and the environmental cost of its growth.",
    indicators: [
      "EG.CFT.ACCS.ZS",
      "SH.H2O.BASW.ZS",
      "EG.ELC.LOSS.ZS",
      "AG.LND.FRST.ZS",
      "EN.GHG.CO2.MT.CE.AR5",
      "EN.GHG.CO2.RT.GDP.KD",
    ],
  },
  {
    id: "demographics",
    title: "Demographics & The Dependency Burden",
    description: "Constraints leaders work within — distinguishing aging-society vs. youth-bulge challenges.",
    indicators: [
      "SP.POP.DPND",
      "SP.POP.DPND.OL",
      "SP.POP.DPND.YG",
    ],
  },
  {
    id: "political-violence",
    title: "Political Violence & Crimes",
    description: "Impact of terrorism and political instability on national security.",
    indicators: [
      "PV.TER.DTHS",
      "PV.TER.INCD",
    ],
  },
];
