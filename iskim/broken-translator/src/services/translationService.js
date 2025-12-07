/**
 * @file translationService.js
 * @description 번역 서비스 모듈
 * 
 * 핵심 비즈니스 로직을 담당하는 서비스 레이어입니다.
 * Google Translate API를 사용하여 번역 체인을 실행하고,
 * API 키가 없으면 모킹 데이터로 폴백합니다.
 * 
 * 번역 체인: 한국어(ko) → 핀란드어(fi) → 아랍어(ar) → 일본어(ja) → 한국어(ko)
 * 
 * @module translationService
 */

// ===== 환경 변수 및 상수 =====

/**
 * Google Translate API 키
 * Vite 환경 변수에서 로드 (VITE_ 접두사 필수)
 * .env 파일에 VITE_GOOGLE_TRANSLATE_API_KEY=your_key 형태로 설정
 */
const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

/**
 * Google Cloud Translation API 엔드포인트
 * v2 버전 사용 (기본 번역 API)
 */
const API_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

/**
 * 번역 체인 정의
 * 
 * 언어가 순차적으로 바뀌면서 번역되는 순서를 정의
 * 각 언어에 대한 메타정보 (코드, 이름, 국기 이모지) 포함
 * 
 * @constant
 * @type {Array<{code: string, name: string, flag: string}>}
 */
export const TRANSLATION_CHAIN = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },           // 시작 언어 (원본)
    { code: 'fi', name: '핀란드어', flag: '🇫🇮' },        // 1차 번역: 한국어 → 핀란드어
    { code: 'ar', name: '아랍어', flag: '🇸🇦' },          // 2차 번역: 핀란드어 → 아랍어
    { code: 'ja', name: '일본어', flag: '🇯🇵' },          // 3차 번역: 아랍어 → 일본어
    { code: 'ko', name: '한국어 (최종)', flag: '🇰🇷' }    // 4차 번역: 일본어 → 한국어 (최종)
];

// ===== 모킹 함수 (API 키 없을 때 사용) =====

/**
 * mockTranslate - 가짜 번역 함수
 * 
 * API 키가 없거나 테스트 환경에서 사용됩니다.
 * 실제 번역 대신 미리 정의된 가짜 결과를 반환합니다.
 * 
 * @param {string} text - 원본 텍스트 (사용하지 않지만 인터페이스 일관성을 위해 유지)
 * @param {string} targetLang - 대상 언어 코드 (fi, ar, ja, ko)
 * @returns {Promise<string>} 가짜 번역 결과
 * 
 * @example
 * const result = await mockTranslate("안녕", "fi");
 * // 결과: "🤖 Tervehdys, olen koodari (핀란드어 가짜 번역)"
 */
const mockTranslate = (text, targetLang) => {
    // 언어별 미리 정의된 가짜 번역 결과
    const mockResults = {
        fi: '🤖 Tervehdys, olen koodari (핀란드어 가짜 번역)',
        ar: '🤖 مرحبا أنا مبرمج (아랍어 가짜 번역)',
        ja: '🤖 こんにちは、私はプログラマーです (일본어 가짜 번역)',
        ko: '🤖 인사, 나는 코더입니다 (망가진 최종 결과!)'
    };

    // Promise로 감싸서 비동기 API처럼 동작
    return new Promise((resolve) => {
        // 500ms 딜레이로 실제 API 호출처럼 보이게 함
        setTimeout(() => {
            resolve(mockResults[targetLang] || `[Mock: ${text}]`);
        }, 500);
    });
};

// ===== 실제 API 호출 함수 =====

/**
 * translateWithAPI - Google Translate API 호출
 * 
 * 실제 Google Cloud Translation API를 호출하여 번역합니다.
 * 
 * @param {string} text - 번역할 텍스트
 * @param {string} sourceLang - 원본 언어 코드 (예: 'ko')
 * @param {string} targetLang - 대상 언어 코드 (예: 'fi')
 * @returns {Promise<string>} 번역된 텍스트
 * @throws {Error} API 호출 실패 또는 응답 형식 오류
 * 
 * @example
 * const result = await translateWithAPI("안녕하세요", "ko", "fi");
 * // 결과: "Hei"
 */
const translateWithAPI = async (text, sourceLang, targetLang) => {
    // API URL에 키 포함 (쿼리 파라미터)
    const url = `${API_ENDPOINT}?key=${API_KEY}`;

    try {
        // POST 요청으로 번역 API 호출
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,           // 번역할 텍스트
                source: sourceLang, // 원본 언어
                target: targetLang, // 대상 언어
                format: 'text'      // 텍스트 형식 (HTML도 가능)
            })
        });

        // HTTP 에러 처리
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Translation API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(`Translation API error: ${response.status} - ${response.statusText}`);
        }

        // 응답 JSON 파싱
        const data = await response.json();

        // 응답 형식 검증
        // Google API 응답: { data: { translations: [{ translatedText: "..." }] } }
        if (!data.data || !data.data.translations || !data.data.translations[0]) {
            console.error('Unexpected API response:', data);
            throw new Error('Unexpected API response format');
        }

        // 번역된 텍스트 반환
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation API fetch error:', error);
        throw error;  // 상위 호출자에게 에러 전파
    }
};

// ===== 메인 번역 체인 함수 =====

/**
 * runTranslationChain - 전체 번역 체인 실행
 * 
 * 원본 한국어 텍스트를 여러 언어를 거쳐 다시 한국어로 번역합니다.
 * 각 단계의 결과를 배열로 수집하여 반환합니다.
 * 
 * 번역 흐름:
 * 1. 한국어 (원본) [저장]
 * 2. 한국어 → 핀란드어 [저장]
 * 3. 핀란드어 → 아랍어 [저장]
 * 4. 아랍어 → 일본어 [저장]
 * 5. 일본어 → 한국어 [저장] (최종)
 * 
 * @param {string} originalText - 원본 한국어 텍스트
 * @returns {Promise<{results: Array, usedMockData: boolean}>} 번역 결과 객체
 * 
 * @example
 * const { results, usedMockData } = await runTranslationChain("안녕하세요");
 * // results[0]: 원본 한국어
 * // results[1]: 핀란드어 번역
 * // results[4]: 최종 한국어 (망가진 버전)
 */
export const runTranslationChain = async (originalText) => {
    // 모킹 사용 여부 결정
    // API 키가 없거나 기본값('your_api_key_here')이면 모킹 사용
    const useMock = !API_KEY || API_KEY === 'your_api_key_here';
    
    // 결과를 저장할 배열
    const results = [];
    
    // 현재 번역 중인 텍스트 (다음 단계의 입력으로 사용)
    let currentText = originalText;

    // ===== 1. 원본 텍스트 저장 =====
    results.push({
        step: 0,                           // 단계 번호 (0-indexed)
        language: TRANSLATION_CHAIN[0],    // 언어 정보 (한국어)
        text: currentText,                 // 텍스트 내용
        isOriginal: true                   // 원본 표시 (UI에서 특별 스타일링)
    });

    // ===== 2. 번역 체인 실행 =====
    // TRANSLATION_CHAIN 배열을 순회하며 각 단계 번역
    // i번째 언어 → (i+1)번째 언어로 번역
    for (let i = 0; i < TRANSLATION_CHAIN.length - 1; i++) {
        const sourceLang = TRANSLATION_CHAIN[i].code;      // 원본 언어 코드
        const targetLang = TRANSLATION_CHAIN[i + 1].code;  // 대상 언어 코드

        try {
            // 모킹 또는 실제 API 호출
            if (useMock) {
                currentText = await mockTranslate(currentText, targetLang);
            } else {
                currentText = await translateWithAPI(currentText, sourceLang, targetLang);
            }

            // 번역 결과 저장
            results.push({
                step: i + 1,                        // 단계 번호
                language: TRANSLATION_CHAIN[i + 1], // 대상 언어 정보
                text: currentText,                  // 번역된 텍스트
                isFinal: i === TRANSLATION_CHAIN.length - 2  // 마지막 단계 여부
            });
        } catch (error) {
            // 특정 단계에서 에러 발생 시 로깅 후 상위로 전파
            console.error(`Translation error at step ${i + 1}:`, error);
            throw error;
        }
    }

    // ===== 3. 결과 반환 =====
    return {
        results,           // 모든 단계의 번역 결과 배열
        usedMockData: useMock  // 모킹 사용 여부 (UI에서 알림 표시용)
    };
};

