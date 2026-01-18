import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnimeCard from '~/components/anime/AnimeCard.vue'

describe('AnimeCard', () => {
    it('... Debe renderizar el título del anime correctamente', () =>
    {
        // Simulamos un objeto Anime basado en tu interfaz
        const mockAnime = {
            mal_id: 1,
            title: 'Cowboy Bebop',
            images: {
                jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg' }
            },
            score: 8.75,
            type: 'TV'
        };

        const wrapper = mount(AnimeCard, {
            props: {
                anime: mockAnime as any;
            }
        });

        // Verificamos que el texto del título aparezca en el componente
        expect(wrapper.text()).toContain('Cowboy Bebop');
    });

    it('... Debe tener el enlace correcto al detalle', () =>
    {
        const mockAnime = { mal_id: 1, title: 'Test', images: { jpg: { image_url: '' } } }
        const wrapper = mount(AnimeCard, {
            props: { anime: mockAnime as any }
        });
        
        // Buscamos el componente NuxtLink (que se renderiza como <a> o tiene el atributo 'to')
        const link = wrapper.findComponent({ name: 'NuxtLink' });
        expect(link.props('to')).toBe('/anime/1');
    });
});