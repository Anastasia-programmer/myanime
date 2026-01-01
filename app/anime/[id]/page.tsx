import { getAnimeById, getAnimeCharacters } from '@/lib/kitsu';
import { notFound } from 'next/navigation';
import AnimeDetailPageClient from './AnimeDetailPageClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;

  let anime;
  let categories;
  let characters;

  try {
    const animeResponse = await getAnimeById(id);
    anime = animeResponse.data;
    categories = (animeResponse.included || []).filter((item: any) => item.type === 'categories');

    // Fetch characters
    const charactersResponse = await getAnimeCharacters(id);
    characters = charactersResponse;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    notFound();
  }

  if (!anime) {
    notFound();
  }

  return (
    <AnimeDetailPageClient
      anime={anime}
      categories={categories}
      characters={characters}
      id={id}
    />
  );
}