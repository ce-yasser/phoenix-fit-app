import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// Ember particle field — generated once per mount, not on every render.
function useEmbers(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  );
}

export default function NotFound() {
  const embers = useEmbers(22);

  return (
    <main className="pf-404">
      <div className="pf-404__embers" aria-hidden="true">
        {embers.map((e) => (
          <span
            key={e.id}
            className="pf-404__ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="pf-404__glow" aria-hidden="true" />

      <div className="pf-container pf-404__inner">
        {/* Swap for /assets/phoenix-fit-logo-transparent.png once hosted */}
        <img className="pf-404__logo" src="/logo.png" alt="Phoenix Fit" />

        <p className="pf-404__code" aria-hidden="true">
          404
        </p>

        <h1 className="pf-404__title">This page burned out.</h1>
        <p className="pf-404__subtitle">
          Even a phoenix can&rsquo;t rise from a broken link. The page
          you&rsquo;re looking for has already turned to ash — but the
          championship hasn&rsquo;t.
        </p>

        <div className="pf-404__actions">
          <Link to="/" className="pf-btn">
            Back to Home
          </Link>
        </div>

        <Link to="/competition" className="pf-404__link">
          Or jump straight to registration &rarr;
        </Link>
      </div>
    </main>
  );
}
