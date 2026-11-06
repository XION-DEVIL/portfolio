import { memo } from 'react';
import { STATS } from '../data';
import HlsVideo from '../components/HlsVideo';
import DevDashboard from '../components/DevDashboard';
import SectionBadge from '../components/ui/SectionBadge';
import { NumberTicker } from '../components/magicui/number-ticker';

const StatsSection = memo(() => {
  return (
    <section aria-label="Key statistics" className="relative py-16 overflow-hidden">
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
          <div className="mb-8">
            <SectionBadge>Snapshot</SectionBadge>
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-heading font-bold text-white tracking-tight mb-4">Creative Mind. AI Heart.</h2>
            <p className="text-white/60 font-body font-light text-sm max-w-md mx-auto">A quick look at the numbers behind my continuous learning and building journey.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {STATS.map(([num, label]) => (
              <div key={label as string} className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl lg:text-7xl font-body font-semibold text-foreground mb-2 tabular-nums min-w-[3ch]">{Number.isFinite(Number(num)) ? <NumberTicker value={Number(num)} /> : num}</span>
                <span className="text-white/60 font-body font-light text-sm uppercase tracking-widest">{label}</span>
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
