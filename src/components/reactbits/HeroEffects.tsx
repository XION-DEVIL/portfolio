// Browser-only wrappers for the hero effects (loaded lazily, never on the server).
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import LanyardRaw from "./Lanyard";
import ParticleTextRaw from "./ParticleText";

// The source components are untyped JS; give them permissive prop types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = ComponentType<Record<string, any>>;
const Lanyard = LanyardRaw as unknown as Loose;
const ParticleText = ParticleTextRaw as unknown as Loose;

// Draws a personal ID badge on a canvas so no external images are used.
function useBadge() {
  const [badge, setBadge] = useState<{ front: string; back: string } | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}profile.jpg`;
    const draw = (photo: HTMLImageElement | null) => {
      const W = 800,
        H = 1125;
      const make = (back: boolean) => {
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const g = c.getContext("2d")!;
        g.fillStyle = "#0b0b14";
        g.fillRect(0, 0, W, H);
        if (photo) {
          // Photo fills the whole card (cover crop, focused near the top).
          const s = Math.max(W / photo.width, H / photo.height);
          const dw = photo.width * s,
            dh = photo.height * s;
          g.drawImage(photo, (W - dw) / 2, Math.min(0, (H - dh) * 0.2), dw, dh);
        }
        void back;
        return c.toDataURL("image/jpeg", 0.92);
      };
      setBadge({ front: make(false), back: make(true) });
    };
    img.onload = () => draw(img);
    img.onerror = () => draw(null);
  }, []);
  return badge;
}

export function HeroBadge() {
  const badge = useBadge();
  if (!badge) return null;
  return (
    <Lanyard
      frontImage={badge.front}
      backImage={badge.back}
      finish="glossy"
      metal="black"
      strapColor="#0a0a0a"
      cardColor="#0b0b14"
      size={0.64}
      strapLength={0.2}
      breeze={0.3}
      intro={false}
    />
  );
}

export function HeroName() {
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
