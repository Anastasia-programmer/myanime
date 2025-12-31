import BrowseClient from '@/components/BrowseClient';
import { getAnimeList } from '@/lib/kitsu';

interface BrowsePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 3600;

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
    const resolvedSearchParams = await searchParams;

    const filters = {
        query: typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : undefined,
        category: typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined,
        season: typeof resolvedSearchParams.season === 'string' ? resolvedSearchParams.season : undefined,
        year: typeof resolvedSearchParams.year === 'string' ? resolvedSearchParams.year : undefined,
        subtype: typeof resolvedSearchParams.subtype === 'string' ? resolvedSearchParams.subtype : undefined,
        status: typeof resolvedSearchParams.status === 'string' ? resolvedSearchParams.status : undefined,
        ageRating: typeof resolvedSearchParams.ageRating === 'string' ? resolvedSearchParams.ageRating : undefined,
        sort: typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : '-userCount',
        limit: 18,
    };

    let animeData = [];
    try {
        const response = await getAnimeList(filters);
        animeData = response.data;
    } catch (error) {
        console.error("Failed to fetch anime for browse page", error);
        // Render with empty list or separate error boundary
    }

    return <BrowseClient initialAnime={animeData} />;
}
