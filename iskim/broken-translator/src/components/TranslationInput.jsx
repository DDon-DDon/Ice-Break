import { useState } from 'react';
import { MessageSquare, Zap, Loader2 } from 'lucide-react';

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
        <div className="bg-kahoot-card backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-kahoot-purple/50">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="input-text" className="flex items-center gap-3 text-white text-xl font-bold mb-4">
                        <MessageSquare className="w-6 h-6 text-kahoot-cyan" strokeWidth={3} />
                        번역할 문장을 입력하세요
                    </label>
                    <textarea
                        id="input-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="예: 안녕하세요, 저는 개발자입니다."
                        className="w-full px-6 py-5 bg-kahoot-darkPurple/50 text-white text-lg rounded-2xl focus:ring-4 focus:ring-kahoot-pink focus:outline-none resize-none transition-all duration-300 border-2 border-kahoot-purple/30 placeholder:text-gray-400 font-semibold"
                        rows="4"
                        disabled={isLoading}
                    />
                </div>

                <div className="space-y-3">
                    <p className="text-gray-300 text-sm font-bold">빠른 예시:</p>
                    <div className="flex flex-wrap gap-3">
                        {exampleTexts.map((example, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleExample(example)}
                                disabled={isLoading}
                                className="text-sm bg-kahoot-purple/50 hover:bg-kahoot-purple text-white px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 border-2 border-kahoot-purple font-bold shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                예시 {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!text.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-kahoot-orange to-kahoot-pink hover:from-kahoot-pink hover:to-kahoot-orange text-white font-black text-xl py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-2xl border-4 border-white/20 flex items-center justify-center gap-3"
                >
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
