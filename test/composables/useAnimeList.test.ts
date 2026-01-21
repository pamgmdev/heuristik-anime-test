import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAnimeList } from '~/composables/useAnimeList'

// Mock de las funciones de Nuxt
vi.mock('#app', () => ({
    useRoute: vi.fn(),
    useRouter: vi.fn(),
    useFetch: vi.fn(),
    computed: (fn: any) => ({ value: fn() })
}))

describe('Composables: useAnimeList', () =>
{
    let mockRoute: any
    let mockRouter: any
    let mockUseFetch: any

    beforeEach(() =>
    {
        mockRoute = {
            query: { page: '1' }
        }
        mockRouter = {
            push: vi.fn()
        }
        mockUseFetch = vi.fn(() => ({
            data: {
                value: {
                    data: [{ id: 1, title: 'Anime 1' }],
                    pagination: { has_next_page: true }
                }
            },
            pending: { value: false },
            error: { value: null },
            refresh: vi.fn()
        }))
    })

    it('... Debería retornar la lista de animes', () =>
    {
        const { animes } = useAnimeList()
        expect(animes.value).toBeDefined()
    })

    it('... Debería ir a la siguiente página si hay disponible', () =>
    {
        const { nextPage } = useAnimeList()
        nextPage()
        expect(mockRouter.push).toHaveBeenCalled()
    })

    it('... Debería ir a la página anterior si no es la primera', () =>
    {
        const { prevPage, goToPage } = useAnimeList()
        goToPage(2)
        prevPage()
        expect(mockRouter.push).toHaveBeenCalled()
    })

    it('... Debería obtener la página actual de la URL', () =>
    {
        const { page } = useAnimeList()
        expect(page.value).toBe(1)
    })
})