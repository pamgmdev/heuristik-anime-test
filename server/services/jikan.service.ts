// server/services/jikan.service.ts

const BASE_URL = 'https://api.jikan.moe/v4';

/*
* Interfaz genérica para respuestas de Jikan API
*/
export interface JikanResponse<T>
{
    data        : T;
    pagination? :
    {
        last_visible_page : number
        has_next_page     : boolean
        current_page      : number
        items?            :
        {
            count    : number
            total    : number
            per_page : number
        }
    };
}

/**
 * Fetch genérico con manejo de errores
 */
async function jikanFetch<T>(endpoint: string): Promise<JikanResponse<T>>
{
    try
    {
        return await $fetch<JikanResponse<T>>(`${BASE_URL}${endpoint}`,
            {
                retry      : 2,
                retryDelay : 500,
            });
    }
    catch(error)
    {
        console.error('[JIKAN API ERROR]', error);
        throw new Error('Error al obtener datos desde Jikan API');
    }
}

/**
 * Obtener listado de animes
 */
export function getAnimes(page = 1, limit = 24)
{
    return jikanFetch(`/anime?page=${page}&limit=${limit}`);
}

/**
 * Obtener detalle de un anime
 */
export function getAnimeById(id: number)
{
    return jikanFetch(`/anime/${id}`);
}

/**
 * Obtener episodios de un anime
 */
export function getEpisodesByAnime(id: number, page = 1)
{
    return jikanFetch(`/anime/${id}/episodes?page=${page}`);
}

