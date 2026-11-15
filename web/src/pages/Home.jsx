import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { Callout, Heading } from '../components/Shared';
import { Icon } from '../components/Icons';
import { SITE, REVIEWS, wa } from '../data/site';
import { SERVICES, PROCESS, SERVICE_AREAS } from '../data/services';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="eyebrow">Sunnyside · Pretoria · Gauteng</div>
        <h1>
          Built right.<br />
          <em>Done as pictured.</em>
        </h1>
        <p className="hero-copy">
          A Pretoria contractor for building work, civil works, paving and
          traffic data collection — the kind of jobs where the details decide
          whether it lasts. Rated {SITE.rating} on Google.
        </p>
        <div className="hero-actions">
          <a className="btn" href={wa('Hi Vuxa — I would like a quote for a project.')} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> Get a free quote
          </a>
          <Link className="btn outline-light" to="/work">
            See what we do
          </Link>
        </div>
        <div className="hero-note">
          <span><b>{SITE.rating}★</b> Google rating</span>
          <span><b>Sunnyside</b> based</span>
          <span><b>5</b> service lines</span>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, i }) {
  return (
    <FadeIn delay={(i % 3) * 70}>
      <div className="svc" id={svc.id}>
        <div className="svc-ico"><Icon name={svc.icon} /></div>
        <small>{svc.tag}</small>
        <h3>{svc.name}</h3>
        <p>{svc.desc}</p>
        <ul>
          {svc.points.map((p) => (
            <li key={p}><Icon name="check" /> {p}</li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section white" id="services">
        <div className="container">
          <FadeIn>
            <Heading
              eyebrow="What we do"
              title={<>Five lines of work,<br /><em>one standard.</em></>}
              aside="Every service line gets the same treatment: scoped properly, quoted in writing, built to be walked through on handover."
            />
          </FadeIn>
          <div className="svc-grid">
            {SERVICES.map((s, i) => <ServiceCard key={s.id} svc={s} i={i} />)}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <FadeIn>
            <Heading
              eyebrow="How we work"
              title={<>No surprises <em>on site.</em></>}
              aside="The process is the product — most construction problems are process problems."
            />
          </FadeIn>
          <FadeIn>
            <div className="process">
              {PROCESS.map((p) => (
                <div className="process-step" key={p.n}>
                  <b>{p.n}</b>
                  <h4>{p.t}</h4>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <FadeIn>
            <Heading
              eyebrow="Public record"
              title={<>Rated by the people <em>we've built for.</em></>}
              aside="Actual excerpts from our public Google reviews — not curated testimonials we wrote ourselves."
            />
          </FadeIn>
          <div className="review-band" style={{ background: 'var(--navy)', borderRadius: 'var(--radius)', padding: '34px' }}>
            <div className="rating-big">
              <b>{SITE.rating}</b>
              <div className="stars">★★★★★</div>
              <span>{SITE.reviewCount} Google reviews</span>
            </div>
            <div className="quotes">
              {REVIEWS.map((r, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="quote">
                    <p>"{r.quote}"</p>
                    <span>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)} · Google review</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <FadeIn>
            <Heading
              eyebrow="Where we work"
              title={<>Pretoria first, <em>Gauteng wide.</em></>}
              aside="Based on Bourke Street in Sunnyside — close to the suburbs where most of our work happens."
            />
          </FadeIn>
          <FadeIn>
            <div className="chip-row" style={{ marginTop: 0 }}>
              {SERVICE_AREAS.map((a) => <span className="chip" key={a}>{a}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      <Callout
        title={<>Have a site that <em>needs work?</em></>}
        lead="WhatsApp us photos and a description — we'll come look and give you a written quote."
      />
    </>
  );
}
