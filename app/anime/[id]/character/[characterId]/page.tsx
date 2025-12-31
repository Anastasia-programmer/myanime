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
  const animeBackgroundImage = anime?.attributes?.posterImage?.large || anime?.attributes?.posterImage?.original || null;

  // Parse character description to extract stats and bio
  const parseDescription = (text: string | null) => {
    if (!text) return { personalStats: [], professionalStats: [], otherStats: [], bio: "" };

    const personalKeys = ["Age", "Birthdate", "Birthday", "Height", "Weight", "Gender", "Blood Type"];
    const professionalKeys = ["Position", "Rank", "Occupation", "Class", "Seat Number", "Affiliation", "Grade", "Weapon", "Squad", "Team"];
    const otherKeys = ["Species", "Status", "Abilities", "Favorite subject", "Least favorite subject", "Favorite food", "Hobby", "Hobbies", "Likes", "Dislikes", "Race"];

    // Explicit list from user request to ensure everything is caught, merged into the categories above
    // actually, let's just make sure all keys are covered in the regex.
    const allKnownKeys = [
      "Age", "Birthdate", "Birthday", "Height", "Weight", "Gender",
      "Species", "Position", "Rank", "Occupation", "Status",
      "Blood Type", "Abilities", "Favorite subject", "Least favorite subject",
      "Favorite food", "Hobby", "Hobbies", "Class", "Seat Number",
      "Affiliation", "Grade", "Weapon", "Squad", "Team", "Likes", "Dislikes", "Race"
    ];

    const regex = new RegExp(`(${allKnownKeys.join(':|')}:)`, "gi");
    const segments = text.split(regex);

    const personalStats: { label: string; value: string }[] = [];
    const professionalStats: { label: string; value: string }[] = [];
    const otherStats: { label: string; value: string }[] = [];
    const bioParts: string[] = [];

    if (segments[0].trim()) bioParts.push(segments[0].trim());

    for (let i = 1; i < segments.length; i += 2) {
      const labelRaw = segments[i].replace(':', '').trim();
      // Normalize label for comparison (capitalized first letter)
      const labelNormalized = labelRaw.charAt(0).toUpperCase() + labelRaw.slice(1).toLowerCase();
      // Original casing for display potentially, but normalized is safer for mapping

      const rawValue = segments[i + 1] || "";

      const bioBreakMatch = rawValue.match(/^([\s\S]+?\. )([A-Z][\s\S]*)/);

      let value = rawValue.trim();
      if (bioBreakMatch) {
        value = bioBreakMatch[1].trim();
        bioParts.push(bioBreakMatch[2].trim());
      }

      const statObj = { label: labelNormalized, value };

      // Categorize
      // Simple check insensitive
      if (personalKeys.some(k => k.toLowerCase() === labelRaw.toLowerCase())) {
        personalStats.push(statObj);
      } else if (professionalKeys.some(k => k.toLowerCase() === labelRaw.toLowerCase())) {
        professionalStats.push(statObj);
      } else {
        otherStats.push(statObj);
      }
    }

    return {
      personalStats,
      professionalStats,
      otherStats,
      bio: bioParts.join('\n\n').replace(/\[Written by Kitsu.*?\]/g, '').trim()
    };
  };

  const { personalStats, professionalStats, otherStats, bio } = parseDescription(description);

  return (
    <CharacterDetailClient
      characterName={characterName}
      characterImage={characterImage}
      animeTitle={animeTitle}
      animeBackgroundImage={animeBackgroundImage}
      animeId={animeId}
      personalStats={personalStats}
      professionalStats={professionalStats}
      otherStats={otherStats}
      bio={bio || description || ""}
    />
  );
}

