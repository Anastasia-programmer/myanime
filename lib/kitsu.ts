const BASE_URL = 'https://kitsu.io/api/edge';

type AnimeFilters = {
    query?: string;
    category?: string;
    status?: string;
    sort?: string;
    limit?: number;
};

export async function getAnimeList(filters: AnimeFilters = {}) {
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
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch anime list');
    }

    return res.json();
}

export async function getAnimeById(id: string) {
    const res = await fetch(`${BASE_URL}/anime/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch anime');
    }

    return res.json();
}

export async function getAnimeCharacters(animeId: string) {
    const url = `${BASE_URL}/anime/${animeId}/anime-characters?include=character&page[limit]=18`;

    const res = await fetch(url, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch anime characters');
    }

    return res.json();
}

export async function getCharacterById(characterId: string) {
    const res = await fetch(`${BASE_URL}/characters/${characterId}`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch character');
    }

    return res.json();
}
