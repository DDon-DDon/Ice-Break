/**
 * Translation Service
 * Handles translation chain: KR → FI → AR → JA → KR
 * Falls back to mock data if no API key is provided
 */

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const API_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

export const TRANSLATION_CHAIN = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'fi', name: '핀란드어', flag: '🇫🇮' },
    { code: 'ar', name: '아랍어', flag: '🇸🇦' },
    { code: 'ja', name: '일본어', flag: '🇯🇵' },
    { code: 'ko', name: '한국어 (최종)', flag: '🇰🇷' }
];

/**
 * Mock translation for testing without API key
 */
const mockTranslate = (text, targetLang) => {
    const mockResults = {
        fi: '🤖 Tervehdys, olen koodari (핀란드어 가짜 번역)',
        ar: '🤖 مرحبا أنا مبرمج (아랍어 가짜 번역)',
        ja: '🤖 こんにちは、私はプログラマーです (일본어 가짜 번역)',
        ko: '🤖 인사, 나는 코더입니다 (망가진 최종 결과!)'
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockResults[targetLang] || `[Mock: ${text}]`);
        }, 500); // Simulate API delay
    });
};

/**
 * Translate text using Google Translate API
 */
const translateWithAPI = async (text, sourceLang, targetLang) => {
    const url = `${API_ENDPOINT}?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Translation API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(`Translation API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.data || !data.data.translations || !data.data.translations[0]) {
            console.error('Unexpected API response:', data);
            throw new Error('Unexpected API response format');
        }

        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation API fetch error:', error);
        throw error;
    }
};

/**
 * Run the full translation chain
 * @param {string} originalText - Original Korean text
 * @returns {Promise<Array>} Array of translation steps
 */
export const runTranslationChain = async (originalText) => {
    const useMock = !API_KEY || API_KEY === 'your_api_key_here';
    const results = [];
    let currentText = originalText;

    // Add original text
    results.push({
        step: 0,
        language: TRANSLATION_CHAIN[0],
        text: currentText,
        isOriginal: true
    });

    // Translate through the chain
    for (let i = 0; i < TRANSLATION_CHAIN.length - 1; i++) {
        const sourceLang = TRANSLATION_CHAIN[i].code;
        const targetLang = TRANSLATION_CHAIN[i + 1].code;

        try {
            if (useMock) {
                currentText = await mockTranslate(currentText, targetLang);
            } else {
                currentText = await translateWithAPI(currentText, sourceLang, targetLang);
            }

            results.push({
                step: i + 1,
                language: TRANSLATION_CHAIN[i + 1],
                text: currentText,
                isFinal: i === TRANSLATION_CHAIN.length - 2
            });
        } catch (error) {
            console.error(`Translation error at step ${i + 1}:`, error);
            throw error;
        }
    }

    return {
        results,
        usedMockData: useMock
    };
};
