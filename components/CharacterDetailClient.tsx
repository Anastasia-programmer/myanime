'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Shield, Zap, Target, Activity, ChevronLeft, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuroraText } from '@/components/ui/aurora-text';

interface CharacterDetailClientProps {
  characterName: string;
  characterImage: string | null;
  animeTitle: string;
  animeId: string;
  personalStats: { label: string; value: string }[];
  professionalStats: { label: string; value: string }[];
  otherStats: { label: string; value: string }[];
  bio: string;
}

export default function CharacterDetailClient({
  characterName,
  characterImage,
  animeTitle,
  animeId,
  personalStats,
  professionalStats,
  otherStats,
  bio,
}: CharacterDetailClientProps) {
  const [isBioExpanded, setIsBioExpanded] = useState(false);


  const getStatIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('age') || l.includes('birth')) return <Calendar className="w-4 h-4" />;
    if (l.includes('power') || l.includes('ability')) return <Zap className="w-4 h-4" />;
    if (l.includes('rank') || l.includes('class')) return <Shield className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  const hasPersonal = personalStats && personalStats.length > 0;
  const hasProfessional = professionalStats && professionalStats.length > 0;
  const hasOther = otherStats && otherStats.length > 0;
  const defaultTab = hasPersonal ? "personal" : hasProfessional ? "professional" : "other";
  const hasAnyStats = hasPersonal || hasProfessional || hasOther;

  return (
    <div className="pt-10 relative min-h-screen bg-[#020617] text-slate-200 selection:bg-pink-500/30 overflow-x-hidden font-sans">

      {/* 1. Global Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/cv7.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617]" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size[40px_40px]" />
      </div>

      <div className="relative z-10 pt-16 md:pt-28 pb-20">
        <main className="container mx-auto px-4 sm:px-6 lg:px-12">

          {/* Breadcrumbs / Return Link */}
          <nav className="mb-10 cursor-pointer">
            <Link
              href={`/anime/${animeId}`}
              className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black italic">Back to Archive</span>
            </Link>
          </nav>

          {/* Main Info Card */}
          <div className="bg-[#030712]/60 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative mb-16">
            {/* Decorative Background Text */}


            <div className="flex flex-col lg:flex-row gap-12 relative z-10">

              {/* LEFT: CHARACTER IMAGE - Responsive size across viewports */}
              <div className="w-full lg:w-87.5 max-w-[400px] mx-auto lg:mx-0 shrink-0">
                <div className="top-28">
                  <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 group">
                    <div className="absolute -inset-1 bg-linear-to-tr from-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700" />

                    {characterImage ? (
                      <Image
                        src={characterImage}
                        alt={characterName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <User className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-pink-500 font-black">Primary Affiliation</span>
                      <span className="text-xs font-black italic uppercase text-white tracking-widest text-center">{animeTitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: DATA & STATS */}
              <div className="flex-1 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Activity className="text-pink-500 w-4 h-4" />
                    <span className="text-blue-400 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Verified Personnel Record</span>
                  </div>

                  <h1 className="text-[clamp(2.5rem,8vw,4rem)] lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                    <AuroraText colors={['#FF0080', '#7928CA', '#38bdf8', '#FF0080']}>{characterName}</AuroraText>
                  </h1>
                </div>

                {/* TABS SECTION */}
                {hasAnyStats ? (
                  <div className="w-full">
                    <Tabs defaultValue={defaultTab} className="w-full">
                      <TabsList className="bg-white/5 border border-white/10 p-1 mb-8 rounded-2xl h-auto flex flex-wrap gap-1">
                        {hasPersonal && (
                          <TabsTrigger value="personal" className="flex-1 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 text-white tracking-[0.2em] uppercase text-[9px] font-black py-3 rounded-xl transition-all duration-300">
                            Personal
                          </TabsTrigger>
                        )}
                        {hasProfessional && (
                          <TabsTrigger value="professional" className="flex-1 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 text-white tracking-[0.2em] uppercase text-[9px] font-black py-3 rounded-xl transition-all duration-300">
                            Professional
                          </TabsTrigger>
                        )}
                        {hasOther && (
                          <TabsTrigger value="other" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white tracking-[0.2em] uppercase text-[9px] font-black py-3 rounded-xl transition-all duration-300">
                            Additional
                          </TabsTrigger>
                        )}
                      </TabsList>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hasPersonal && (
                          <TabsContent value="personal" className="contents">
                            {personalStats.map((stat, i) => (
                              <StatCard key={`personal-${i}`} stat={stat} icon={getStatIcon(stat.label)} />
                            ))}
                          </TabsContent>
                        )}
                        {hasProfessional && (
                          <TabsContent value="professional" className="contents">
                            {professionalStats.map((stat, i) => (
                              <StatCard key={`prof-${i}`} stat={stat} icon={getStatIcon(stat.label)} />
                            ))}
                          </TabsContent>
                        )}
                        {hasOther && (
                          <TabsContent value="other" className="contents">
                            {otherStats.map((stat, i) => (
                              <StatCard key={`other-${i}`} stat={stat} icon={getStatIcon(stat.label)} />
                            ))}
                          </TabsContent>
                        )}
                      </div>
                    </Tabs>
                  </div>
                ) : null}

                {/* BIO SECTION */}
                <div className="relative pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500/100 mb-6 flex items-center gap-3">
                    <Info className="w-4 h-4" /> Intelligence Summary
                  </h3>

                  <div className="relative">
                    <p className={`text-slate-100 leading-relaxed text-lg font-normal selection:bg-pink-500/50 transition-all duration-500 ${!isBioExpanded ? 'line-clamp-4' : ''}`}>
                      {bio || "Archives show no available summary for this operative."}
                    </p>

                    {bio && bio.length > 200 && (
                      <button
                        onClick={() => setIsBioExpanded(!isBioExpanded)}
                        className="mt-6 cursor-pointer text-[10px] font-black uppercase tracking-widest text-pink-500 hover:text-white transition-colors border-b border-pink-500/20 pb-1"
                      >
                        {isBioExpanded ? 'Collapse Archive' : 'Read Full History'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ stat, icon }: { stat: { label: string, value: string }, icon: React.ReactNode }) {
  return (
    <div className="group relative p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/3 transition-all duration-300">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-500">
          {stat.label}
        </span>
      </div>
      <div className="text-base font-bold text-white pl-1 tracking-wide italic">
        {stat.value}
      </div>

      {/* Active Line Decoration */}
      <div className="absolute bottom-0 left-5 right-5 h-px bg-linear-to-r from-transparent via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}