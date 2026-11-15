import FadeIn from '../components/FadeIn';
import { PageHero, Callout } from '../components/Shared';
import { Icon } from '../components/Icons';
import { SITE, REVIEWS } from '../data/site';

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        title={<>A contractor <em>from Sunnyside.</em></>}
        lead="Vuxa Project & Construction is a Pretoria-based contractor working across building, civil works and traffic data collection — serving Gauteng from Bourke Street, Sunnyside."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section white">
        <div className="container content-grid">
          <FadeIn>
            <div className="copy">
              <div className="eyebrow dark">Who we are</div>
              <h2>Local, hands-on, <em>accountable.</em></h2>
              <p>
                We're a working contractor, not a brochure. The business runs
                from {SITE.address.split(',')[0]}, and the work spans
                residential building, civil site works, paving, and a
                speciality most contractors don't touch: traffic data
                collection for transport and planning studies.
              </p>
              <p>
                What we won't do is quote a job we haven't looked at. Every
                engagement starts with a site visit and ends with a
                walkthrough — that discipline is why our public reviews
                mention jobs "done as we pictured".
              </p>
              <ul className="checklist">
                <li><Icon name="check" /> {SITE.rating}★ Google rating from {SITE.reviewCount} public reviews</li>
                <li><Icon name="check" /> Traffic-counts capability praised publicly by clients</li>
                <li><Icon name="check" /> Written, itemised quotes before work starts</li>
                <li><Icon name="check" /> Based in Sunnyside — the heart of our service area</li>
              </ul>
              <p className="note">
                Registrations and certifications (CIDB, NHBRC, B-BBEE level)
                are confirmed in the company's documentation pack and provided
                with formal quotes.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div>
              <div className="panel">
                <h3>Company details</h3>
                <div className="kv">
                  <div className="kv-row"><Icon name="pin" /><span><b>Address</b>{SITE.address}</span></div>
                  <div className="kv-row"><Icon name="phone" /><span><b>Phone</b><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a> · <a href="tel:+27762936840">{SITE.phoneAlt}</a></span></div>
                  <div className="kv-row"><Icon name="mail" /><span><b>Email</b>{SITE.email}</span></div>
                  <div className="kv-row"><Icon name="clock" /><span><b>Hours</b>{SITE.hours}</span></div>
                  <div className="kv-row"><Icon name="star" /><span><b>Public rating</b>{SITE.rating} / 5 · {SITE.reviewCount} Google reviews</span></div>
                </div>
              </div>
              <div className="panel">
                <h3>From public reviews</h3>
                {REVIEWS.slice(0, 2).map((r, i) => (
                  <p key={i} style={{ fontStyle: 'italic' }}>"{r.quote}"</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <Callout
        title={<>Prefer to talk it <em>through first?</em></>}
        lead="Call or WhatsApp — tell us what the site needs and we'll tell you what it takes."
      />
    </>
  );
}
