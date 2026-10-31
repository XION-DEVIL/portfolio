import type { ReactNode } from 'react';

/** Lightweight marquee with hover, keyboard and reduced-motion pause states. */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="technology-marquee" aria-hidden="true">
      <div className="technology-marquee-track">
        <div className="technology-marquee-group">{children}</div>
        <div className="technology-marquee-group">{children}</div>
      </div>
    </div>
  );
}