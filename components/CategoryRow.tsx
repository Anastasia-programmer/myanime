'use client';

import { useState } from 'react';
import AnimeCard from '@/components/AnimeCard';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from 'lucide-react';

interface CategoryRowProps {
  title: string;
  animeList: any[];
}

export default function CategoryRow({ title, animeList }: CategoryRowProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Initially show 6, max 18 (which should be the length of animeList provided)
  const displayedAnime = expanded ? animeList.slice(0, 18) : animeList.slice(0, 6);
  const hasMore = animeList.length > 6;

  return (
    <div className="mb-12 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white drop-shadow-md">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {displayedAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setExpanded(!expanded)}
              className="bg-zinc-800/80 hover:bg-zinc-700/80 text-white border-zinc-700 backdrop-blur-sm transition-all duration-300"
            >
              {expanded ? (
                <>
                  Show Less <ChevronDown className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  See More <ChevronRight className="ml-2 w-4 h-4" />
                  <span className="ml-1 text-xs text-zinc-400">
                    ({displayedAnime.length} / {Math.min(18, animeList.length)})
                  </span>
                </>
              )}
            </Button>
        </div>
      )}
    </div>
  );
}
