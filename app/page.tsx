import { getAnimeList } from '@/lib/kitsu';
import AnimeListClient from '@/components/AnimeListClient';
import AnimeFilters from '@/components/AnimeFilters';
import Hero from '@/components/Hero';
import Image from 'next/image';

interface HomeProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  let animeData = [];
  let featuredAnime = [];
  
  try {
    const filters = {
      query: params.query,
      category: params.category,
      status: params.status,
      sort: params.sort,
      limit: 20,
    };
    
    const response = await getAnimeList(filters);
    animeData = response.data || [];
    
    // Get featured anime (popular ones) if no filters applied
    if (!params.query && !params.category && !params.status) {
      const featuredResponse = await getAnimeList({ limit: 5, sort: '-userCount' });
      featuredAnime = featuredResponse.data || [];
    }
  } catch (error) {
    console.error('Error fetching anime:', error);
    animeData = [];
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image for entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/cover5.jpg"
          alt="Anime Discovery Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Hero Section */}
      <Hero featuredAnime={featuredAnime} />

      {/* Discover Section */}
      <div className="relative z-10">
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Discover Amazing Anime
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-md">
              Browse through our curated collection and find your next favorite series
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-12">
            <AnimeFilters />
          </div>
          
          {/* Anime Grid - Client Component for dynamic filtering */}
          <AnimeListClient initialData={animeData} />
        </div>
      </div>
    </div>
  );
}
