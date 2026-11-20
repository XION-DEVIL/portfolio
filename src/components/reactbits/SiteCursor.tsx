// Site-wide particle swarm cursor (browser-only, loaded lazily after the first mouse move on desktop).
import SwarmCursor from "./SwarmCursor";

export default function SiteCursor() {
  return (
    <SwarmCursor
      className="fixed inset-0 pointer-events-none z-[9999]"
      count={320}
      size={2.4}
      shape="dot"
      spread={80}
      speed={1}
      swirl={0.65}
      tail={0.5}
      trail={0.6}
      wander={0.4}
      depth={0.6}
      color="#a5b4fc"
      accentColor="#38bdf8"
      clickEffect="burst"
      idle="roam"
      targets="a, button, [role='button'], input, textarea, select, .cursor-target, [data-swarm-target], [data-crosshair-target]"
    />
  );
}
