import { Info, CheckCircle2, ArrowDown, Languages } from 'lucide-react';

const languageColors = {
    'ko': { text: 'text-kahoot-cyan', bg: 'bg-kahoot-cyan/20', border: 'border-kahoot-cyan' },
    'fi': { text: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400' },
    'ar': { text: 'text-emerald-400', bg: 'bg-emerald-400/20', border: 'border-emerald-400' },
    'ja': { text: 'text-kahoot-pink', bg: 'bg-kahoot-pink/20', border: 'border-kahoot-pink' },
};

function TranslationChain({ results, usedMockData }) {
    if (!results || results.length === 0) return null;

    return (
        <div className="space-y-6 mt-10">
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

            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                    번역 여정
                </h2>
                <p className="text-kahoot-pink text-lg font-bold">Translation Journey</p>
            </div>

            <div className="space-y-4">
                {results.map((result, index) => {
                    const colorScheme = languageColors[result.language.code] || languageColors['ko'];
                    const isOriginal = result.isOriginal;
                    const isFinal = result.isFinal;

                    return (
                        <div key={index}>
                            <div
                                className={`
                  transform transition-all duration-500 animate-slideUp
                  ${isOriginal ? 'bg-emerald-500/20 border-emerald-400' : ''}
                  ${isFinal ? 'bg-kahoot-orange/20 border-kahoot-orange' : ''}
                  ${!isOriginal && !isFinal ? `${colorScheme.bg} ${colorScheme.border}` : ''}
                  backdrop-blur-xl rounded-2xl p-6 border-4 hover:shadow-2xl transition-all hover:scale-[1.02]
                `}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-4 rounded-2xl ${colorScheme.bg} border-4 ${colorScheme.border} shadow-lg`}>
                                        <Languages className={`w-8 h-8 ${colorScheme.text}`} strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-white/60 text-sm font-black bg-white/10 px-3 py-1 rounded-lg">
                                                STEP {result.step + 1}
                                            </span>
                                            <h3 className="text-white font-black text-2xl">
                                                {result.language.name}
                                            </h3>
                                        </div>
                                        {isOriginal && (
                                            <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-bold mt-1">
                                                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> 원본 (Original)
                                            </span>
                                        )}
                                        {isFinal && (
                                            <span className="inline-flex items-center gap-1 text-kahoot-orange text-sm font-bold mt-1">
                                                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> 최종 결과 (Final)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-kahoot-darkPurple/50 rounded-xl p-5 border-2 border-white/10">
                                    <p className="text-white text-lg leading-relaxed font-semibold">{result.text}</p>
                                </div>
                            </div>

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
