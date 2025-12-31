'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Info, Sparkles, Calendar, Users, ChevronLeft, Shield, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CharacterDetailClientProps {
  characterName: string;
  characterImage: string | null;
  animeTitle: string;
  animeBackgroundImage: string | null;
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
  animeBackgroundImage,
  animeId,
  personalStats,
  professionalStats,
  otherStats,
  bio,
}: CharacterDetailClientProps) {

  const getStatIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('age') || l.includes('birth')) return <Calendar className="w-4 h-4" />;
    if (l.includes('power') || l.includes('ability')) return <Zap className="w-4 h-4" />;
    if (l.includes('rank') || l.includes('class')) return <Shield className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  // Logic to determine which tabs to show
  const hasPersonal = personalStats && personalStats.length > 0;
  const hasProfessional = professionalStats && professionalStats.length > 0;
  const hasOther = otherStats && otherStats.length > 0;

  // Determine which tab should be active by default
  const defaultTab = hasPersonal ? "personal" : hasProfessional ? "professional" : "other";

  // If no stats at all, we'll handle that too
  const hasAnyStats = hasPersonal || hasProfessional || hasOther;

  return (
    <div className="relative min-h-screen bg-[#111] text-slate-200 selection:bg-[#FBBF24]/30 overflow-x-hidden">

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 z-0">
        <Image
          src={animeBackgroundImage || "/cv7.jpg"}
          alt="Background"
          fill
          className="object-cover opacity-10 scale-110 blur-[2px]"
          priority
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FBBF24]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-8">
          <Link
            href={`/anime/${animeId}`}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FBBF24]/50 group-hover:bg-[#FBBF24]/10 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Back to Database</span>
          </Link>
        </nav>

        <main className="container mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* LEFT COLUMN: Image */}
            <div className="lg:col-span-5 sticky top-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="relative z-10 group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#FBBF24] to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                    {characterImage ? (
                      <Image src={characterImage} alt={characterName} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Users className="w-20 h-20 text-slate-800" /></div>
                    )}
                  </div>
                  <div className="absolute -bottom-4 -right-4">
                    <div className="bg-[#FBBF24] text-black px-6 py-3 rounded-xl shadow-2xl border border-yellow-400/50 flex flex-col">
                      <span className="text-[10px] uppercase tracking-tighter opacity-80 font-bold">Featured In</span>
                      <span className="text-sm font-black italic uppercase whitespace-nowrap">{animeTitle}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Info */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-[#FBBF24]" />
                  <span className="text-[#FBBF24] font-mono tracking-[0.4em] uppercase text-xs font-bold">Character Profile</span>
                </div>
                <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
                  {characterName}
                </h1>
              </motion.div>

              {/* TABS SECTION WITH CONDITIONAL RENDERING */}
              {hasAnyStats ? (
                <div className="w-full">
                  <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
                      {hasPersonal && (
                        <TabsTrigger value="personal" className="data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black tracking-widest uppercase text-[10px] font-bold">Personal</TabsTrigger>
                      )}
                      {hasProfessional && (
                        <TabsTrigger value="professional" className="data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black tracking-widest uppercase text-[10px] font-bold">Professional</TabsTrigger>
                      )}
                      {hasOther && (
                        <TabsTrigger value="other" className="data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black tracking-widest uppercase text-[10px] font-bold">Details</TabsTrigger>
                      )}
                    </TabsList>

                    <AnimatePresence mode="wait">
                      {hasPersonal && (
                        <TabsContent key="personal-tab" value="personal" className="grid grid-cols-2 gap-4 outline-none">
                          {personalStats.map((stat, i) => (
                            <StatCard key={`personal-${i}`} stat={stat} icon={getStatIcon(stat.label)} delay={i} />
                          ))}
                        </TabsContent>
                      )}

                      {hasProfessional && (
                        <TabsContent key="professional-tab" value="professional" className="grid grid-cols-2 gap-4 outline-none">
                          {professionalStats.map((stat, i) => (
                            <StatCard key={`prof-${i}`} stat={stat} icon={getStatIcon(stat.label)} delay={i} />
                          ))}
                        </TabsContent>
                      )}

                      {hasOther && (
                        <TabsContent key="other-tab" value="other" className="grid grid-cols-2 gap-4 outline-none">
                          {otherStats.map((stat, i) => (
                            <StatCard key={`other-${i}`} stat={stat} icon={getStatIcon(stat.label)} delay={i} />
                          ))}
                        </TabsContent>
                      )}
                    </AnimatePresence>
                  </Tabs>
                </div>
              ) : null}

              {/* BIO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-12 h-12 text-[#FBBF24]" /></div>
                <h3 className="text-xl font-black italic uppercase text-white mb-6 flex items-center gap-3">
                  <Info className="w-5 h-5 text-[#FBBF24]" />
                  Archive History
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-400 leading-relaxed text-lg font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#FBBF24] first-letter:mr-3 first-letter:float-left">
                    {bio || "No biography available in the current archive records."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ stat, icon, delay }: { stat: { label: string, value: string }, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * delay }}
      className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#FBBF24]/50 hover:bg-[#FBBF24]/[0.05] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24] group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 group-hover:text-[#FBBF24] transition-colors">{stat.label}</span>
      </div>
      <div className="text-lg font-bold text-white pl-1 font-mono">{stat.value}</div>
    </motion.div>
  );
}