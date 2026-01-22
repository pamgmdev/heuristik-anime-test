import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EpisodeList from '../../../components/anime/EpisodeList.vue';

const episodes = [
    {
        mal_id : 101,
        title  : 'Primer episodio',
        aired  : '2024-01-01',
        score  : 8.5,
        filler : false,
    },
    {
        mal_id : 102,
        title  : 'Segundo episodio',
        aired  : '2024-01-08',
        score  : null,
        filler : true,
    },
];

describe('EpisodeList', () => 
{
    it('... Muestra episodios correctamente', () => 
    {
        const wrapper = mount(EpisodeList, {
            props  : { episodes },
            global : {
                stubs : {
                    UBadge : {
                        template : '<span><slot /></span>'
                    },
                    UIcon : true
                }
            },
        });
        expect(wrapper.text()).toContain('Primer episodio');
        expect(wrapper.text()).toContain('Segundo episodio');
        expect(wrapper.text()).toContain('Filler');
        expect(wrapper.text()).toContain('8,5'); // Formato español
        expect(wrapper.text()).toContain('01 ene 2024');
    });

    it('... Muestra mensaje cuando no hay episodios', () => 
    {
        const wrapper = mount(EpisodeList, {
            props  : { episodes : [] },
            global : {
                stubs : ['UBadge', 'UIcon'],
            },
        });
        expect(wrapper.text()).toContain('No hay episodios disponibles.');
    });
});
