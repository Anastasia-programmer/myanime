'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

interface Character {
  id: string;
  attributes: {
    name?: string;
    canonicalName?: string;
    description?: string | null;
    image?: {
      original?: string;
      large?: string;
    };
  };
}

export default function AnimeCharacters({ characters, animeId }: { characters: Character[]; animeId: string }) {
  if (characters.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-8">
        <Users className="w-4 h-4 text-blue-400" />
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-400">Character Database</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {characters.map((character) => {
          const name = character.attributes?.name || character.attributes?.canonicalName || 'Unknown';
          const img = character.attributes?.image?.original || character.attributes?.image?.large;

          return (
            <Link
              key={character.id}
              href={`/anime/${animeId}/character/${character.id}`}
              className="group flex flex-col items-center"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-white/5 group-hover:border-blue-500 transition-all duration-500 shadow-xl group-hover:shadow-blue-500/20">
                {img ? (
                  <Image src={img} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="128px" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-900 text-[10px] text-slate-500 font-bold">N/A</div>
                )}
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-blue-500/80 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                </div>
              </div>
              <h3 className="text-[11px] font-bold text-center text-white/40 group-hover:text-white transition-colors uppercase tracking-widest line-clamp-1 w-full px-2">
                {name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}