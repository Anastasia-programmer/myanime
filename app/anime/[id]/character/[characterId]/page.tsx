import { getCharacterById, getAnimeById } from '@/lib/kitsu';
import { notFound } from 'next/navigation';
import CharacterDetailClient from '@/components/CharacterDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
    characterId: string;
  }>;
}

export default async function CharacterDetailPage({ params }: PageProps) {
  const { id: animeId, characterId } = await params;
  
  let character;
  let anime;

  try {
    const characterResponse = await getCharacterById(characterId);
    character = characterResponse.data;
    
    const animeResponse = await getAnimeById(animeId);
    anime = animeResponse.data;
  } catch (error) {
    console.error('Error fetching character details:', error);
    notFound();
  }

  if (!character) {
    notFound();
  }

  const {
    name,
    canonicalName,
    description,
    image,
  } = character.attributes;

  const characterName = name || canonicalName || 'Unknown Character';
  const characterImage = image?.original || image?.large;
  const animeTitle = anime?.attributes?.canonicalTitle || 'Unknown Anime';

  // Parse character description to extract stats and bio
  const parseDescription = (text: string | null) => {
    if (!text) return { stats: [], bio: "" };

    const keys = [
      "Age", "Birthdate", "Birthday", "Height", "Weight", "Gender", 
      "Species", "Position", "Rank", "Occupation", "Status", 
      "Blood Type", "Abilities", "Favorite subject", "Least favorite subject", 
      "Favorite food", "Hobby", "Hobbies", "Class", "Seat Number", 
      "Affiliation", "Grade", "Weapon", "Likes", "Dislikes", "Race" 
    ];
    
    const regex = new RegExp(`(${keys.join(':|')}:)`, "gi");
    const segments = text.split(regex);
    
    const foundStats: { label: string; value: string }[] = [];
    const bioParts: string[] = [];

    if (segments[0].trim()) bioParts.push(segments[0].trim());

    for (let i = 1; i < segments.length; i += 2) {
      const label = segments[i].replace(':', '').trim();
      const rawValue = segments[i + 1] || "";
      
      const bioBreakMatch = rawValue.match(/^([\s\S]+?\. )([A-Z][\s\S]*)/);
      
      if (bioBreakMatch) {
        foundStats.push({ 
          label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(), 
          value: bioBreakMatch[1].trim() 
        });
        bioParts.push(bioBreakMatch[2].trim());
      } else {
        foundStats.push({ 
          label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(), 
          value: rawValue.trim() 
        });
      }
    }

    return {
      stats: foundStats,
      bio: bioParts.join('\n\n').replace(/\[Written by Kitsu.*?\]/g, '').trim()
    };
  };

  const { stats, bio } = parseDescription(description);

  return (
    <CharacterDetailClient
      characterName={characterName}
      characterImage={characterImage}
      animeTitle={animeTitle}
      animeId={animeId}
      stats={stats}
      bio={bio || description || ""}
    />
  );
}

