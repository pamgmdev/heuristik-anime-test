// composables/useAnimeList.ts
import type { Anime, JikanResponse } from '~/types';

export function useAnimeList()
{
    const route = useRoute();
    const router = useRouter();

    /*
    * Sincronización de la página con el query parameter de la URL
    */
    const page = computed(() => Number(route.query.page) || 1);

    /*
    * useFetch para obtener la lista de animes desde la API interna
    */
    const { data, pending, error, refresh } = useFetch<JikanResponse<Anime[]>>('/api/animes',
    {
        query : { page: page },
        key   : `anime-list-page-${page.value}`, // Clave única por página para caché SSR
        watch : [page]
    });

    /*
    * Datos computados para la lista de animes y la paginación
    */
    const animes = computed(() => data.value?.data ?? []);

    /*
    * Información de paginación devuelta por la API
    */
    const pagination = computed(() => data.value?.pagination);

    /**
     * Función para cambiar de página cambiando la URL
     * @param newPage Número de la nueva página
     */
    function goToPage(newPage: number)
    {
        router.push({ query: { ...route.query, page: newPage } });
    }

    /**
     * Función para ir a la siguiente página
     */
    function nextPage()
    {
        if (pagination.value?.has_next_page)
        {
            goToPage(page.value + 1);
        }
    }

    /**
     * Función para ir a la página anterior
     */
    function prevPage()
    {
        if (page.value > 1) {
            goToPage(page.value - 1);
        }
    }

    return {
        animes,
        pagination,
        page,
        pending,
        error,
        nextPage,
        prevPage,
        goToPage,
        refresh,
    }
}