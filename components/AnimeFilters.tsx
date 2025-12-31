'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Search, Filter, X, Sparkles } from 'lucide-react';

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AnimeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state only (changes here won't trigger a fetch yet)
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [sort, setSort] = useState(searchParams.get('sort') || '-userCount');

  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    
    if (query.trim()) params.set('query', query.trim());
    if (category !== 'all') params.set('category', category);
    if (status !== 'all') params.set('status', status);
    if (sort) params.set('sort', sort);

    // router.replace updates the URL without a page reload. 
    // This triggers the useEffect in AnimeListClient.
    router.replace(params.toString() ? `/?${params.toString()}` : '/', { scroll: false });
  };

  const handleReset = () => {
    setQuery('');
    setCategory('all');
    setStatus('all');
    setSort('-userCount');
    router.replace('/', { scroll: false });
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto mb-12 group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl blur-xl opacity-50 pointer-events-none" />

      <form onSubmit={handleApply} className="relative bg-[#020617]/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Filter className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-none">Discovery Filters</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Refine your journey</p>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleReset}
            className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-white h-8"
          >
            <X className="w-3 h-3 mr-2" /> Reset
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="lg:col-span-1 space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, Genre..."
                className="pl-10 bg-white/5 border-white/10 text-white focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Genre</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f172a] border-white/10 text-slate-200">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f172a] border-white/10 text-slate-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="current">Airing</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold ml-1">Sort</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f172a] border-white/10 text-slate-200">
                <SelectItem value="-userCount">Most Popular</SelectItem>
                <SelectItem value="-averageRating">Highest Rated</SelectItem>
                <SelectItem value="-startDate">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-[0.2em] text-xs h-12 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
          >
            Apply Selection
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}