/**
 * @file translationService.test.js
 * @description translationService 모듈 단위 테스트
 * 
 * 번역 서비스의 핵심 로직을 검증하는 테스트입니다.
 * Vitest를 사용하여 비동기 함수와 데이터 구조를 테스트합니다.
 * 
 * @see https://vitest.dev/api/
 */

// ===== Vitest 테스트 유틸리티 =====
import { describe, it, expect } from 'vitest';

// 테스트 대상 모듈
// - runTranslationChain: 메인 번역 함수
// - TRANSLATION_CHAIN: 번역 체인 상수 배열
import { runTranslationChain, TRANSLATION_CHAIN } from './translationService';

/**
 * translationService 모듈 테스트 스위트
 * 
 * 테스트 케이스:
 * 1. 반환값의 데이터 구조가 올바른지
 * 2. 원본/최종 플래그가 정확히 설정되는지
 * 3. API 키 없을 때 모킹 데이터를 사용하는지
 */
describe('translationService', () => {
    
    /**
     * 테스트 1: 반환값 구조 검증
     * 
     * runTranslationChain 함수가 올바른 구조의 객체를 반환하는지 확인
     * - results 프로퍼티: 번역 단계 배열
     * - usedMockData 프로퍼티: 모킹 사용 여부
     * - 배열 길이: TRANSLATION_CHAIN 길이와 동일 (5개)
     */
    it('should return a result with the correct structure', async () => {
        const input = '안녕하세요';
        
        // 비동기 함수 호출 (await 사용)
        const result = await runTranslationChain(input);

        // 구조 검증: 필수 프로퍼티 존재 여부
        expect(result).toHaveProperty('results');
        expect(result).toHaveProperty('usedMockData');
        
        // results가 배열인지 확인
        expect(Array.isArray(result.results)).toBe(true);

        /**
         * 배열 길이 검증
         * 
         * TRANSLATION_CHAIN 구조:
         * - [0] ko: 원본 (한국어)
         * - [1] fi: 1차 번역 (핀란드어)
         * - [2] ar: 2차 번역 (아랍어)
         * - [3] ja: 3차 번역 (일본어)
         * - [4] ko: 최종 (한국어)
         * 
         * 총 5개의 결과가 있어야 함
         */
        expect(result.results.length).toBe(TRANSLATION_CHAIN.length);
    });

    /**
     * 테스트 2: 원본/최종 플래그 검증
     * 
     * 첫 번째 결과에는 isOriginal=true,
     * 마지막 결과에는 isFinal=true가 설정되어야 함
     * 
     * 이 플래그들은 UI에서 특별한 스타일링에 사용됨
     */
    it('should correctly mark the original and final text', async () => {
        const input = '테스트';
        
        // 구조 분해 할당으로 results만 추출
        const { results } = await runTranslationChain(input);

        // 첫 번째 결과: 원본 플래그
        expect(results[0].isOriginal).toBe(true);
        
        // 마지막 결과: 최종 플래그
        expect(results[results.length - 1].isFinal).toBe(true);
    });

    /**
     * 테스트 3: 모킹 모드 동작 검증
     * 
     * API 키 설정 여부에 따라 usedMockData 값이 달라져야 함
     * - API 키 없음: usedMockData = true (가짜 데이터 사용)
     * - API 키 있음: usedMockData = false (실제 API 호출)
     * 
     * 참고: 이 테스트는 환경에 따라 동작이 달라짐
     */
    it('should use mock data when API key is missing', async () => {
        const input = '테스트';
        const { usedMockData } = await runTranslationChain(input);

        // 환경 변수에서 API 키 확인
        const hasKey = !!import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY 
            && import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY !== 'your_api_key_here';

        if (!hasKey) {
            // API 키가 없으면 모킹 사용해야 함
            expect(usedMockData).toBe(true);
        } else {
            // API 키가 있으면 실제 API 사용
            // (실제 환경에서는 false여야 하지만, 테스트 환경에 따라 다를 수 있음)
            expect(usedMockData).toBe(false);
        }
    });
});

