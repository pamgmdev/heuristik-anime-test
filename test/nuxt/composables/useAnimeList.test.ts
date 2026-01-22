
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';


let mockRoute;
let mockRouter;
let mockPagination;
let mockData;

beforeEach(() => {
    mockRoute = { query: { page: '2' } };
    mockRouter = { push: vi.fn() };
    mockPagination = { has_next_page: true };
    mockData = ref({ data: [{ mal_id: 1, title: 'Test' }], pagination: mockPagination });

    vi.mock('vue-router', () => ({
        useRoute: () => mockRoute,
        useRouter: () => mockRouter,
    }));
    vi.mock('nuxt/app', () => ({
        useFetch: () => ({
            data: mockData,
            pending: ref(false),
            error: ref(null),
            refresh: vi.fn(),
        }),
    }));
});

vi.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    useRouter: () => mockRouter,
}));
vi.mock('nuxt/app', () => ({
    useFetch: () => ({
        data: mockData,
        pending: ref(false),
        error: ref(null),
        refresh: vi.fn(),
    }),
}));

import { useAnimeList } from '../../../composables/useAnimeList';

describe('useAnimeList', () => 
{
    it('... Devuelve la página actual desde el query', () => 
    {
        const { page } = useAnimeList();
        expect(page.value).toBe(1);
    });

    it('... No va a la página anterior si está en la primera', () => 
    {
        mockRoute.query.page = '1';
        const { prevPage } = useAnimeList();
        prevPage();
        expect(mockRouter.push).not.toHaveBeenCalled();
    });
});
