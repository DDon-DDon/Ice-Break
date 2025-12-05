import { describe, it, expect } from 'vitest';
import { runTranslationChain, TRANSLATION_CHAIN } from './translationService';

describe('translationService', () => {
    it('should return a result with the correct structure', async () => {
        const input = '안녕하세요';
        const result = await runTranslationChain(input);

        expect(result).toHaveProperty('results');
        expect(result).toHaveProperty('usedMockData');
        expect(Array.isArray(result.results)).toBe(true);

        // Check if the chain length matches (original + steps)
        // TRANSLATION_CHAIN has 5 items (ko, fi, ar, ja, ko)
        // results should have:
        // 1. Original (ko)
        // 2. fi
        // 3. ar
        // 4. ja
        // 5. ko (final)
        expect(result.results.length).toBe(TRANSLATION_CHAIN.length);
    });

    it('should correctly mark the original and final text', async () => {
        const input = '테스트';
        const { results } = await runTranslationChain(input);

        expect(results[0].isOriginal).toBe(true);
        expect(results[results.length - 1].isFinal).toBe(true);
    });

    it('should use mock data when API key is missing', async () => {
        const input = '테스트';
        const { usedMockData } = await runTranslationChain(input);

        // Check if API key is present in the environment
        const hasKey = !!import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY && import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY !== 'your_api_key_here';

        if (!hasKey) {
            expect(usedMockData).toBe(true);
        } else {
            // If key is present, it should use real API (or at least not force mock)
            // But since we can't easily force it to be missing if it's there, we accept false too
            // or we could skip. Ideally we'd expect false here.
            expect(usedMockData).toBe(false);
        }
    });
});
