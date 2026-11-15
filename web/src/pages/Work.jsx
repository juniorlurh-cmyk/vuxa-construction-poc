import FadeIn from '../components/FadeIn';
import { PageHero, Callout } from '../components/Shared';
import { SERVICES } from '../data/services';

const AREAS = [
  {
    name: 'Sunnyside',
    alt: 'Esselen Street toward Bronberg Church, Sunnyside, Pretoria',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Esselenstraat_tot_Bronbergkerk%2C_Sunnyside.jpg/1280px-Esselenstraat_tot_Bronbergkerk%2C_Sunnyside.jpg',
    credit: 'JMK', license: 'CC BY-SA 3.0',
  },
  {
    name: 'Arcadia',
    alt: 'Jacaranda-lined streets in Arcadia, Pretoria',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Jacaranda_Trees_Pretoria.jpg',
    credit: 'Hein waschefort', license: 'CC BY-SA 3.0',
  },
  {
    name: 'Hatfield',
    alt: 'Park and Glyn streets, Hatfield, Pretoria',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Park_%26_Glyn%2C_Pretoria%2C_South_Africa.jpg/1280px-Park_%26_Glyn%2C_Pretoria%2C_South_Africa.jpg',
    credit: 'Gsalamander', license: 'CC BY-SA 4.0',
  },
  {
    name: 'Muckleneuk',
    alt: 'View from Muckleneuk toward the Pretoria CBD',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Telkom_Tower_view_from_Muckleneuk.jpg',
    credit: 'Ossewa', license: 'CC BY-SA 4.0',
  },
];

export default function Work() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Our Work' }]}
        title={<>The kind of work <em>we take on.</em></>}
        lead="An honest view of the work we do — the service lines, the neighbourhoods, and the standard clients have rated publicly."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section white">
        <div className="container">
          <FadeIn>
            <div className="heading">
              <div>
                <div className="eyebrow dark">Service lines</div>
                <h2>Representative <em>work.</em></h2>
              </div>
              <p>Representative project types per service line — actual site photography and a named portfolio are being compiled with the owner.</p>
            </div>
          </FadeIn>
          <div className="work-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.id} delay={(i % 3) * 70}>
                <div className="work">
                  <img src={s.image} alt={s.name} loading="lazy" />
                  <div className="work-cap">
                    <small>{s.tag}</small>
                    <b>{s.name}</b>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="note">
            Stock photography shown for layout only — a contractor's real
            portfolio is its own site photos, which replace these before the
            site goes public-facing.
          </p>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <FadeIn>
            <div className="heading">
              <div>
                <div className="eyebrow dark">The ground we cover</div>
                <h2>Real Pretoria, <em>real context.</em></h2>
              </div>
              <p>The neighbourhoods we actually work in — licensed photographs via Wikimedia Commons.</p>
            </div>
          </FadeIn>
          <div className="area-grid">
            {AREAS.map((a, i) => (
              <FadeIn key={a.name} delay={(i % 4) * 60}>
                <figure className="area-card">
                  <img src={a.image} alt={a.alt} loading="lazy" />
                  <figcaption>
                    <b>{a.name}</b>
                    <span>Photo: {a.credit} · {a.license}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Callout
        title={<>Your project could be <em>the next one.</em></>}
        lead="Send us the site details — we'll tell you honestly what's involved."
      />
    </>
  );
}
