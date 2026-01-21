import { describe, it, expect } from 'vitest';

// Función que formatea la puntuación del anime

const formatScore = (score: number | null) =>
{
    if (!score)
    {
        return 'N/A';
    }

    return `★ ${score.toFixed(1)}`;
};

describe('Utils: formatScore', () =>
{
    it('... Debería retornar ★ y un decimal si hay puntuación', () =>
    {
        expect(formatScore(8.567)).toBe('★ 8.6');
    });

    it('... Debería retornar N/A si el score es null', () =>
    {
        expect(formatScore(null)).toBe('N/A');
    });
});