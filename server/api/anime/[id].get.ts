import { getAnimeById } from '../../services/jikan.service';

export default defineEventHandler(async(event) =>
{
    const id = Number(event.context.params?.id);
    return getAnimeById(id);
});
