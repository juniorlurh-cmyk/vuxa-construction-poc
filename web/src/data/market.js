// Indicative internal analytics — editorial demand estimates for internal
// discussion, plus real public signals (Google rating). Labelled indicative
// on the page; not audited market intelligence.

export const MARKET_LABELS = [
  'Building & Renovations',
  'Civil Works',
  'Traffic Counts',
  'Paving',
  'Project Support',
  'Sunnyside',
  'Arcadia',
  'Hatfield',
  'Pretoria CBD',
  'Centurion',
  'Pretoria North',
];

// Demand signal per service line per area (0-100 indicative).
export const DEMAND = [
  { area: 'Sunnyside', building: 78, civils: 55, paving: 62, traffic: 48 },
  { area: 'Arcadia', building: 82, civils: 58, paving: 60, traffic: 52 },
  { area: 'Hatfield', building: 74, civils: 50, paving: 66, traffic: 60 },
  { area: 'Pretoria CBD', building: 70, civils: 72, paving: 55, traffic: 75 },
  { area: 'Centurion', building: 85, civils: 78, paving: 74, traffic: 70 },
  { area: 'Pretoria North', building: 80, civils: 65, paving: 70, traffic: 55 },
];

export const SERVICE_MIX = [
  { name: 'Building & Renovations', demand: 82, note: 'Steady residential alterations market in inner suburbs' },
  { name: 'Traffic Data Collection', demand: 68, note: 'Niche — few local competitors; public-sector and engineering clients' },
  { name: 'Civil Works', demand: 64, note: 'Tender-driven; strong in Centurion growth corridors' },
  { name: 'Paving & External Works', demand: 61, note: 'Volume work tied to property turnover' },
  { name: 'Project Support & Labour', demand: 57, note: 'Recurring demand from main contractors' },
];

export const SIGNALS = [
  { label: 'Google rating', value: '4.6 / 5' },
  { label: 'Public reviews', value: '8' },
  { label: 'Base', value: 'Sunnyside, Pretoria' },
  { label: 'Standout mention', value: 'Traffic counts' },
];

export function marketSummary() {
  const areas = DEMAND.map(
    (d) => `${d.area}: building ${d.building}, civils ${d.civils}, paving ${d.paving}, traffic ${d.traffic}`
  ).join('; ');
  const mix = SERVICE_MIX.map((s) => `${s.name}: ${s.demand}/100 (${s.note})`).join('; ');
  const sig = SIGNALS.map((s) => `${s.label}: ${s.value}`).join('; ');
  return `Service mix — ${mix}\nDemand by area — ${areas}\nPublic signals — ${sig}`;
}

export const DEFAULT_SPEC = {
  charts: [
    {
      type: 'hbar',
      title: 'Service-line demand (indicative)',
      items: SERVICE_MIX.map((s) => ({ label: s.name, value: s.demand })),
    },
    {
      type: 'vbar',
      title: 'Building demand by area',
      items: DEMAND.map((d) => ({ label: d.area, value: d.building })),
    },
    {
      type: 'line',
      title: 'Traffic-count opportunity by area',
      items: DEMAND.map((d) => ({ label: d.area, value: d.traffic })),
    },
  ],
};
