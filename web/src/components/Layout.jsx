import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, tel, wa, mailto } from '../data/site';
import { SERVICES } from '../data/services';
import { Icon } from './Icons';
import ChatWidget from './ChatWidget';

function Topbar() {
  return (
    <div className="topline">
      <div className="container">
        <span>{SITE.city} · Gauteng</span>
        <div className="topline-right">
          <span>{SITE.hours}</span>
          <a href={tel()}>{SITE.phoneDisplay}</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" to="/" aria-label="Vuxa Project & Construction home">
          <span className="brand-mark">V</span>
          <span className="brand-name">
            VUXA PROJECT & CONSTRUCTION
            <small>SUNNYSIDE · PRETORIA</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav
          className={`nav-links ${open ? 'open' : ''}`}
          aria-label="Main navigation"
          onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}
        >
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/work">Our Work</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <a className="btn" href={wa('Hi Vuxa — I would like a quote for a project.')}>
          <Icon name="whatsapp" /> Get a quote
        </a>
      </div>
    </header>
  );
}

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand" to="/">
              <span className="brand-mark">V</span>
              <span className="brand-name">
                VUXA PROJECT & CONSTRUCTION
                <small>SUNNYSIDE · PRETORIA</small>
              </span>
            </Link>
            <p>
              A Sunnyside-based contractor serving Pretoria and Gauteng —
              building work, civil works, paving and traffic data collection.
              Rated {SITE.rating} on Google.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <div className="flinks">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/work">Our work</Link>
              <Link to="/insights">Insights</Link>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <div className="flinks">
              {SERVICES.map((s) => (
                <Link key={s.id} to={`/services#${s.id}`}>{s.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="flinks">
              <a href={tel()}>{SITE.phoneDisplay}</a>
              <a href={tel().replace(SITE.phoneTel, '+27762936840')}>{SITE.phoneAlt}</a>
              <a href={mailto('Project enquiry — Vuxa P&C')}>{SITE.email}</a>
              <span>{SITE.address}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {YEAR} {SITE.name} · All rights reserved</span>
          <span>Prototype — facts verified against public listings; details pending owner confirmation</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <Topbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
