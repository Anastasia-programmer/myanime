'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimeGrid from './AnimeGrid';

const BASE_URL = 'https://kitsu.io/api/edge';

export default function AnimeListClient({ initialData }: { initialData: any[] }) {
  const searchParams = useSearchParams();
  const [animeData, setAnimeData] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // This runs only when searchParams change (i.e., when "Apply" button is clicked)
    const fetchAnime = async () => {
      const query = searchParams.get('query') || '';
      const category = searchParams.get('category') || 'all';
      const status = searchParams.get('status') || 'all';
      const sort = searchParams.get('sort') || '-userCount';

      const url = new URL(`${BASE_URL}/anime`);
      if (query.trim()) url.searchParams.append('filter[text]', query.trim());
      if (category !== 'all') url.searchParams.append('filter[categories]', category);
      if (status !== 'all') url.searchParams.append('filter[status]', status);
      url.searchParams.append('sort', sort);
      url.searchParams.append('page[limit]', '20');

      try {
        setLoading(true);
        const res = await fetch(url.toString(), { cache: 'no-store' });
        const data = await res.json();
        setAnimeData(data.data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    fetchAnime();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-500 rounded-full animate-spin-slow"></div>
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.4em] text-blue-400/60 animate-pulse">
          Syncing Database...
        </p>
      </div>
    );
  }

  return <AnimeGrid animeList={animeData} />;
}