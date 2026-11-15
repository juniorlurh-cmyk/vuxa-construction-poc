import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import { PageHero } from '../components/Shared';
import { Icon } from '../components/Icons';
import VizBoard from '../components/VizBoard';
import { aiChat, hasKey } from '../ai/provider';
import { DEMAND, SERVICE_MIX, SIGNALS, marketSummary } from '../data/market';
import { SITE } from '../data/site';

const BRIEF_PROMPT = `You are a business analyst writing a short internal briefing for ${SITE.name}, a Sunnyside, Pretoria contractor (building, civils, paving, traffic data collection, project support; Google rating ${SITE.rating}/5).
Given the indicative demand data below, write 3 short sections: (1) Where the work is, (2) What to watch, (3) One practical next step for the strongest service lines. Plain text, short paragraphs, no hype, no invented figures.`;

function exportReport(briefing) {
  const mixRows = SERVICE_MIX.map((s) => `<tr><td>${s.name}</td><td>${s.demand}</td><td>${s.note}</td></tr>`).join('');
  const demRows = DEMAND.map((d) => `<tr><td>${d.area}</td><td>${d.building}</td><td>${d.civils}</td><td>${d.paving}</td><td>${d.traffic}</td></tr>`).join('');
  const sigRows = SIGNALS.map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Vuxa market report</title>
<style>body{font-family:Arial,sans-serif;max-width:760px;margin:40px auto;color:#0a0d14;padding:0 20px}h1{font-size:26px}h2{font-size:17px;margin-top:32px;border-bottom:2px solid #e8a020;padding-bottom:6px}table{width:100%;border-collapse:collapse;font-size:13.5px}td,th{padding:8px 10px;border-bottom:1px solid #ddd;text-align:left}th{background:#e9ebef}.note{font-size:12px;color:#666;margin-top:24px}</style></head><body>
<h1>${SITE.name} — market report</h1>
<p>Generated ${new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })} · Indicative data, not audited market intelligence.</p>
<h2>Service-line demand</h2><table><tr><th>Line</th><th>/100</th><th>Note</th></tr>${mixRows}</table>
<h2>Demand by area</h2><table><tr><th>Area</th><th>Building</th><th>Civils</th><th>Paving</th><th>Traffic</th></tr>${demRows}</table>
<h2>Public signals</h2><table>${sigRows}</table>
${briefing ? `<h2>AI briefing</h2><p style="white-space:pre-wrap">${briefing}</p>` : ''}
<p class="note">${SITE.name} · ${SITE.address} · ${SITE.phoneDisplay}</p></body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'vuxa-market-report.html';
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Insights() {
  const [briefing, setBriefing] = useState('');
  const [busy, setBusy] = useState(false);

  const genBriefing = async () => {
    setBusy(true);
    try {
      const out = await aiChat([
        { role: 'system', content: BRIEF_PROMPT },
        { role: 'user', content: marketSummary() },
      ]);
      setBriefing(out);
    } catch {
      setBriefing('Briefing generation failed — try again.');
    }
    setBusy(false);
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]}
        title={<>Market <em>insights.</em></>}
        lead="An internal view of where demand sits across our service lines and service areas — built for planning, clearly labelled indicative."
      />
      <section className="section white">
        <div className="container">
          <FadeIn>
            <div className="heading">
              <div>
                <div className="eyebrow dark">Service lines</div>
                <h2>Where the demand <em>sits.</em></h2>
              </div>
              <button className="btn ghost" onClick={() => exportReport(briefing)}>
                <Icon name="doc" /> Export report
              </button>
            </div>
          </FadeIn>
          <div className="demand-wrap">
            <table className="demand-table">
              <thead>
                <tr><th>Service line</th><th>Demand /100</th><th>Note</th></tr>
              </thead>
              <tbody>
                {SERVICE_MIX.map((s) => (
                  <tr key={s.name}>
                    <td><b>{s.name}</b></td>
                    <td>
                      <div className="demand-bar"><i style={{ width: `${s.demand}%` }} /></div>
                      <span className="demand-num">{s.demand}</span>
                    </td>
                    <td className="demand-note">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container content-grid">
          <FadeIn>
            <div>
              <div className="eyebrow dark">By area</div>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,42px)', margin: '10px 0 18px', textTransform: 'uppercase' }}>Demand across <em>service areas.</em></h2>
              <div className="demand-wrap">
                <table className="demand-table">
                  <thead>
                    <tr><th>Area</th><th>Building</th><th>Civils</th><th>Paving</th><th>Traffic</th></tr>
                  </thead>
                  <tbody>
                    {DEMAND.map((d) => (
                      <tr key={d.area}>
                        <td><b>{d.area}</b></td>
                        {['building', 'civils', 'paving', 'traffic'].map((k) => (
                          <td key={k}><span className="demand-num">{d[k]}</span></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div>
              <div className="panel">
                <h3>Public signals</h3>
                <div className="kv">
                  {SIGNALS.map((s) => (
                    <div className="kv-row" key={s.label}>
                      <Icon name="check" />
                      <span><b>{s.label}</b>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {hasKey() && (
                <div className="panel">
                  <h3>AI market briefing</h3>
                  <p>Generate a short analyst read of this data for internal discussion.</p>
                  <button className="btn" onClick={genBriefing} disabled={busy}>
                    <Icon name="sparkles" /> {busy ? 'Generating…' : 'Generate briefing'}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
        {briefing && (
          <div className="container" style={{ marginTop: 28 }}>
            <FadeIn>
              <div className="briefing">
                <b>AI briefing</b>
                <p>{briefing}</p>
              </div>
            </FadeIn>
          </div>
        )}
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="heading">
              <div>
                <div className="eyebrow dark">Visualised</div>
                <h2>Charts, chosen by the <em>model.</em></h2>
              </div>
              <p>The model picks which chart types best report this data; an eval gate validates every spec before it renders.</p>
            </div>
          </FadeIn>
          <VizBoard />
          <p className="note">
            Scores are indicative internal estimates plus public signals —
            for planning discussion, not audited market intelligence.
          </p>
        </div>
      </section>
    </>
  );
}
