const BASE_URL = 'https://kitsu.io/api/edge';

type AnimeFilters = {
    query?: string;
    category?: string;
    status?: string;
    sort?: string;
    limit?: number;
    season?: string;
    year?: string;
    subtype?: string;
    ageRating?: string;
    offset?: number;
};

// Helper function to create timeout signal
const createTimeoutSignal = (ms: number): AbortSignal => {
    if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
        return (AbortSignal as { timeout: (ms: number) => AbortSignal }).timeout(ms);
    }
    // Fallback for environments without AbortSignal.timeout
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
};

export async function getAnimeList(filters: AnimeFilters = {}) {
    try {
        const url = new URL(`${BASE_URL}/anime`);

        if (filters.query) {
            url.searchParams.append('filter[text]', filters.query);
        }

        if (filters.category && filters.category !== 'all') {
            url.searchParams.append('filter[categories]', filters.category);
        }

        if (filters.status && filters.status !== 'all') {
            url.searchParams.append('filter[status]', filters.status);
        }

        if (filters.season && filters.season !== 'all') {
            url.searchParams.append('filter[season]', filters.season);
        }

        if (filters.year && filters.year !== 'all') {
            url.searchParams.append('filter[seasonYear]', filters.year);
        }

        if (filters.subtype && filters.subtype !== 'all') {
            url.searchParams.append('filter[subtype]', filters.subtype);
        }

        if (filters.ageRating && filters.ageRating !== 'all') {
            url.searchParams.append('filter[ageRating]', filters.ageRating);
        }

        url.searchParams.append(
            'sort',
            filters.sort || '-userCount'
        );

        url.searchParams.append(
            'page[limit]',
            String(filters.limit || 20)
        );

        if (filters.offset) {
            url.searchParams.append('page[offset]', String(filters.offset));
        }

        const res = await fetch(url.toString(), {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch anime list: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: unknown) {
        const err = error as Error & { code?: string; cause?: { code?: string } };
        console.error('Error fetching anime list:', err);
        if (err.name === 'AbortError' || err.code === 'ENOTFOUND' || err.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw err;
    }
}

export async function getAnimeById(id: string) {
    try {
        const res = await fetch(`${BASE_URL}/anime/${id}?include=categories`, {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: unknown) {
        const err = error as Error & { code?: string; cause?: { code?: string } };
        console.error('Error fetching anime by ID:', err);
        if (err.name === 'AbortError' || err.code === 'ENOTFOUND' || err.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw err;
    }
}

export async function getAnimeCharacters(animeId: string) {
    try {
        const url = `${BASE_URL}/anime/${animeId}/anime-characters?include=character&page[limit]=12`;

        const res = await fetch(url, {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch anime characters: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: unknown) {
        const err = error as Error & { code?: string; cause?: { code?: string } };
        console.error('Error fetching anime characters:', err);
        if (err.name === 'AbortError' || err.code === 'ENOTFOUND' || err.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw err;
    }
}

export async function getCharacterById(characterId: string) {
    try {
        const res = await fetch(`${BASE_URL}/characters/${characterId}`, {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch character: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: unknown) {
        const err = error as Error & { code?: string; cause?: { code?: string } };
        console.error('Error fetching character by ID:', err);
        if (err.name === 'AbortError' || err.code === 'ENOTFOUND' || err.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw err;
    }
}
