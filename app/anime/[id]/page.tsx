import Image from 'next/image';
import { getAnimeById, getAnimeCharacters } from '@/lib/kitsu';
import { notFound } from 'next/navigation';
import AnimeCharacters from '@/components/AnimeCharacters';
// Added icons for metadata
import { 
  Star, Play, Plus, Heart, Share2, Tv, 
  Calendar, Clock, ShieldAlert, Activity, 
  Layers, Info 
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let anime;
  let characters;

  try {
    const animeResponse = await getAnimeById(id);
    anime = animeResponse.data;
    
    const charactersResponse = await getAnimeCharacters(id);
    characters = charactersResponse;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    notFound();
  }

  if (!anime) {
    notFound();
  }

  const {
    canonicalTitle,
    posterImage,
    synopsis,
    averageRating,
    status,
    showType,
    episodeCount,
    episodeLength,
    startDate,
    endDate,
    ageRating,
    ageRatingGuide,
    youtubeVideoId
  } = anime.attributes;

  const characterList = (characters?.included || []).filter(
    (item: any) => item.type === 'characters'
  );

  const score = averageRating ? (parseFloat(averageRating) / 10).toFixed(2) : null;
  const starRating = averageRating ? (parseFloat(averageRating) / 10 / 2).toFixed(1) : null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617]">
      {/* BACKGROUND with cinematic blur */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {posterImage?.large ? (
          <>
             <Image
                     src="/cover5.jpg"
                     alt="Anime Discovery Background"
                     fill
                     className="object-cover"
                     priority
                     quality={90}
                   />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 backdrop-blur-[10px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#020617]" />
        )}
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-72">
              <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 sticky top-8 shadow-2xl">
                <div className="mb-6">
                  {posterImage?.large && (
                    <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                      <Image src={posterImage.large} alt={canonicalTitle} fill className="object-cover" priority />
                    </div>
                  )}
                </div>

                {score && (
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-black text-white tracking-tighter">{score}</span>
                      <span className="text-blue-400 font-bold uppercase text-[9px] tracking-widest">Global Score</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(parseFloat(starRating || '0')) ? 'fill-blue-500 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'fill-none text-white/10'}`} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata with Icons */}
                <div className="space-y-6">
                   <div className="flex items-start gap-3">
                      <Activity className="w-4 h-4 text-blue-400 mt-1" />
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Status</span>
                        <span className="text-sm text-white font-medium capitalize">{status || 'N/A'}</span>
                      </div>
                   </div>

                   <div className="flex items-start gap-3">
                      <Tv className="w-4 h-4 text-blue-400 mt-1" />
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Format</span>
                        <span className="text-sm text-white font-medium">{showType || 'N/A'}</span>
                      </div>
                   </div>

                   <div className="flex items-start gap-3">
                      <Layers className="w-4 h-4 text-blue-400 mt-1" />
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Episodes</span>
                        <span className="text-sm text-white font-medium">{episodeCount || 'Ongoing'}</span>
                      </div>
                   </div>

                   <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-blue-400 mt-1" />
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Aired</span>
                        <span className="text-sm text-white font-medium">{formatDate(startDate)}</span>
                      </div>
                   </div>

                   <div className="flex items-start gap-3">
                      <ShieldAlert className="w-4 h-4 text-blue-400 mt-1" />
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Age Rating</span>
                        <span className="text-sm text-white font-medium">{ageRating || 'N/A'}</span>
                      </div>
                   </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="bg-black/30 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                  {canonicalTitle}
                </h1>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-10">
        
                  <button  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase text-[10px] tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] " >
                    <Play className="w-4 h-4 fill-current" /> Watch Trailer


                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase text-[10px] tracking-widest transition-all border border-white/10">
                    <Plus className="w-4 h-4" /> Add to List
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Synopsis */}
                {synopsis && (
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-4 h-4 text-blue-400" />
                      <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-400">Database Synopsis</h2>
                    </div>
                    <p className="text-white/80 text-lg leading-relaxed font-medium max-w-4xl">
                      {synopsis}
                    </p>
                  </div>
                )}

                {/* Characters Section */}
                <AnimeCharacters characters={characterList} animeId={id} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}