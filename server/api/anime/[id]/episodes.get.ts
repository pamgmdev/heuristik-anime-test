// server/api/anime/[id]/episodes.get.ts
import { getEpisodesByAnime } from "~/server/services/jikan.service";

export default defineEventHandler(async(event) =>
{
    // Obtenemos el ID de los parámetros de la ruta
    const id = getRouterParam(event, 'id');

    if (!id)
    {
        throw createError({
            statusCode    : 400,
            statusMessage : 'ID de anime no proporcionado',
        });
    }

    try
    {
        // Llamo al servicio jikan
        const data = await getEpisodesByAnime(id);
        return data;
    }
    catch(error)
    {
        throw createError({
            statusCode    : 500,
            statusMessage : 'Error al obtener episodios desde Jikan',
        });
    }
});