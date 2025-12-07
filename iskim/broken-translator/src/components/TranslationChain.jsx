/**
 * @file TranslationChain.jsx
 * @description 번역 체인 시각화 컴포넌트
 * 
 * 번역 결과의 각 단계(한국어→핀란드어→아랍어→일본어→한국어)를
 * 카드 형태로 시각화합니다. 각 언어별로 다른 색상을 적용하고,
 * 원본과 최종 결과를 특별히 강조합니다.
 * 
 * @component
 * @example
 * <TranslationChain results={translationData.results} usedMockData={false} />
 */

// Lucide React 아이콘
// - Info: 정보 아이콘 (모킹 모드 알림)
// - CheckCircle2: 체크 아이콘 (원본/최종 표시)
// - ArrowDown: 화살표 아이콘 (단계 간 연결)
// - Languages: 언어 아이콘 (각 카드 아이콘)
import { Info, CheckCircle2, ArrowDown, Languages } from 'lucide-react';

/**
 * 언어별 색상 테마 설정
 * 
 * 각 언어 코드에 대해 텍스트, 배경, 테두리 색상을 정의
 * Tailwind CSS 클래스를 사용하여 일관된 디자인 시스템 유지
 */
const languageColors = {
    'ko': { text: 'text-kahoot-cyan', bg: 'bg-kahoot-cyan/20', border: 'border-kahoot-cyan' },      // 한국어: 시안
    'fi': { text: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400' },               // 핀란드어: 파랑
    'ar': { text: 'text-emerald-400', bg: 'bg-emerald-400/20', border: 'border-emerald-400' },      // 아랍어: 에메랄드
    'ja': { text: 'text-kahoot-pink', bg: 'bg-kahoot-pink/20', border: 'border-kahoot-pink' },      // 일본어: 핑크
};

/**
 * TranslationChain 컴포넌트 - 번역 단계 시각화
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.results - 번역 결과 배열 (각 단계별 text, language, isOriginal, isFinal)
 * @param {boolean} props.usedMockData - 모킹 데이터 사용 여부 (API 키 없을 때 true)
 * @returns {JSX.Element|null} 번역 체인 UI 또는 null (결과 없으면)
 */
function TranslationChain({ results, usedMockData }) {
    // Early return: 결과가 없으면 아무것도 렌더링하지 않음
    if (!results || results.length === 0) return null;

    return (
        <div className="space-y-6 mt-10">
            
            {/* ========== 모킹 모드 알림 ========== */}
            {/* API 키가 없어서 가짜 데이터를 사용할 때 표시 */}
            {usedMockData && (
                <div className="bg-kahoot-cyan/20 backdrop-blur-xl rounded-2xl p-5 border-4 border-kahoot-cyan shadow-2xl">
                    <p className="text-white text-sm flex items-center gap-3 font-bold">
                        <Info className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
                        <span>
                            <strong className="font-black">모킹 모드:</strong> API 키가 설정되지 않아 가짜 번역 데이터를 사용 중입니다.
                        </span>
                    </p>
                </div>
            )}

            {/* ========== 섹션 타이틀 ========== */}
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                    번역 여정
                </h2>
                <p className="text-kahoot-pink text-lg font-bold">Translation Journey</p>
            </div>

            {/* ========== 번역 단계 카드 목록 ========== */}
            <div className="space-y-4">
                {/* results 배열을 순회하며 각 단계 렌더링 */}
                {results.map((result, index) => {
                    // 언어 코드에 해당하는 색상 테마 가져오기 (없으면 한국어 기본값)
                    const colorScheme = languageColors[result.language.code] || languageColors['ko'];
                    
                    // 원본(첫 번째)인지, 최종 결과(마지막)인지 플래그
                    const isOriginal = result.isOriginal;
                    const isFinal = result.isFinal;

                    return (
                        <div key={index}>
                            {/* ===== 번역 카드 ===== */}
                            <div
                                className={`
                  transform transition-all duration-500 animate-slideUp
                  ${isOriginal ? 'bg-emerald-500/20 border-emerald-400' : ''}
                  ${isFinal ? 'bg-kahoot-orange/20 border-kahoot-orange' : ''}
                  ${!isOriginal && !isFinal ? `${colorScheme.bg} ${colorScheme.border}` : ''}
                  backdrop-blur-xl rounded-2xl p-6 border-4 hover:shadow-2xl transition-all hover:scale-[1.02]
                `}
                                // 순차적 애니메이션 딜레이 (index * 100ms)
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* ----- 카드 헤더: 언어 정보 ----- */}
                                <div className="flex items-center gap-4 mb-4">
                                    {/* 언어 아이콘 컨테이너 */}
                                    <div className={`p-4 rounded-2xl ${colorScheme.bg} border-4 ${colorScheme.border} shadow-lg`}>
                                        <Languages className={`w-8 h-8 ${colorScheme.text}`} strokeWidth={3} />
                                    </div>
                                    
                                    {/* 언어 이름 + 단계 번호 */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            {/* 단계 번호 뱃지 */}
                                            <span className="text-white/60 text-sm font-black bg-white/10 px-3 py-1 rounded-lg">
                                                STEP {result.step + 1}
                                            </span>
                                            {/* 언어 이름 */}
                                            <h3 className="text-white font-black text-2xl">
                                                {result.language.name}
                                            </h3>
                                        </div>
                                        
                                        {/* 원본 태그 (첫 번째 결과에만 표시) */}
                                        {isOriginal && (
                                            <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-bold mt-1">
                                                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> 원본 (Original)
                                            </span>
                                        )}
                                        
                                        {/* 최종 태그 (마지막 결과에만 표시) */}
                                        {isFinal && (
                                            <span className="inline-flex items-center gap-1 text-kahoot-orange text-sm font-bold mt-1">
                                                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> 최종 결과 (Final)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* ----- 번역 텍스트 표시 영역 ----- */}
                                <div className="bg-kahoot-darkPurple/50 rounded-xl p-5 border-2 border-white/10">
                                    <p className="text-white text-lg leading-relaxed font-semibold">{result.text}</p>
                                </div>
                            </div>

                            {/* ===== 단계 간 연결 화살표 ===== */}
                            {/* 마지막 결과가 아닌 경우에만 표시 */}
                            {index < results.length - 1 && (
                                <div className="flex justify-center py-2">
                                    <ArrowDown className="text-kahoot-pink w-8 h-8" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TranslationChain;

