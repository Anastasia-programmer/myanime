'use client';

import Link from 'next/link';
import { StaticHeroButton } from './ui/StaticHeroButton';
import { Search, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { AuroraText } from './ui/aurora-text';

export default function Hero() {
  const scrollToDiscover = () => {
    const element = document.getElementById('discover');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-20 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-6 md:space-y-10">

          {/* Main Title Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-pink-500/50" />
              <span className="text-pink-400 font-mono tracking-[0.4em] uppercase text-xs font-bold drop-shadow-lg">
                Awaken your spirit...
              </span>
              <span className="h-[1px] w-8 bg-pink-500/50" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
                <AuroraText
                  colors={['#FF0080', '#7928CA', '#0070F3', '#38bdf8', '#FF0080']}
                  speed={0.8}
                  className="block"
                >
                  YOUR NEXT
                </AuroraText>
                <br />
                <AuroraText
                  colors={['#7928CA', '#FF0080', '#38bdf8', '#0070F3', '#7928CA']}
                  speed={0.9}
                  className="block"
                >
                  OBSESSION AWAITS
                </AuroraText>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="pt-6">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-black italic uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Where Every Story Becomes a Legend.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-black/20 blur-2xl rounded-full" />
            <p className="relative text-base sm:text-lg md:text-xl text-slate-50 leading-relaxed drop-shadow-md px-4 font-medium italic">
              Whether you seek <span className="text-[#FF0080] font-bold drop-shadow-[0_0_8px_rgba(255,0,128,0.4)]">epic battles</span> that shake the heavens, <span className="text-[#38bdf8] font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">quiet moments</span> that heal the heart, or <span className="text-[#7928CA] font-bold drop-shadow-[0_0_8px_rgba(121,40,202,0.4)]">mysteries</span> that haunt your thoughts... Your perfect story is waiting.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col mb-1 sm:flex-row items-center justify-center ">
            <Link href="/categories">
              <StaticHeroButton
                background="rgba(236, 72, 153, 0.1)"
                className="border border-pink-500/50 backdrop-blur-md hover:bg-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)] text-lg"
              >
                <Search className="mr-2 h-5 w-5 inline text-pink-400" />
                Start Exploring
              </StaticHeroButton>
            </Link>
          </div>

          <motion.button
            onClick={scrollToDiscover}
            className="relative mx-auto block text-white/30 hover:text-white/60 transition-colors cursor-pointer z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-10 h-10" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}