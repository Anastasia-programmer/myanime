import { getAnimeList } from '@/lib/kitsu';
import Hero from '@/components/Hero';
import Image from 'next/image';
import CategoryRow from '@/components/CategoryRow';
import { AuroraText } from '@/components/ui/aurora-text';

// Force dynamic rendering since we might want fresh data, though Kitsu API is cached
export const revalidate = 3600;

export default async function Home() {

  // We fetch multiple categories in parallel
  const categoriesToFetch = [
    { title: 'Trending Now', params: { sort: '-userCount', limit: 18 } },
    { title: 'Most Popular', params: { sort: '-averageRating', limit: 18 } },
    { title: 'Upcoming', params: { status: 'upcoming', sort: '-userCount', limit: 18 } },

    // Requested Categories
    { title: 'Action', params: { category: 'action', sort: '-userCount', limit: 18 } },
    { title: 'Comedy', params: { category: 'comedy', sort: '-userCount', limit: 18 } },
    { title: 'Drama', params: { category: 'drama', sort: '-userCount', limit: 18 } },
    { title: 'Ecchi', params: { category: 'ecchi', sort: '-userCount', limit: 18 } },
    { title: 'Fantasy', params: { category: 'fantasy', sort: '-userCount', limit: 18 } },
    { title: 'Harem', params: { category: 'harem', sort: '-userCount', limit: 18 } },
    { title: 'Historical', params: { category: 'historical', sort: '-userCount', limit: 18 } },
    { title: 'Horror', params: { category: 'horror', sort: '-userCount', limit: 18 } },
    { title: 'Isekai', params: { category: 'isekai', sort: '-userCount', limit: 18 } },
    { title: 'Kids', params: { category: 'kids', sort: '-userCount', limit: 18 } },
    { title: 'Magic', params: { category: 'magic', sort: '-userCount', limit: 18 } },
    { title: 'Mecha', params: { category: 'mecha', sort: '-userCount', limit: 18 } },
    { title: 'Military', params: { category: 'military', sort: '-userCount', limit: 18 } },
    { title: 'Music', params: { category: 'music', sort: '-userCount', limit: 18 } },
    { title: 'Mystery', params: { category: 'mystery', sort: '-userCount', limit: 18 } },
    { title: 'Psychological', params: { category: 'psychological', sort: '-userCount', limit: 18 } },
    { title: 'Romance', params: { category: 'romance', sort: '-userCount', limit: 18 } },
    { title: 'School Life', params: { category: 'school-life', sort: '-userCount', limit: 18 } },
    { title: 'Science Fiction', params: { category: 'science-fiction', sort: '-userCount', limit: 18 } },
    { title: 'Seinen', params: { category: 'seinen', sort: '-userCount', limit: 18 } },
    { title: 'Shoujo', params: { category: 'shoujo', sort: '-userCount', limit: 18 } },
    { title: 'Shoujo Ai', params: { category: 'shoujo-ai', sort: '-userCount', limit: 18 } },
    { title: 'Shounen Ai', params: { category: 'shounen-ai', sort: '-userCount', limit: 18 } },
    { title: 'Slice of Life', params: { category: 'slice-of-life', sort: '-userCount', limit: 18 } },
    { title: 'Supernatural', params: { category: 'supernatural', sort: '-userCount', limit: 18 } },
    { title: 'Thriller', params: { category: 'thriller', sort: '-userCount', limit: 18 } },
    { title: 'Violence', params: { category: 'violence', sort: '-userCount', limit: 18 } },
  ];

  const results = await Promise.allSettled(
    categoriesToFetch.map(cat => getAnimeList(cat.params))
  );

  const categories = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return {
        title: categoriesToFetch[index].title,
        data: result.value.data || [],
      };
    }
    return null;
  }).filter((cat): cat is { title: string; data: any[] } => cat !== null && cat.data.length > 0);

  return (
    <div className="relative min-h-screen">

      {/* Background Image for entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/cv7.jpg"
          alt="Anime Discovery Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Discover Section */}
      <div id="trending" className="relative z-10 scroll-mt-20">
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative mb-20">
            {/* Decorative Background Element (Subtle "Archives" text) */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-white/[0.02] select-none tracking-tighter italic uppercase pointer-events-none whitespace-nowrap">
              Database Mainframe
            </span>

            <div className="relative z-10 text-center space-y-4">
              {/* Main Title - Simplified */}
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none drop-shadow-lg">
                LEGENDARY CHRONICLES
              </h2>

              {/* Poetic Subtext */}
              <div className="relative max-w-2xl mx-auto pt-4">
                {/* Subtle blur backing for readability */}
                <div className="absolute inset-0 bg-black/40 blur-3xl -z-10" />

                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed tracking-wide drop-shadow-md italic">
                  "From the neon-soaked streets of the future to the whispered echoes of ancient realms—step into a world where <span className="text-white font-bold underline decoration-pink-500/50 underline-offset-4">every frame is a legacy</span>."
                </p>
              </div>

             
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category) => {
              let id = undefined;
              if (category.title === 'Most Popular') id = 'popular';
              else if (category.title === 'Upcoming') id = 'upcoming';

              return (

                <CategoryRow
                  key={category.title}
                  title={category.title}
                  animeList={category.data}
                  id={id}
                />
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
