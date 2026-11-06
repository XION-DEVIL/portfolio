import { memo } from "react";
import { STATS } from "../data";
import HlsVideo from "../components/HlsVideo";
import DevDashboard from "../components/DevDashboard";
import SectionBadge from "../components/ui/SectionBadge";

const StatsSection = memo(() => {
  return (
    <section
      aria-label="Key statistics and achievements"
      className="relative py-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HlsVideo
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="w-full h-full object-cover"
          desaturated
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        <div className="py-6 md:py-12 text-center">
          <div className="mb-10 md:mb-12">
            <SectionBadge>Snapshot</SectionBadge>
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-heading font-bold text-white tracking-tight mb-4">
              Creative Mind. AI Heart.
            </h2>
            <p className="text-white/60 font-body font-light text-sm max-w-md mx-auto">
              Impactful metrics, verified hackathon victories, and technical competition
              achievements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="liquid-glass p-6 md:p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-white font-heading font-bold text-base sm:text-lg leading-tight mb-1.5">
                  {stat.label}
                </span>
                <span className="text-white/50 font-body font-light text-xs leading-relaxed max-w-[200px]">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
          <DevDashboard />
        </div>
      </div>
    </section>
  );
});

export default StatsSection;
