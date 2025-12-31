const BASE_URL = 'https://kitsu.io/api/edge';

type AnimeFilters = {
    query?: string;
    category?: string;
    status?: string;
    sort?: string;
    limit?: number;
};

// Helper function to create timeout signal
function createTimeoutSignal(timeoutMs: number): AbortSignal {
    if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
        return (AbortSignal as any).timeout(timeoutMs);
    }
    // Fallback for environments without AbortSignal.timeout
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller.signal;
}

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

        url.searchParams.append(
            'sort',
            filters.sort || '-userCount'
        );

        url.searchParams.append(
            'page[limit]',
            String(filters.limit || 20 )
        );

        const res = await fetch(url.toString(), {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch anime list: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: any) {
        console.error('Error fetching anime list:', error);
        if (error.name === 'AbortError' || error.code === 'ENOTFOUND' || error.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw error;
    }
}

export async function getAnimeById(id: string) {
    try {
        const res = await fetch(`${BASE_URL}/anime/${id}`, {
            next: { revalidate: 3600 },
            signal: createTimeoutSignal(10000) // 10 second timeout
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error: any) {
        console.error('Error fetching anime by ID:', error);
        if (error.name === 'AbortError' || error.code === 'ENOTFOUND' || error.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw error;
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
    } catch (error: any) {
        console.error('Error fetching anime characters:', error);
        if (error.name === 'AbortError' || error.code === 'ENOTFOUND' || error.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw error;
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
    } catch (error: any) {
        console.error('Error fetching character by ID:', error);
        if (error.name === 'AbortError' || error.code === 'ENOTFOUND' || error.cause?.code === 'ENOTFOUND') {
            throw new Error('Network error: Unable to connect to Kitsu API. Please check your internet connection.');
        }
        throw error;
    }
}
