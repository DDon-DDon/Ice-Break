/**
 * @file ComparisonResult.jsx
 * @description 번역 비교 결과 컴포넌트
 * 
 * 원본 텍스트와 최종 번역 결과를 비교하고,
 * "망가짐 지수"를 계산하여 표시합니다.
 * 
 * 망가짐 지수: 두 텍스트의 문자 유사도를 기반으로 계산
 * 높을수록 원본과 많이 달라졌음을 의미
 * 
 * @component
 * @example
 * <ComparisonResult originalText="안녕하세요" finalText="인사, 나는..." />
 */

// Lucide React 아이콘
// - CheckCircle2: 체크 아이콘 (원본 표시)
// - Flame: 불꽃 아이콘 (망가짐 지수 강조)
// - ArrowRightLeft: 화살표 아이콘 (비교 섹션)
// - Sparkles: 반짝임 아이콘 (최종 결과 표시)
import { CheckCircle2, Flame, ArrowRightLeft, Sparkles } from 'lucide-react';

/**
 * ComparisonResult 컴포넌트 - 원본/최종 비교 및 망가짐 지수
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.originalText - 원본 텍스트 (한국어)
 * @param {string} props.finalText - 최종 번역 결과 (다시 한국어로 돌아온)
 * @returns {JSX.Element|null} 비교 UI 또는 null
 */
function ComparisonResult({ originalText, finalText }) {
    // Early return: 텍스트가 없으면 렌더링하지 않음
    if (!originalText || !finalText) return null;

    // ===== 유사도 및 망가짐 지수 계산 =====
    // 유사도: 0~100%, 두 텍스트가 얼마나 비슷한지
    const similarity = calculateSimilarity(originalText, finalText);
    // 망가짐 지수: 100 - 유사도, 높을수록 많이 달라졌음
    const brokenness = 100 - similarity;

    return (
        // 메인 컨테이너: 글래스모피즘 효과
        <div className="mt-10 bg-kahoot-card backdrop-blur-xl rounded-3xl p-8 md:p-10 border-4 border-kahoot-purple/50 shadow-2xl">
            
            {/* ========== 섹션 헤더 ========== */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <ArrowRightLeft className="w-10 h-10 text-kahoot-pink" strokeWidth={3} />
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        얼마나 망가졌을까?
                    </h2>
                </div>
                <p className="text-kahoot-cyan text-lg font-bold">How Broken?</p>
            </div>

            {/* ========== 원본 vs 최종 비교 카드 ========== */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* ----- 원본 텍스트 카드 ----- */}
                <div className="bg-emerald-500/20 rounded-2xl p-6 border-4 border-emerald-400 shadow-xl">
                    <h3 className="text-emerald-400 font-black mb-4 flex items-center gap-2 text-xl">
                        <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
                        원본 (Original)
                    </h3>
                    <div className="bg-kahoot-darkPurple/50 rounded-xl p-5 border-2 border-white/10">
                        <p className="text-white text-lg leading-relaxed font-semibold">{originalText}</p>
                    </div>
                </div>

                {/* ----- 최종 결과 카드 ----- */}
                <div className="bg-kahoot-orange/20 rounded-2xl p-6 border-4 border-kahoot-orange shadow-xl">
                    <h3 className="text-kahoot-orange font-black mb-4 flex items-center gap-2 text-xl">
                        <Sparkles className="w-6 h-6" strokeWidth={3} />
                        최종 결과 (Final)
                    </h3>
                    <div className="bg-kahoot-darkPurple/50 rounded-xl p-5 border-2 border-white/10">
                        <p className="text-white text-lg leading-relaxed font-semibold">{finalText}</p>
                    </div>
                </div>
            </div>

            {/* ========== 망가짐 지수 표시 ========== */}
            <div className="text-center">
                <div className="inline-block bg-gradient-to-br from-kahoot-orange/30 to-kahoot-pink/30 backdrop-blur-xl rounded-3xl px-12 py-10 border-4 border-kahoot-pink shadow-2xl">
                    
                    {/* 라벨 */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Flame className="w-8 h-8 text-kahoot-orange animate-pulse" strokeWidth={3} />
                        <p className="text-white text-lg font-black tracking-wide uppercase">망가짐 지수</p>
                        <Flame className="w-8 h-8 text-kahoot-orange animate-pulse" strokeWidth={3} />
                    </div>
                    
                    {/* 지수 값 (큰 숫자) */}
                    <p className="text-9xl font-black bg-gradient-to-r from-kahoot-orange via-kahoot-pink to-kahoot-cyan bg-clip-text text-transparent drop-shadow-2xl mb-4 animate-pulse">
                        {brokenness.toFixed(0)}%
                    </p>
                    
                    {/* 망가짐 수준 메시지 */}
                    <p className="text-white text-2xl font-black">
                        {getBrokennessMesage(brokenness)}
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * calculateSimilarity - 두 문자열의 유사도 계산
 * 
 * Jaccard 유사도 알고리즘 사용:
 * - 두 집합의 교집합 / 합집합
 * - 문자(공백 제외) 기준으로 계산
 * 
 * @param {string} str1 - 첫 번째 문자열
 * @param {string} str2 - 두 번째 문자열
 * @returns {number} 유사도 (0~100%)
 * 
 * @example
 * calculateSimilarity("안녕", "안녕") // 100
 * calculateSimilarity("안녕", "하세요") // 0
 */
function calculateSimilarity(str1, str2) {
    // 공백 제거 후 문자 집합 생성
    const set1 = new Set(str1.replace(/\s/g, ''));
    const set2 = new Set(str2.replace(/\s/g, ''));

    // 교집합: 두 집합에 모두 있는 문자
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // 합집합: 두 집합의 모든 문자 (중복 제거)
    const union = new Set([...set1, ...set2]);

    // Jaccard 유사도: 교집합 크기 / 합집합 크기 * 100
    return (intersection.size / union.size) * 100;
}

/**
 * getBrokennessMesage - 망가짐 지수에 따른 메시지 반환
 * 
 * @param {number} score - 망가짐 지수 (0~100)
 * @returns {string} 망가짐 수준 메시지 (이모지 포함)
 */
function getBrokennessMesage(score) {
    if (score >= 90) return '🔥 완벽하게 파괴됨!';    // 90% 이상: 완전히 다름
    if (score >= 70) return '💥 엄청 망가졌어요!';    // 70~89%: 많이 다름
    if (score >= 50) return '😵 많이 망가졌네요!';    // 50~69%: 중간
    if (score >= 30) return '😅 조금 망가졌어요';     // 30~49%: 약간 다름
    return '🤔 어? 너무 비슷한데?';                   // 30% 미만: 거의 비슷함
}

export default ComparisonResult;

