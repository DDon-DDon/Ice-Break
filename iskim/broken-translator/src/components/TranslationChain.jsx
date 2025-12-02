function TranslationChain({ results, usedMockData }) {
    if (!results || results.length === 0) return null;

    return (
        <div className="space-y-6 mt-8">
            {usedMockData && (
                <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400">
                    <p className="text-blue-200 text-sm flex items-center gap-2">
                        <span>ℹ️</span>
                        <span>
                            <strong>모킹 모드:</strong> API 키가 설정되지 않아 가짜 번역 데이터를 사용 중입니다.
                            실제 번역을 하려면 <code className="bg-blue-900/50 px-2 py-1 rounded">.env</code> 파일에 Google Translate API 키를 추가하세요!
                        </span>
                    </p>
                </div>
            )}

            <h2 className="text-3xl font-bold text-white text-center mb-6">
                🔄 번역 여정 (Translation Journey)
            </h2>

            <div className="grid gap-4">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className={`
              transform transition-all duration-500 animate-slideUp
              ${result.isOriginal ? 'bg-green-500/20 border-green-400' : ''}
              ${result.isFinal ? 'bg-red-500/20 border-red-400' : ''}
              ${!result.isOriginal && !result.isFinal ? 'bg-white/10 border-white/30' : ''}
              backdrop-blur-md rounded-xl p-5 border-2
            `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">{result.language.flag}</span>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">
                                    Step {result.step + 1}: {result.language.name}
                                </h3>
                                {result.isOriginal && (
                                    <span className="text-green-300 text-sm">✅ 원본 (Original)</span>
                                )}
                                {result.isFinal && (
                                    <span className="text-red-300 text-sm">🎯 최종 결과 (Final - How broken!)</span>
                                )}
                            </div>
                        </div>
                        <p className="text-white text-lg bg-black/20 rounded-lg p-4">
                            {result.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TranslationChain;
