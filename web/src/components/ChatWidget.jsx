import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { aiChat, hasKey } from '../ai/provider';
import { SITE, wa } from '../data/site';
import { SERVICES } from '../data/services';
import { Icon } from './Icons';

const SUGGESTIONS = [
  'What services do you offer?',
  'Do you do traffic counts?',
  'Where are you based?',
  'How do I get a quote?',
];

const FAQ = [
  {
    match: /service|what.*do|offer|build|renovat|civil|pav/i,
    answer: `We cover five areas: ${SERVICES.map((s) => s.name).join(', ')}. Tell us what you're planning and we'll tell you honestly whether it fits.`,
    link: { to: '/services', label: 'All services' },
  },
  {
    match: /traffic|count|survey|transport|data/i,
    answer: 'Yes — traffic data collection is one of our speciality lines: intersection counts, classified counts and field survey teams for transport studies. A Google reviewer specifically praised our traffic-counts work.',
    link: { to: '/services#traffic', label: 'Traffic data collection' },
  },
  {
    match: /where|based|located|address|area|sunnyside/i,
    answer: `We're based at ${SITE.address}. We serve Sunnyside, Arcadia, Hatfield, the CBD, Centurion, Pretoria North and wider Gauteng.`,
    link: { to: '/contact', label: 'Contact & directions' },
  },
  {
    match: /quote|price|cost|rate|estimate/i,
    answer: `Every job is quoted after a proper look at the site — WhatsApp ${SITE.phoneDisplay} with photos and a description and we'll arrange a site visit.`,
    link: { to: '/contact', label: 'Request a quote' },
  },
  {
    match: /contact|phone|call|email|whatsapp|reach/i,
    answer: `Call or WhatsApp ${SITE.phoneDisplay} (alt: ${SITE.phoneAlt}), or email ${SITE.email}. Hours: ${SITE.hours}.`,
    link: { to: '/contact', label: 'Contact page' },
  },
  {
    match: /review|rating|trust|reliable|good/i,
    answer: `We're rated ${SITE.rating} out of 5 on Google from ${SITE.reviewCount} public reviews — our traffic-counts work gets a specific mention.`,
    link: { to: '/about', label: 'About us' },
  },
];

const FALLBACK = `I can help with services, traffic counts, service areas and how to get a quote. For anything else, WhatsApp ${SITE.phoneDisplay} or email ${SITE.email}.`;

const SYSTEM = `You are the website assistant for ${SITE.name}, a construction contractor in Sunnyside, Pretoria.
Facts: address ${SITE.address}; phone ${SITE.phoneDisplay} (alt ${SITE.phoneAlt}); email ${SITE.email}; hours ${SITE.hours}; Google rating ${SITE.rating}/5 from ${SITE.reviewCount} reviews.
Services: building & renovations; civil works & earthworks; traffic data collection (a speciality — praised in reviews); paving & external works; project support & site labour.
Keep answers short, plain and honest — never invent project names, credentials, prices or people. For quotes, direct to WhatsApp ${SITE.phoneDisplay}.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: `Hi — I'm the ${SITE.short} assistant. Ask about our services, traffic counts, or how to get a quote.` },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || busy) return;
    setInput('');
    setMsgs((m) => [...m, { from: 'user', text: q }]);
    setBusy(true);
    const faq = FAQ.find((f) => f.match.test(q));
    let reply = null;
    if (hasKey()) {
      try {
        reply = await aiChat([
          { role: 'system', content: SYSTEM },
          { role: 'user', content: q },
        ]);
      } catch { reply = null; }
    }
    if (!reply) reply = faq ? faq.answer : FALLBACK;
    setMsgs((m) => [...m, { from: 'bot', text: reply, link: faq?.link }]);
    setBusy(false);
  };

  return (
    <>
      <button
        className="chat-fab"
        aria-label={open ? 'Close assistant' : 'Chat with the Vuxa assistant'}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'close' : 'sparkles'} />
      </button>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Vuxa assistant">
          <div className="chat-head">
            <b>Vuxa assistant</b>
            <span>{hasKey() ? 'AI-powered' : 'Quick answers'}</span>
          </div>
          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                <p>{m.text}</p>
                {m.link && (
                  <Link className="chat-link" to={m.link.to}>{m.link.label} →</Link>
                )}
              </div>
            ))}
            {busy && <div className="chat-msg bot"><p className="chat-typing">Thinking…</p></div>}
            <div ref={bottomRef} />
          </div>
          <div className="chat-sugg">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={busy}>{s}</button>
            ))}
          </div>
          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, quotes…"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send" disabled={busy}>
              <Icon name="arrowRight" />
            </button>
          </form>
          <a className="chat-mail" href={wa()}>
            Prefer WhatsApp? {SITE.phoneDisplay}
          </a>
        </div>
      )}
    </>
  );
}
