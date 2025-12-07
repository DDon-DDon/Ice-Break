/**
 * @file Header.jsx
 * @description 페이지 헤더 컴포넌트
 * 
 * 앱 상단에 표시되는 타이틀과 부제목을 담당합니다.
 * 순수 표시(Presentational) 컴포넌트로, 상태를 가지지 않습니다.
 * 
 * @component
 * @example
 * return <Header />
 */

// Lucide React: 아이콘 라이브러리
// - Globe: 지구본 아이콘 (번역 테마)
// - Sparkles: 반짝임 아이콘 (장식용)
// - AlertTriangle: 경고 아이콘 (재미 요소)
import { Globe, Sparkles, AlertTriangle } from 'lucide-react';

/**
 * Header 컴포넌트 - 앱 헤더 영역
 * 
 * 구성 요소:
 * 1. 메인 타이틀 ("Broken Translator")
 * 2. 한국어 부제목 ("번역기 전화 놀이")
 * 3. 영어 슬로건 ("Where meanings go to die!")
 * 4. 쓸모없음 지수 뱃지 (유머 요소)
 * 
 * @returns {JSX.Element} 헤더 UI
 */
function Header() {
    return (
        // header 태그: 시맨틱 HTML, 페이드인 애니메이션 적용
        <header className="text-center mb-10 animate-fadeIn">
            
            {/* ========== 메인 타이틀 섹션 ========== */}
            <div className="flex items-center justify-center gap-4 mb-4">
                {/* 좌측 지구본 아이콘: 느린 회전 애니메이션 */}
                <Globe className="w-16 h-16 text-kahoot-pink animate-spin-slow" strokeWidth={2} />
                
                {/* 메인 타이틀: 그라데이션 텍스트 효과 */}
                <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-kahoot-pink via-kahoot-purple to-kahoot-cyan bg-clip-text text-transparent drop-shadow-2xl">
                    Broken
                    {/* 모바일에서만 줄바꿈 */}
                    <br className="md:hidden" />
                    Translator
                </h1>
                
                {/* 우측 지구본 아이콘 */}
                <Globe className="w-16 h-16 text-kahoot-cyan animate-spin-slow" strokeWidth={2} />
            </div>

            {/* ========== 한국어 부제목 ========== */}
            <p className="text-2xl md:text-3xl text-white mb-3 font-bold">
                번역기 전화 놀이
            </p>

            {/* ========== 영어 슬로건 ========== */}
            <p className="text-lg text-kahoot-pink font-bold flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5" />
                Where meanings go to die!
                <Sparkles className="w-5 h-5" />
            </p>

            {/* ========== 쓸모없음 지수 뱃지 ========== */}
            {/* 유머러스한 자기 비하 요소 */}
            <div className="inline-flex items-center gap-3 bg-kahoot-orange/20 backdrop-blur-sm rounded-2xl px-6 py-3 border-4 border-kahoot-orange shadow-2xl">
                <AlertTriangle className="w-6 h-6 text-kahoot-orange" strokeWidth={3} />
                <p className="text-white font-black text-sm">
                    쓸모없음 지수: ⭐⭐⭐⭐⭐
                </p>
            </div>
        </header>
    );
}

export default Header;

