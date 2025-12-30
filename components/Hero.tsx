'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TextAnimate } from './ui/text-animate';
import { ShimmerButton } from './ui/shimmer-button';
import { AuroraText } from './ui/aurora-text';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cover5.jpg"
          alt="Anime Discovery Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 md:space-y-12">
          {/* Main Title with Aurora Effect */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
              <AuroraText
                colors={['#FF0080', '#7928CA', '#0070F3', '#38bdf8', '#FF0080']}
                speed={0.8}
                className="block"
              >
                ANIME
              </AuroraText>
              <br />
              <AuroraText
                colors={['#7928CA', '#FF0080', '#38bdf8', '#0070F3', '#7928CA']}
                speed={0.9}
                className="block"
              >
                DISCOVERY
              </AuroraText>
            </h1>

            {/* Animated Subtitle */}
            <div className="pt-4">
              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                delay={0.2}
                duration={0.5}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium drop-shadow-2xl"
                startOnView={true}
                once={true}
              >
                Discover Your Next Favorite Anime Adventure
              </TextAnimate>
            </div>
          </div>

          {/* Description */}
          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            delay={0.5}
            duration={0.4}
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light drop-shadow-lg"
            startOnView={true}
            once={true}
          >
            Explore thousands of anime titles, find hidden gems, and track your favorite series all in one place
          </TextAnimate>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/search">
              <ShimmerButton
                shimmerColor="#ffffff"
                shimmerSize="0.1em"
                shimmerDuration="2s"
                borderRadius="12px"
                background="rgba(124, 58, 237, 0.8)"
                className="px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <Search className="mr-2 h-5 w-5 inline" />
                Explore Anime
              </ShimmerButton>
            </Link>

            <Link href="/trending">
              <ShimmerButton
                shimmerColor="#ffffff"
                shimmerSize="0.1em"
                shimmerDuration="2s"
                borderRadius="12px"
                background="rgba(236, 72, 153, 0.8)"
                className="px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5 inline" />
                Trending Now
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </div>

     
    </section>
  );
}

