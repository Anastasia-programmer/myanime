'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuroraText } from '@/components/ui/aurora-text';
import { Play, Star, User, Activity, Clock, Layers, Info, Users, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

interface AnimeDetailPageClientProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    anime: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    characters: any;
    id: string;
}

export default function AnimeDetailPageClient({ anime, categories, characters, id }: AnimeDetailPageClientProps) {
    const [showAllCharacters, setShowAllCharacters] = useState(false);
    const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

    if (!anime) return null;

    const {
        canonicalTitle, posterImage, synopsis, status,
        episodeCount, episodeLength, titles,
        averageRating, youtubeVideoId, ageRating, ageRatingGuide
    } = anime.attributes;

    const allCharacters = (characters?.included || []).filter((item: { type: string }) => item.type === 'characters');
    const displayedCharacters = showAllCharacters ? allCharacters : allCharacters.slice(0, 4);
    const ratingValue = parseFloat(averageRating || '0') / 10;

    // What to Expect Intelligence Panel - Deterministic Logic
    const getTone = () => {
        const categoryTitles = (categories || []).map((cat: { attributes: { title: string } }) =>
            cat.attributes.title.toLowerCase()
        );

        if (categoryTitles.some(t => ['horror', 'thriller', 'psychological'].includes(t))) return 'Dark & Intense';
        if (categoryTitles.some(t => ['comedy', 'slice of life'].includes(t))) return 'Light & Fun';
        if (categoryTitles.some(t => ['romance', 'shoujo', 'shoujo ai'].includes(t))) return 'Romantic & Emotional';
        if (categoryTitles.some(t => ['action', 'adventure', 'shounen'].includes(t))) return 'Action-Packed';
        if (categoryTitles.some(t => ['drama'].includes(t))) return 'Dramatic & Serious';
        if (categoryTitles.some(t => ['fantasy', 'supernatural', 'magic'].includes(t))) return 'Fantastical & Mystical';
        return 'Mixed Tone';
    };

    const getPacing = () => {
        const totalMinutes = (episodeCount || 0) * (episodeLength || 24);
        if (totalMinutes < 300) return 'Quick Watch';
        if (totalMinutes < 1200) return 'Moderate Pace';
        return 'Epic Journey';
    };

    const getCommitmentLevel = () => {
        const totalHours = ((episodeCount || 0) * (episodeLength || 24)) / 60;
        if (totalHours < 5) return { level: 'Short', hours: totalHours.toFixed(1) };
        if (totalHours < 20) return { level: 'Medium', hours: totalHours.toFixed(1) };
        return { level: 'Long', hours: totalHours.toFixed(1) };
    };

    const getViewerSuitability = () => {
        const rating = ageRating || ageRatingGuide || '';
        const categoryTitles = (categories || []).map((cat: { attributes: { title: string } }) =>
            cat.attributes.title.toLowerCase()
        );

        if (rating === 'G' || rating.includes('G')) return 'All Ages';
        if (rating === 'PG' || rating.includes('PG')) {
            if (categoryTitles.some(t => ['violence', 'ecchi'].includes(t))) return 'Teen+';
            return 'Family Friendly';
        }
        if (rating === 'R' || rating === 'R18' || rating.includes('R')) return 'Mature';
        if (categoryTitles.some(t => ['violence', 'horror', 'thriller'].includes(t))) return 'Teen+';
        return 'General Audience';
    };

    const tone = getTone();
    const pacing = getPacing();
    const commitment = getCommitmentLevel();
    const suitability = getViewerSuitability();

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden font-sans">

            {/* 1. Global Background Layer - Darkened for Readability */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/cv7.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/90 to-[#020617]" />
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="relative z-10 pt-28 pb-20">
                <main className="container mx-auto px-6 lg:px-12">

                    {/* Main Info Card - Using Glassmorphism for Contrast */}
                    <div className="bg-[#030712]/60 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative">
                        {/* Decorative Background Text */}


                        <div className="flex flex-col sm:flex-row gap-12 relative z-10">

                            {/* LEFT: POSTER & ACTIONS */}
                            <div className="lg:w-[350px] flex-shrink-0">
                                <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                    <Image src={posterImage?.large} alt={canonicalTitle} fill className="object-cover w-3/4" priority />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Japanese Title Overlay */}
                                    {titles?.ja_jp && (
                                        <div className="absolute bottom-6 left-0 right-0 text-center">
                                            <h2 className="text-3xl font-black text-white drop-shadow-2xl opacity-90">
                                                {titles.ja_jp}
                                            </h2>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 space-y-4">
                                    {youtubeVideoId ? (
                                        <Link href={`https://www.youtube.com/watch?v=${youtubeVideoId}`} target="_blank" className="block w-full">
                                            <button className="w-full h-16 rounded-2xl flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.2)] cursor-pointer active:scale-[0.98] group">
                                                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform duration-300" />
                                                <span className="font-black uppercase italic tracking-widest text-sm drop-shadow-sm">Watch Trailer</span>
                                            </button>
                                        </Link>
                                    ) : (
                                        <div className="w-full h-16 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-white/20 font-black uppercase tracking-widest text-sm">
                                            Trailer Unavailable
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT: CONTENT DETAILS */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Activity className="text-pink-500 w-4 h-4" />
                                        <span className="text-blue-400 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Verified Archive Entry</span>
                                    </div>

                                    <h1 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
                                        <AuroraText>{canonicalTitle}</AuroraText>
                                    </h1>

                                    {/* Metadata - High Contrast Badges */}
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/40 rounded-xl text-yellow-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold font-mono text-xs">{ratingValue.toFixed(1)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/40 rounded-xl text-pink-400">
                                            <Layers className="w-4 h-4" />
                                            <span className="font-bold text-xs uppercase tracking-widest">EP {episodeCount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/40 rounded-xl text-blue-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-bold text-xs uppercase tracking-widest">{episodeLength}m / EP</span>
                                        </div>
                                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-black text-[10px] uppercase tracking-widest">
                                            {status}
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                {categories?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {categories.slice(0, 6).map((cat: { id: string; attributes: { title: string } }) => (
                                            <span key={cat.id} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-slate-400 hover:text-pink-400 transition-colors">
                                                {cat.attributes.title}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Synopsis - Optimized for readability */}
                                <div className="relative pt-6">
                                    <div className="absolute -left-6 top-6 bottom-0 w-[2px] bg-gradient-to-b from-pink-500/50 to-transparent" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 flex items-center gap-3">
                                        <Info size={12} /> Intelligence Summary
                                    </h3>
                                    <div className="space-y-4">
                                        <p className={`text-slate-100 text-lg leading-relaxed font-normal selection:bg-pink-500/50 ${!isSynopsisExpanded ? 'line-clamp-3' : ''}`}>
                                            {synopsis || "Archives show no available summary for this entry."}
                                        </p>
                                        {synopsis && synopsis.length > 200 && (
                                            <button
                                                onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
                                                className="text-[10px] font-black uppercase tracking-widest text-pink-500 hover:text-white transition-colors border-b border-pink-500/20 pb-1"
                                            >
                                                {isSynopsisExpanded ? 'Read Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* What to Expect Intelligence Panel */}
                                <div className="relative pt-8 mt-8 border-t border-white/10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-3">
                                        <Sparkles size={12} /> What to Expect
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-pink-500/50 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-pink-400" />
                                                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Tone</span>
                                            </div>
                                            <p className="text-sm font-bold text-white">{tone}</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-blue-400" />
                                                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Pacing</span>
                                            </div>
                                            <p className="text-sm font-bold text-white">{pacing}</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-yellow-500/50 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-yellow-400" />
                                                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Commitment</span>
                                            </div>
                                            <p className="text-sm font-bold text-white">{commitment.level}</p>
                                            <p className="text-[10px] text-white/50 mt-1">{commitment.hours}h total</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-500/50 transition-all">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="w-4 h-4 text-green-400" />
                                                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Suitability</span>
                                            </div>
                                            <p className="text-sm font-bold text-white">{suitability}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHARACTER DOSSIER SECTION */}
                    {allCharacters.length > 0 && (
                        <div className="mt-20 space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Users className="text-pink-500 w-6 h-6" />
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                        Personnel <span className="text-pink-500">Archives</span>
                                    </h3>
                                </div>

                                {allCharacters.length > 4 && (
                                    <button
                                        onClick={() => setShowAllCharacters(!showAllCharacters)}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-pink-500 transition-colors border-b border-white/10 pb-1"
                                    >
                                        {showAllCharacters ? 'Collapse Records' : `View Full Roster (${allCharacters.length})`}
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {displayedCharacters.map((item: { id: string; attributes: any; relationships?: any }) => {
                                    const charAttr = item.attributes;
                                    const charImg = item.relationships?.character?.attributes?.image?.original || charAttr?.image?.original;
                                    return (
                                        <Link href={`/anime/${id}/character/${item.id}`} key={item.id} className="group">
                                            <div className="relative overflow-hidden bg-[#030712]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-pink-500/50 transition-all duration-300">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900 border border-white/10 group-hover:border-pink-500/50 transition-colors">
                                                        {charImg ? (
                                                            <Image src={charImg} alt={charAttr.name} width={64} height={64} className="object-cover w-full h-full" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/20"><User /></div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-black text-white group-hover:text-pink-400 transition-colors uppercase italic tracking-tight truncate">
                                                            {charAttr.name}
                                                        </p>
                                                        <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-1">
                                                            Operative ID_{item.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
