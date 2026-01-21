import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnimeCard from '~/components/anime/AnimeCard.vue';

describe('AnimeCard', () => 
{
    it('... Debe renderizar el título del anime correctamente', () => 
    {
        const mockAnime = {
            mal_id : 1,
            title  : 'Cowboy Bebop',
            images : {
                jpg : { image_url : 'https://cdn.myanimelist.net/images/anime/4/19644.jpg' }
            },
            score : 8.75,
            type  : 'TV'
        };

        const wrapper = mount(AnimeCard, {
            props : {
                anime : mockAnime as any
            }
        });

        expect(wrapper.text()).toContain('Cowboy Bebop');
    });

    it('... Debe tener el enlace correcto al detalle', () => 
    {
        const mockAnime = { mal_id : 1, title : 'Test', images : { jpg : { image_url : '' } } };
        const wrapper = mount(AnimeCard, {
            props : { anime : mockAnime as any }
        });
        
        const link = wrapper.findComponent({ name : 'NuxtLink' });
        expect(link.props('to')).toBe('/anime/1');
    });

    it('... Debe renderizar la imagen del anime', () => 
    {
        const mockAnime = { mal_id : 1, title : 'Test', images : { jpg : { image_url : 'https://example.com/image.jpg' } } };
        const wrapper = mount(AnimeCard, { props : { anime : mockAnime as any } });
        
        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('https://example.com/image.jpg');
    });

    it('... Debe mostrar el score del anime', () => 
    {
        const mockAnime = { mal_id : 1, title : 'Test', images : { jpg : { image_url : '' } }, score : 8.5 };
        const wrapper = mount(AnimeCard, { props : { anime : mockAnime as any } });
        
        expect(wrapper.text()).toContain('8.5');
    });

    it('... Debe mostrar el tipo de anime', () => 
    {
        const mockAnime = { mal_id : 1, title : 'Test', images : { jpg : { image_url : '' } }, type : 'TV' };
        const wrapper = mount(AnimeCard, { props : { anime : mockAnime as any } });
        
        expect(wrapper.text()).toContain('TV');
    });
});