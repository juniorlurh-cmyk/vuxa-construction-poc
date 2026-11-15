import FadeIn from '../components/FadeIn';
import { PageHero, Callout } from '../components/Shared';
import { Icon } from '../components/Icons';
import { SERVICES } from '../data/services';
import { wa } from '../data/site';

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title={<>What we <em>build.</em></>}
        lead="Five service lines — from residential building work to the traffic-data collection our clients publicly rate us for. Scoped properly, quoted in writing."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section white">
        <div className="container">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id}>
              <div
                className="split"
                id={s.id}
                style={{ marginBottom: i < SERVICES.length - 1 ? 64 : 0, direction: i % 2 ? 'rtl' : 'ltr' }}
              >
                <img src={s.image} alt={s.name} loading="lazy" style={{ direction: 'ltr' }} />
                <div className="copy" style={{ direction: 'ltr' }}>
                  <div className="eyebrow dark">{s.tag}</div>
                  <h2>{s.name}</h2>
                  <p>{s.desc}</p>
                  <ul className="checklist">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" /> {p}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: 20 }}>
                    <a className="btn ghost" href={wa(`Hi Vuxa — I'd like to discuss ${s.name.toLowerCase()} work.`)} target="_blank" rel="noopener noreferrer">
                      <Icon name="whatsapp" /> Ask about this
                    </a>
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
          <p className="note">
            Service scope confirmed per job — capability details (teams,
            equipment, contract size) are discussed on enquiry.
          </p>
        </div>
      </section>
      <Callout
        title={<>Not sure which service <em>your job needs?</em></>}
        lead="Describe the site — we'll tell you honestly what it takes and whether we're the right team."
      />
    </>
  );
}
