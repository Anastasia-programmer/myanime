import { getAnimeById, getAnimeCharacters } from '@/lib/kitsu';
import { notFound } from 'next/navigation';
import AnimeDetailPageClient from './AnimeDetailPageClient';

export default async function AnimePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  let anime;
  let categories;
  let characters;

  try {
    const animeResponse = await getAnimeById(id);
    anime = animeResponse.data;
    categories = (animeResponse.included || []).filter((item: { type: string }) => item.type === 'categories');

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