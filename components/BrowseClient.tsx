'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import AnimeGrid from './AnimeGrid';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AuroraText } from '@/components/ui/aurora-text';

// Mock data for dropdowns
const CATEGORIES = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem", "Historical", "Horror", "Isekai", "Kids",
    "Magic", "Mecha", "Military", "Music", "Mystery", "Psychological", "Romance", "School Life", "Science Fiction",
    "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Sports", "Supernatural", "Thriller", "Violence"
];

const SEASONS = ["spring", "summer", "fall", "winter"];
const SUBTYPES = ["TV", "movie", "OVA", "ONA", "special", "music"];
const AGE_RATINGS = ["G", "PG", "R", "R18"];
const STATUSES = ["current", "finished", "upcoming", "tba", "unreleased"];

// Simple Years generator
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

interface BrowseClientProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialAnime: any[];
}

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
}

// Helper for select dropdowns
function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider pl-1">{label}</label>
            <div className="relative group">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-gray-200 text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all cursor-pointer backdrop-blur-md hover:border-white/20"
                >
                    <option value="all" className="bg-[#111] text-gray-300">All</option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt.toLowerCase() !== 'all' ? (opt.includes(' ') ? opt.replace(' ', '-').toLowerCase() : opt) : 'all'} className="bg-[#111] text-gray-300">
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors pointer-events-none" />
            </div>
        </div>
    );
}

export default function BrowseClient({ initialAnime }: BrowseClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Local state for filters
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [debouncedQuery, setDebouncedQuery] = useState(query); // Manual debounce state

    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [season, setSeason] = useState(searchParams.get('season') || 'all');
    const [year, setYear] = useState(searchParams.get('year') || 'all');
    const [subtype, setSubtype] = useState(searchParams.get('subtype') || 'all');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');
    const [ageRating, setAgeRating] = useState(searchParams.get('ageRating') || 'all');
    const [sort, setSort] = useState(searchParams.get('sort') || '-userCount');

    // Mobile drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Manual Debounce Effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Effect to update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedQuery) params.set('query', debouncedQuery);
        if (category !== 'all') params.set('category', category);
        if (season !== 'all') params.set('season', season);
        if (year !== 'all') params.set('year', year);
        if (subtype !== 'all') params.set('subtype', subtype);
        if (status !== 'all') params.set('status', status);
        if (ageRating !== 'all') params.set('ageRating', ageRating);
        if (sort) params.set('sort', sort);

        startTransition(() => {
            router.push(`/categories?${params.toString()}`, { scroll: false });
        });
    }, [debouncedQuery, category, season, year, subtype, status, ageRating, sort, router]);


    return (
        <div className="mt-20 relative min-h-screen font-sans overflow-x-hidden selection:bg-pink-500/30">

            {/* --- BACKGROUND LAYERS --- */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/cv7.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#050505]/80 to-[#050505]/95" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
            </div>

            {/* Top Bar / Header for Browse - Mobile Toggle Only */}
            <div className="md:hidden relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 transition-all duration-300">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <span className="text-white font-bold tracking-widest text-sm">FILTERS</span>
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm font-bold text-white transition-all backdrop-blur-md"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 lg:px-8 py-10">

                {/* Page Title */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        <AuroraText
                            colors={['#FF0080', '#7928CA', '#0070F3', '#FF0080']}
                            speed={1.2}
                            className='inline-block'
                        >
                            EXPLORE ANIME
                        </AuroraText>
                    </h1>
                    <p className="text-white/40 font-medium mt-2 max-w-lg">
                        Dive into the infinite worlds of animation. Filter by season, genre, and more to find your next obsession.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8 h-fit sticky top-32">
                        <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-2xl space-y-6">
                            <div className="flex items-center gap-2 text-white mb-6 pb-4 border-b border-white/5">
                                <Filter className="w-5 h-5 text-pink-500" />
                                <h2 className="text-lg font-bold uppercase tracking-widest">Filters</h2>
                            </div>

                            <div className="space-y-5">
                                <FilterSelect label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
                                <FilterSelect label="Season" value={season} onChange={setSeason} options={SEASONS} />
                                <FilterSelect label="Year" value={year} onChange={setYear} options={YEARS} />
                                <FilterSelect label="Format" value={subtype} onChange={setSubtype} options={SUBTYPES} />
                                <FilterSelect label="Status" value={status} onChange={setStatus} options={STATUSES} />
                                <FilterSelect label="Age Rating" value={ageRating} onChange={setAgeRating} options={AGE_RATINGS} />
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <button
                                    onClick={() => {
                                        setCategory('all'); setSeason('all'); setYear('all'); setSubtype('all'); setStatus('all'); setAgeRating('all'); setQuery('');
                                    }}
                                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <X className="w-3 h-3" /> Clear All Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Drawer (Overlay) */}
                    <AnimatePresence>
                        {isDrawerOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-md"
                                    onClick={() => setIsDrawerOpen(false)}
                                />
                                <motion.div
                                    initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed right-0 top-0 bottom-0 w-80 bg-[#111] z-50 p-6 md:hidden overflow-y-auto border-l border-white/10 shadow-2xl"
                                >
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                        <h2 className="text-xl font-black text-white uppercase tracking-widest">Filters</h2>
                                        <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5 text-white" /></button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Sort By</label>
                                            <select
                                                value={sort}
                                                onChange={(e) => setSort(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 appearance-none"
                                            >
                                                <option value="-userCount" className='bg-black'>Most Popular</option>
                                                <option value="-averageRating" className='bg-black'>Highest Rated</option>
                                                <option value="-startDate" className='bg-black'>Newest</option>
                                                <option value="startDate" className='bg-black'>Oldest</option>
                                            </select>
                                        </div>

                                        <div className="border-t border-white/10 my-4" />

                                        <FilterSelect label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
                                        <FilterSelect label="Season" value={season} onChange={setSeason} options={SEASONS} />
                                        <FilterSelect label="Year" value={year} onChange={setYear} options={YEARS} />
                                        <FilterSelect label="Format" value={subtype} onChange={setSubtype} options={SUBTYPES} />
                                        <FilterSelect label="Status" value={status} onChange={setStatus} options={STATUSES} />
                                        <FilterSelect label="Age Rating" value={ageRating} onChange={setAgeRating} options={AGE_RATINGS} />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {isPending && (
                            <div className="fixed top-0 left-0 right-0 h-1 bg-pink-500/20 overflow-hidden z-[100]">
                                <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-progress origin-left-right"></div>
                            </div>
                        )}

                        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                <div className="text-sm font-bold uppercase tracking-widest text-white/60 whitespace-nowrap self-start sm:self-auto">
                                    <span className="text-white">{initialAnime?.length || 0}</span> Results Found
                                </div>
                                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                                {/* Search Bar moved here */}
                                <div className="relative w-full sm:w-64 group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-white/40 group-focus-within:text-pink-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-9 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 text-sm transition-all"
                                        placeholder="Search..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Desktop Sort moved here */}
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Sort By</span>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer border-none hover:text-pink-400 transition-colors"
                                >
                                    <option value="-userCount" className="bg-[#111]">Most Popular</option>
                                    <option value="-averageRating" className="bg-[#111]">Highest Rated</option>
                                    <option value="-startDate" className="bg-[#111]">Newest</option>
                                    <option value="startDate" className="bg-[#111]">Oldest</option>
                                </select>
                            </div>
                        </div>

                        <div className="min-h-125">
                            <AnimeGrid animeList={initialAnime || []} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
