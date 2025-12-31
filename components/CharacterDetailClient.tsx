'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Info, Sparkles, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface CharacterDetailClientProps {
  characterName: string;
  characterImage: string | null;
  animeTitle: string;
  animeId: string;
  stats: { label: string; value: string }[];
  bio: string;
}

export default function CharacterDetailClient({
  characterName,
  characterImage,
  animeTitle,
  animeId,
  stats,
  bio,
}: CharacterDetailClientProps) {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden">
      
      {/* Animated Background - Same as home page */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/cover5.jpg"
          alt="Anime Discovery Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay - Same as home page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link 
            href={`/anime/${animeId}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.div>
            <span className="text-sm font-medium">Back to {animeTitle}</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Side - Character Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4"
              >
                <div className="sticky top-8">
                  <motion.div 
                    className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {characterImage ? (
                      <>
                        <Image
                          src={characterImage}
                          alt={characterName}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-500">
                        <Users className="w-24 h-24" />
                      </div>
                    )}
                    
                    {/* Glowing border effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-50 blur-xl pointer-events-none"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Decorative corner accents */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Character Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                  
                  {/* Header */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </motion.div>
                      <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black">Character Profile</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter italic uppercase leading-none mb-4 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
                      {characterName}
                    </h1>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">From {animeTitle}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats Grid */}
                  {stats.length > 0 && (
                    <div className="mb-12">
                      <div className="flex items-center gap-2 mb-6">
                        <Info className="w-4 h-4 text-blue-400" />
                        <h2 className="text-xs uppercase tracking-widest font-black text-white/60">Characteristics</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-5 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden h-28 flex flex-col"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-300 rounded-xl" />
                            <div className="relative z-10 flex flex-col h-full">
                              <div className="w-1 h-1 rounded-full bg-blue-500 mb-2" />
                              <p className="text-[9px] uppercase tracking-widest text-blue-400/80 font-bold mb-2 flex-shrink-0">
                                {stat.label}
                              </p>
                              <p className="text-sm text-white font-semibold leading-tight line-clamp-3 flex-1 overflow-hidden">
                                {stat.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Biography */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                      <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Info size={16} className="text-blue-400" />
                      </div>
                      <h3 className="text-xs uppercase tracking-widest font-black text-white/60">Biography / History</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
                    </div>
                    <div className="relative">
                      <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent rounded-full" />
                      <p className="text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap pl-6">
                        {bio || "No detailed biography available for this character in the current database."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

