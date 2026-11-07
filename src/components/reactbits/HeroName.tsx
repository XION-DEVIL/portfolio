import type { ComponentType } from "react";
import ParticleTextRaw from "./ParticleText";

// Permissive prop types for the untyped canvas component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = ComponentType<Record<string, any>>;
const ParticleText = ParticleTextRaw as unknown as Loose;

export default function HeroName() {
  return (
    <ParticleText
      text="Sahaya Savari F"
      color="#ffffff"
      highlightColor="#818cf8"
      highlightMode="motion"
      intro="gather"
      trigger="mount"
      particleSize={2}
      density={2}
      fontSize="clamp(2rem, 6.2vw, 6.2rem)"
      fontWeight={800}
      fontFamily="'JetBrains Mono', monospace"
      glow
    />
  );
}

