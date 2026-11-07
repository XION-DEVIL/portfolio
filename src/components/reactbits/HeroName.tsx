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
      density={3}
      fontSize="clamp(1.8rem, 5.8vw, 5.8rem)"
      fontWeight={800}
      fontFamily="'JetBrains Mono', monospace"
      glow={false}
      idleDrift={0.5}
      pointerRepel={35}
      repelRadius={85}
      clickBurst={true}
      gatherDuration={900}
      stagger={180}
    />
  );
}

