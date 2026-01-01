import Image from 'next/image';
import Link from 'next/link';
import { Star, Tv, Layers } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const { canonicalTitle: title, posterImage, averageRating, episodeCount, showType } = anime.attributes;

  return (
    <Link href={`/anime/${anime.id}`} className="block group w-full">
      <div className="relative overflow-hidden  rounded-xl bg-[#020617] border border-white/5 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:scale-[1.02] hover:border-blue-500/50">

        {/* Image Section */}
        <div className="relative aspect-2/3 w-full overflow-hidden">
          {posterImage?.large ? (
            <Image
              src={posterImage.large}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">
              No image
            </div>
          )}

          {/* Permanent Gradient for text legibility */}
          <div className="absolute inset-0 " />


        </div>

        {/* Improved Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent backdrop-blur-[0.2px]">

          {/* Show Type Badge - Styled as a "tab" */}
          <div className="absolute top-0 left-4 -translate-y-1/2">
            <Badge variant="secondary" className="bg-blue-600 text-white border-none text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Tv className="w-3 h-3 mr-1" />
              {showType || "TV"}
            </Badge>
          </div>

          {/* Title - Italicized and tracking tighter for an anime look */}
          <h3 className="mb-3 line-clamp-1 text-base font-black italic uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Stats Bar */}
          <div className="flex items-center gap-4 text-white/60">

            {/* Rating */}
            {averageRating && (
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                <span className="text-xs font-bold text-white/90">{averageRating}%</span>
              </div>
            )}

            {/* Divider */}
            <div className="w-1 h-1 rounded-full bg-white/20" />

            {/* Episode Count */}
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-bold text-white/90">
                {episodeCount ? `${episodeCount} EP` : "Movie"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}