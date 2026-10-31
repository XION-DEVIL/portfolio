// Site-wide HUD crosshair cursor (browser-only, loaded lazily after the first mouse move).
import type { ComponentType } from 'react';
import CrosshairRaw from './Crosshair';

// The source component is untyped JS; give it permissive prop types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Crosshair = CrosshairRaw as unknown as ComponentType<Record<string, any>>;

export default function SiteCursor() {
  return (
    <Crosshair
      color="#a5b4fc"
      thickness={0.75}
      opacity={0.6}
      smoothing={0.25}
      targetEffect="lock"
      targetSelector="a, button, [role='button'], .cursor-target, [data-crosshair-target]"
      showCoordinates
    />
  );
}
