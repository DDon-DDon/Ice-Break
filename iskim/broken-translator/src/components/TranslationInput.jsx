import { useState } from 'react';

function TranslationInput({ onTranslate, isLoading }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onTranslate(text.trim());
        }
    };

    const exampleTexts = [
        '안녕하세요, 저는 개발자입니다.',
        '오늘 날씨가 정말 좋네요!',
        '이 웹사이트는 완전히 쓸모없습니다.'
    ];

    const handleExample = (example) => {
        setText(example);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="input-text" className="block text-white text-lg font-semibold mb-2">
                        💬 번역할 문장을 입력하세요 (한국어)
                    </label>
                    <textarea
                        id="input-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="예: 안녕하세요, 저는 개발자입니다."
                        className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-lg focus:ring-4 focus:ring-yellow-400 focus:outline-none resize-none"
                        rows="4"
                        disabled={isLoading}
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <p className="w-full text-white/70 text-sm mb-1">빠른 예시:</p>
                    {exampleTexts.map((example, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleExample(example)}
                            disabled={isLoading}
                            className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-all disabled:opacity-50"
                        >
                            예시 {idx + 1}
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!text.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-lg py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            번역 망치는 중...
                        </span>
                    ) : (
                        '🔥 번역 망치기 시작! 🔥'
                    )}
                </button>
            </form>
        </div>
    );
}

export default TranslationInput;
