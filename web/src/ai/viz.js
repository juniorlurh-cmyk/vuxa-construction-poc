// AI visualization planner: the model proposes chart specs (JSON), an eval
// gate validates them against known labels/ranges, and failures are reflected
// back for one correction pass. Only validated specs render.

import { aiChat, hasKey } from './provider';
import { MARKET_LABELS } from '../data/market';

const TYPES = ['hbar', 'vbar', 'donut', 'line'];

const PROMPT = `You are a data-viz planner for a South African construction contractor website.
Given summary data about its service lines and service areas, pick the 3-4 chart types that BEST report it.

Allowed chart types: ${TYPES.join(', ')}.
Allowed item labels (use only these): ${MARKET_LABELS.join(', ')}.

Reply with JSON only: {"charts":[{"type":"...","title":"...","items":[{"label":"...","value":0-100}]}]}
Each chart needs 2-8 items. Values are scores 0-100 unless counts are stated.`;

export function evalSpec(spec) {
  const errors = [];
  if (!spec || !Array.isArray(spec.charts) || spec.charts.length === 0) {
    errors.push('spec must contain a non-empty charts array');
    return errors;
  }
  for (const [i, c] of spec.charts.entries()) {
    if (!TYPES.includes(c.type)) errors.push(`chart ${i}: bad type "${c.type}"`);
    if (!c.title) errors.push(`chart ${i}: missing title`);
    if (!Array.isArray(c.items) || c.items.length < 2 || c.items.length > 8) {
      errors.push(`chart ${i}: needs 2-8 items`);
      continue;
    }
    for (const it of c.items) {
      if (!MARKET_LABELS.includes(it.label))
        errors.push(`chart ${i}: unknown label "${it.label}"`);
      if (typeof it.value !== 'number' || it.value < 0 || it.value > 100)
        errors.push(`chart ${i}: "${it.label}" value must be 0-100`);
    }
  }
  return errors;
}

export async function planCharts(dataSummary, defaultSpec) {
  if (!hasKey()) return { spec: defaultSpec, source: 'default' };
  const messages = [
    { role: 'system', content: PROMPT },
    { role: 'user', content: `Market data:\n${dataSummary}` },
  ];
  try {
    const first = JSON.parse(await aiChat(messages, { json: true }));
    const errs = evalSpec(first);
    if (errs.length === 0) return { spec: first, source: 'ai' };
    const retry = [
      ...messages,
      { role: 'assistant', content: JSON.stringify(first) },
      { role: 'user', content: `Validation failed:\n${errs.join('\n')}\nFix and return corrected JSON only.` },
    ];
    const second = JSON.parse(await aiChat(retry, { json: true }));
    return evalSpec(second).length === 0
      ? { spec: second, source: 'ai-reflected' }
      : { spec: defaultSpec, source: 'default' };
  } catch {
    return { spec: defaultSpec, source: 'default' };
  }
}
