import { useEffect, useState } from 'react';
import { Icon } from './Icons';

// A small, dependency-free image gallery with click-to-enlarge lightbox.
// `items` is an array of { image, alt, caption? }.
export default function Gallery({ items, columns = 4, className = '' }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, items.length]);

  return (
    <>
      <div className={`gallery-grid cols-${columns} ${className}`}>
        {items.map((it, i) => (
          <button
            key={it.image}
            type="button"
            className="gallery-tile"
            onClick={() => setActive(i)}
            aria-label={`View larger: ${it.alt}`}
          >
            <img src={it.image} alt={it.alt} loading="lazy" />
            {it.caption && <span className="gallery-cap">{it.caption}</span>}
            <span className="gallery-zoom"><Icon name="external" /></span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button className="lightbox-close" aria-label="Close" onClick={() => setActive(null)}>
            <Icon name="close" />
          </button>
          {items.length > 1 && (
            <>
              <button
                className="lightbox-nav prev"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + items.length) % items.length); }}
              >
                <Icon name="chevron" style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button
                className="lightbox-nav next"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % items.length); }}
              >
                <Icon name="chevron" style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={items[active].image} alt={items[active].alt} />
            {items[active].caption && <figcaption>{items[active].caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
