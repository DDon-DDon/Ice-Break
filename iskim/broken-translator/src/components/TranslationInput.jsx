/**
 * @file TranslationInput.jsx
 * @description 번역 입력 폼 컴포넌트
 * 
 * 사용자가 번역할 텍스트를 입력하고 제출하는 폼입니다.
 * 로컬 상태(useState)로 입력값을 관리하고,
 * 부모 컴포넌트(App)에서 전달받은 콜백으로 번역을 실행합니다.
 * 
 * @component
 * @example
 * <TranslationInput onTranslate={handleTranslate} isLoading={false} />
 */

import { useState } from 'react';

// Lucide React 아이콘
// - MessageSquare: 메시지 아이콘 (입력 필드 라벨)
// - Zap: 번개 아이콘 (제출 버튼)
// - Loader2: 로딩 스피너 (로딩 상태)
import { MessageSquare, Zap, Loader2 } from 'lucide-react';

/**
 * TranslationInput 컴포넌트 - 번역 입력 폼
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onTranslate - 번역 실행 콜백 (text: string) => void
 * @param {boolean} props.isLoading - 로딩 상태 (true면 폼 비활성화)
 * @returns {JSX.Element} 입력 폼 UI
 */
function TranslationInput({ onTranslate, isLoading }) {
    // ===== 로컬 상태 =====
    // text: 사용자가 입력한 텍스트 (제어 컴포넌트 패턴)
    const [text, setText] = useState('');

    /**
     * handleSubmit - 폼 제출 핸들러
     * 
     * 1. 기본 폼 제출 동작 방지 (페이지 새로고침 방지)
     * 2. 입력값 유효성 검사 (공백 제거 후 빈 문자열 체크)
     * 3. 부모 컴포넌트의 onTranslate 콜백 호출
     * 
     * @param {Event} e - 폼 제출 이벤트
     */
    const handleSubmit = (e) => {
        e.preventDefault();  // 기본 동작 방지
        if (text.trim()) {   // 공백만 있는 경우 제출 안 함
            onTranslate(text.trim());
        }
    };

    // ===== 예시 문장 데이터 =====
    // 사용자가 빠르게 테스트할 수 있는 샘플 문장들
    const exampleTexts = [
        '안녕하세요, 저는 개발자입니다.',
        '오늘 날씨가 정말 좋네요!',
        '이 웹사이트는 완전히 쓸모없습니다.'
    ];

    /**
     * handleExample - 예시 버튼 클릭 핸들러
     * 선택한 예시 문장을 입력 필드에 자동 채움
     * 
     * @param {string} example - 선택된 예시 문장
     */
    const handleExample = (example) => {
        setText(example);
    };

    // ===== UI 렌더링 =====
    return (
        // 카드 컨테이너: 글래스모피즘 효과
        <div className="bg-kahoot-card backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-kahoot-purple/50">
            
            {/* 폼 요소: onSubmit으로 Enter 키 제출도 처리 */}
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ========== 텍스트 입력 영역 ========== */}
                <div>
                    {/* 라벨: 접근성을 위해 htmlFor 사용 */}
                    <label htmlFor="input-text" className="flex items-center gap-3 text-white text-xl font-bold mb-4">
                        <MessageSquare className="w-6 h-6 text-kahoot-cyan" strokeWidth={3} />
                        번역할 문장을 입력하세요
                    </label>
                    
                    {/* 텍스트 영역: 제어 컴포넌트 패턴 (value + onChange) */}
                    <textarea
                        id="input-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="예: 안녕하세요, 저는 개발자입니다."
                        className="w-full px-6 py-5 bg-kahoot-darkPurple/50 text-white text-lg rounded-2xl focus:ring-4 focus:ring-kahoot-pink focus:outline-none resize-none transition-all duration-300 border-2 border-kahoot-purple/30 placeholder:text-gray-400 font-semibold"
                        rows="4"
                        disabled={isLoading}  // 로딩 중 입력 비활성화
                    />
                </div>

                {/* ========== 예시 버튼 영역 ========== */}
                <div className="space-y-3">
                    <p className="text-gray-300 text-sm font-bold">빠른 예시:</p>
                    <div className="flex flex-wrap gap-3">
                        {/* 예시 문장들을 버튼으로 렌더링 */}
                        {exampleTexts.map((example, idx) => (
                            <button
                                key={idx}
                                type="button"  // type="button"으로 폼 제출 방지
                                onClick={() => handleExample(example)}
                                disabled={isLoading}
                                className="text-sm bg-kahoot-purple/50 hover:bg-kahoot-purple text-white px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 border-2 border-kahoot-purple font-bold shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                예시 {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ========== 제출 버튼 ========== */}
                <button
                    type="submit"
                    // 비활성화 조건: 빈 입력 또는 로딩 중
                    disabled={!text.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-kahoot-orange to-kahoot-pink hover:from-kahoot-pink hover:to-kahoot-orange text-white font-black text-xl py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-2xl border-4 border-white/20 flex items-center justify-center gap-3"
                >
                    {/* 조건부 렌더링: 로딩 상태에 따라 다른 UI 표시 */}
                    {isLoading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" strokeWidth={3} />
                            번역 망치는 중...
                        </>
                    ) : (
                        <>
                            <Zap className="w-6 h-6" strokeWidth={3} />
                            번역 망치기 시작!
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default TranslationInput;

