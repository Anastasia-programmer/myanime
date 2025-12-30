import AnimeCard from './AnimeCard';
import { Search } from "lucide-react"

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    posterImage?: {
      large?: string;
    };
    averageRating?: string;
    episodeCount?: number;
    showType?: string;
  };
}

interface AnimeGridProps {
  animeList: Anime[];
}

export default function AnimeGrid({ animeList }: AnimeGridProps) {

  if (!animeList || animeList.length === 0) {
    return (
      /* Added a semi-transparent glass container that lets the sky background peek through */
      <div className="flex min-h-112.5 flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
        
        <div className="relative group">
          {/* Background Glow Effect */}
          <div className="absolute -inset-4 bg-linear-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          {/* The Icon */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Search className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
  
        <div className="text-center space-y-3">
          {/* Heading with the same gradient as your main Title */}
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            Lost in the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">Clouds</span>
          </h3>
          
          <p className="max-w-70 text-sm font-medium leading-relaxed text-blue-100/60 uppercase tracking-widest">
            We could not find any anime matching your journey.
          </p>
  
          <div className="pt-6">
            <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

