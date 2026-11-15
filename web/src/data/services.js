// Service lines inferred from the public listing categories (construction,
// civil engineering) and reviewer mentions (traffic counts). Kept general —
// no invented project names or credentials.

export const SERVICES = [
  {
    id: 'building',
    name: 'Building & Renovations',
    tag: 'Core trade',
    icon: 'building',
    desc: 'Residential and small commercial building work — new structures, alterations, extensions and interior renovation work carried out with hands-on supervision.',
    points: ['Additions & extensions', 'Kitchen & bathroom remodels', 'Plaster, brick & finishing work'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'civils',
    name: 'Civil Works & Earthworks',
    tag: 'Public & private',
    icon: 'doc',
    desc: 'Site works, stormwater, drainage and small civil contracts — the groundwork that keeps larger projects moving.',
    points: ['Earthworks & excavation', 'Stormwater & drainage', 'Retaining structures'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'traffic',
    name: 'Traffic Data Collection',
    tag: 'Speciality',
    icon: 'network',
    desc: 'Manual and field traffic counts for transport studies, planning applications and infrastructure assessments — work clients have publicly praised.',
    points: ['Intersection & classified counts', 'Field survey teams', 'Data sheets for engineers & planners'],
    image: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'paving',
    name: 'Paving & External Works',
    tag: 'Finishing',
    icon: 'check',
    desc: 'Driveways, walkways, edging and external finishing suited to Gauteng soils and weather.',
    points: ['Driveway & path paving', 'Kerbs & edging', 'Site finishing'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'management',
    name: 'Project Support & Labour',
    tag: 'Support',
    icon: 'users',
    desc: 'Hands-on site labour and coordination support for main contractors and property owners who need dependable teams on the ground.',
    points: ['Skilled site teams', 'Subcontractor support', 'Snag & finishing crews'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
  },
];

export const PROCESS = [
  { n: '01', t: 'Site visit & scope', d: 'We look at the actual site, not just drawings — then agree what the job really involves.' },
  { n: '02', t: 'Written quote', d: 'A clear, itemised quote before any work starts. No vague allowances.' },
  { n: '03', t: 'Build & communicate', d: 'Work proceeds with regular updates — you always know where the job stands.' },
  { n: '04', t: 'Walkthrough & handover', d: 'We walk the finished work with you and sort snags before we call it done.' },
];

export const SERVICE_AREAS = [
  'Sunnyside', 'Arcadia', 'Hatfield', 'Pretoria CBD', 'Muckleneuk',
  'Brooklyn', 'Centurion', 'Pretoria North', 'Wider Gauteng',
];

// Representative imagery supporting the traffic data collection speciality —
// reviewers specifically praised this work, so it gets its own visual
// treatment rather than sharing a generic "construction" look.
export const TRAFFIC_GALLERY = [
  {
    image: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1000&q=80',
    alt: 'Aerial view of a major road interchange with multiple lanes of traffic',
    caption: 'Classified intersection counts',
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80',
    alt: 'Busy city street intersection with pedestrians and vehicles',
    caption: 'Pedestrian & vehicle surveys',
  },
];

export const FAQS = [
  {
    q: 'How do you price a job?',
    a: 'Every job starts with a site visit and a written, itemised quote — no ballpark pricing over the phone. Pricing depends on scope, site access and materials.',
  },
  {
    q: 'Do you do small jobs, or only large contracts?',
    a: 'Both — from a single bathroom remodel or a short traffic count, up to larger civil and building contracts. The same written-quote process applies either way.',
  },
  {
    q: 'What areas do you cover?',
    a: `Based in Sunnyside, working mainly across ${SERVICE_AREAS.slice(0, 5).join(', ')} and wider Gauteng. If your site is further out, ask — most jobs are still workable.`,
  },
  {
    q: 'What is traffic data collection, and why would I need it?',
    a: 'Manual and field traffic counts for transport studies, planning applications and infrastructure assessments — the kind of data engineers and town planners need for road and development approvals. It\u2019s a real speciality of ours, not a side job.',
  },
  {
    q: 'How do I get a quote?',
    a: 'WhatsApp us photos and a description of the site or job, or use the contact form — we respond with next steps, not a generic reply.',
  },
];
