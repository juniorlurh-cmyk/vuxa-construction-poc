import { useState } from 'react';
import { planCharts, evalSpec } from '../ai/viz';
import { hasKey } from '../ai/provider';
import { marketSummary, DEFAULT_SPEC } from '../data/market';
import FadeIn from './FadeIn';
import { Icon } from './Icons';

const W = 460;
const H = 220;
const PAD = { t: 14, r: 12, b: 30, l: 12 };
const COLORS = ['#0a0d14', '#e8a020', '#2d3348', '#f5c450', '#c5901a', '#5b6370'];

function HBar({ chart }) {
  const max = Math.max(...chart.items.map((i) => i.value), 1);
  return (
    <svg viewBox={`0 0 ${W} ${chart.items.length * 34 + 8}`} className="chart">
      {chart.items.map((it, i) => (
        <g key={it.label}>
          <text x="0" y={i * 34 + 14} className="chart-label">{it.label}</text>
          <rect x="0" y={i * 34 + 20} width={(it.value / max) * (W - 60)} height="8" rx="4" fill={COLORS[i % COLORS.length]} />
          <text x={(it.value / max) * (W - 60) + 8} y={i * 34 + 28} className="chart-value">{it.value}</text>
        </g>
      ))}
    </svg>
  );
}

function VBar({ chart }) {
  const max = Math.max(...chart.items.map((i) => i.value), 1);
  const bw = (W - PAD.l - PAD.r) / chart.items.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b - f * (H - PAD.t - PAD.b)} y2={H - PAD.b - f * (H - PAD.t - PAD.b)} className="viz-gridline" />
      ))}
      {chart.items.map((it, i) => {
        const h = (it.value / max) * (H - PAD.t - PAD.b);
        return (
          <g key={it.label}>
            <rect x={PAD.l + i * bw + 6} y={H - PAD.b - h} width={bw - 12} height={h} rx="4" fill={COLORS[i % COLORS.length]} />
            <text x={PAD.l + i * bw + bw / 2} y={H - PAD.b - h - 5} textAnchor="middle" className="chart-value">{it.value}</text>
            <text x={PAD.l + i * bw + bw / 2} y={H - 10} textAnchor="middle" className="chart-label-x">{it.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ chart }) {
  const total = chart.items.reduce((s, i) => s + i.value, 0) || 1;
  const r = 70;
  const cx = 110;
  const cy = H / 2;
  const segments = [];
  let angle = -90;
  for (const [i, it] of chart.items.entries()) {
    const a = (it.value / total) * 360;
    segments.push({ ...it, i, start: angle, end: angle + a });
    angle += a;
  }
  const arc = (a, rOut, rIn, large) => {
    const rad = (d) => (d * Math.PI) / 180;
    const p = (rr, dd) => `${cx + rr * Math.cos(rad(dd))} ${cy + rr * Math.sin(rad(dd))}`;
    return `M ${p(rOut, a.s)} A ${rOut} ${rOut} 0 ${large} 1 ${p(rOut, a.e)} L ${p(rIn, a.e)} A ${rIn} ${rIn} 0 ${large} 0 ${p(rIn, a.s)} Z`;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart">
      {segments.map((s) => {
        const large = s.end - s.start > 180 ? 1 : 0;
        const end = s.end - s.start >= 359.9 ? s.end - 0.01 : s.end;
        return <path key={s.label} d={arc({ s: s.start, e: end }, r, r * 0.58, large)} fill={COLORS[s.i % COLORS.length]} opacity="0.95" />;
      })}
      {segments.map((s, i) => (
        <g key={`l-${s.label}`}>
          <rect x="215" y={34 + i * 26} width="10" height="10" rx="2" fill={COLORS[s.i % COLORS.length]} />
          <text x="232" y={43 + i * 26} className="chart-label">{s.label} · {s.value}</text>
        </g>
      ))}
    </svg>
  );
}

function Line({ chart }) {
  const max = Math.max(...chart.items.map((i) => i.value), 1);
  const step = (W - PAD.l - PAD.r - 20) / Math.max(chart.items.length - 1, 1);
  const pts = chart.items.map((it, i) => ({
    x: PAD.l + 10 + i * step,
    y: H - PAD.b - (it.value / max) * (H - PAD.t - PAD.b),
    ...it,
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b - f * (H - PAD.t - PAD.b)} y2={H - PAD.b - f * (H - PAD.t - PAD.b)} className="viz-gridline" />
      ))}
      <polyline points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke={COLORS[0]} strokeWidth="2.5" strokeLinecap="round" />
      {pts.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="4.5" fill={COLORS[1]} stroke="#fff" strokeWidth="2" />
          <text x={p.x} y={p.y - 10} textAnchor="middle" className="chart-value">{p.value}</text>
          <text x={p.x} y={H - 10} textAnchor="middle" className="chart-label-x">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

const RENDERERS = { hbar: HBar, vbar: VBar, donut: Donut, line: Line };

export default function VizBoard() {
  const [spec, setSpec] = useState(DEFAULT_SPEC);
  const [source, setSource] = useState('default');
  const [busy, setBusy] = useState(false);

  const plan = async () => {
    setBusy(true);
    const { spec: s, source: src } = await planCharts(marketSummary(), DEFAULT_SPEC);
    if (evalSpec(s).length === 0) { setSpec(s); setSource(src); }
    setBusy(false);
  };

  return (
    <div className="viz-board">
      <div className="viz-toolbar">
        <div>
          <b>Demand visuals</b>
          <span className="viz-src">
            {source === 'default' && 'Default views'}
            {source === 'ai' && 'AI-planned'}
            {source === 'ai-reflected' && 'AI-planned · corrected after eval'}
          </span>
        </div>
        {hasKey() && (
          <button className="btn ghost" onClick={plan} disabled={busy}>
            <Icon name="sparkles" /> {busy ? 'Planning…' : 'Plan visuals with AI'}
          </button>
        )}
      </div>
      <div className="viz-cards">
        {spec.charts.map((c, i) => {
          const Chart = RENDERERS[c.type] || HBar;
          return (
            <FadeIn key={`${c.title}-${i}`} delay={i * 80}>
              <div className="viz-card">
                <b>{c.title}</b>
                <Chart chart={c} />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
