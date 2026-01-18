import { getAnimes } from '../services/jikan.service'

export default defineEventHandler(async (event) =>
{
    const query = getQuery(event);
    const page = Number(query.page || 1);

    return getAnimes(page);
})
