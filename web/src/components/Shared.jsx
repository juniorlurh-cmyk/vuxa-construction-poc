import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { Icon } from './Icons';
import { wa } from '../data/site';

export function PageHero({ title, lead, crumbs, image }) {
  return (
    <section className="page-hero">
      {image && <img className="bg-img" src={image} alt="" aria-hidden="true" />}
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
              {i > 0 && <Icon name="arrowRight" />}
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

export function Callout({ title, lead, cta }) {
  const c = cta || { to: wa('Hi Vuxa — I would like a quote for a project.'), label: 'Get a free quote', icon: 'whatsapp' };
  const isExternal = c.to.startsWith('http') || c.to.startsWith('mailto:');
  return (
    <section className="callout">
      <div className="container">
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink)' }}>Ready when you are</div>
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
        <FadeIn>
          {isExternal ? (
            <a className="btn dark" href={c.to} target={c.to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {c.icon && <Icon name={c.icon} />} {c.label}
            </a>
          ) : (
            <Link className="btn dark" to={c.to}>
              {c.icon && <Icon name={c.icon} />} {c.label}
            </Link>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

export function Heading({ eyebrow, title, aside }) {
  return (
    <div className="heading">
      <div>
        <div className="eyebrow dark">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {aside && <p>{aside}</p>}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details className="faq-item" key={f.q}>
          <summary>
            {f.q}
            <Icon name="chevron" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
