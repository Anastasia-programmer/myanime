import Image from 'next/image';
import Link from 'next/link';
import { getAnimeById, getAnimeCharacters } from '@/lib/kitsu';
import { notFound } from 'next/navigation';
import AnimeCharacters from '@/components/AnimeCharacters';
import { Play, Bell, MoreHorizontal, User, Star } from 'lucide-react';

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

    // Fetch characters but we will render them differently
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
    status,
    showType,
    episodeCount,
    episodeLength,
    titles,
    averageRating,
    youtubeVideoId
  } = anime.attributes;

  const characterList = (characters?.included || []).filter(
    (item: any) => item.type === 'characters'
  );

  return (
    <div className="mt-20 relative min-h-screen bg-[#111] text-white overflow-x-hidden font-sans">

      {/* 1. Blurred Background Layer */}
      <div className="fixed inset-0 z-0">
        {posterImage?.large && (
          <Image
            src={posterImage.large}
            alt="Background"
            fill
            className="object-cover  "
            priority
            quality={50}
          />
        )}
        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/75" />
        {/* Gradient fade from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      </div>

    

      {/* 3. Main Content Area */}
      <div className="relative z-10 container mx-auto px-4 lg:px-12 py-8 mt-4">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0 w-[280px] sm:w-[320px] lg:w-[380px]">
            {posterImage?.large ? (
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-white/5">
                <Image
                  src={posterImage.large}
                  alt={canonicalTitle}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Poster overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                {/* Japanese Title Overlay if available (simulated) */}
                <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                  {titles?.ja_jp && (
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-t from-white to-white/70 drop-shadow-md text-stroke font-outline-2">
                      {titles.ja_jp}
                    </h2>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-lg animate-pulse" />
            )}




          </div>

          {/* Right: Info & Actions */}
          <div className="flex-1 min-w-0 pt-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>Home</span>
              <span className="text-gray-600">|</span>
              <span>{showType === 'TV' ? 'TV Series' : showType}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {canonicalTitle}
              {/* Add localized title logic if needed, e.g. (S1) */}
            </h1>

            {/* Meta Tags Row */}
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6 font-medium">
              {episodeCount && <span>EP {episodeCount}</span>}
              {episodeCount && <span className="w-1 h-1 rounded-full bg-gray-500" />}
              {episodeLength && <span>{episodeLength}m</span>}

              {/* Rating */}
              {averageRating && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <div className="flex items-center gap-1 text-[#FBBF24]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{(parseFloat(averageRating) / 10).toFixed(1)}</span>
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="flex gap-2 ml-2">
                <span className="bg-[#4ADE80] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">SUB</span>
                <span className="bg-[#4ADE80] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">HD</span>
                <span className="bg-[#4ADE80] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">DUB</span>
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl ">
              {synopsis || "No synopsis available."}
            </p>

            {/* Continue Watching / Action Card */}
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-xl p-6 border border-white/5 w-auto mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {youtubeVideoId ? (
                    <Link
                      href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#34D399] hover:bg-[#10B981] flex items-center justify-center transition-transform hover:scale-105 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                    >
                      <Play className="w-5 h-5 text-black ml-1 fill-current" />
                    </Link>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center cursor-not-allowed opacity-50">
                      <Play className="w-5 h-5 text-gray-400 ml-1 fill-current" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-[#FBBF24] font-bold text-sm mb-1 uppercase tracking-wide">Continue Watching</h3>
                    <p className="text-xs text-gray-400">
                      {youtubeVideoId ? 'Watch Trailer' : 'Trailer Unavailable'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-400 line-clamp-1 italic">
                  Start your journey with {canonicalTitle}...
                </p>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FBBF24] w-[0%]" /> {/* 0% progress for new content */}
                </div>
              </div>
            </div>

        
          

          </div>
        </div>
        <div className="mt-8">
              <h3 className="text-[#FBBF24] font-medium mb-6">Characters & Voice Actors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {characterList.slice(0, 8).map((item: any) => {
                  const charAttr = item.attributes;
                  const charImg = item.relationships?.character?.attributes?.image?.original || charAttr?.image?.original;

                  // We don't have deeply nested VA data easily available in this structure without more calls,
                  // so we will simplify to just show the Character.
                  return (
                    <Link href={`/anime/${id}/character/${item.id}`} key={item.id} className="block">
                      <div className="flex items-center gap-4 bg-[#1F1F1F] p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors cursor-pointer group border border-white/5">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
                          {charImg ? (
                            <Image src={charImg} alt="Character" width={48} height={48} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-600 text-[10px]">?</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#FBBF24] transition-colors line-clamp-1">{charAttr.name }</p>
                          {/* Note: Kitsu structure for names via relationships is complex, simplifying for this view */}
                          <p className="text-xs text-gray-500">Character ID: {item.id}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
      </div>
    </div>
  );
}