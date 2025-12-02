function ComparisonResult({ originalText, finalText }) {
    if (!originalText || !finalText) return null;

    const similarity = calculateSimilarity(originalText, finalText);
    const brokenness = 100 - similarity;

    return (
        <div className="mt-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-purple-400 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
                📊 얼마나 망가졌을까? (How Broken?)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-500/20 rounded-xl p-4 border-2 border-green-400">
                    <h3 className="text-green-300 font-bold mb-2 flex items-center gap-2">
                        <span>✅</span> 원본 (Original)
                    </h3>
                    <p className="text-white text-lg">{originalText}</p>
                </div>

                <div className="bg-red-500/20 rounded-xl p-4 border-2 border-red-400">
                    <h3 className="text-red-300 font-bold mb-2 flex items-center gap-2">
                        <span>💥</span> 최종 결과 (Final)
                    </h3>
                    <p className="text-white text-lg">{finalText}</p>
                </div>
            </div>

            <div className="text-center">
                <div className="inline-block bg-yellow-500/20 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-yellow-400">
                    <p className="text-yellow-200 text-sm mb-2">망가짐 지수 (Brokenness Score)</p>
                    <p className="text-6xl font-bold text-yellow-300 animate-pulse">
                        {brokenness.toFixed(0)}%
                    </p>
                    <p className="text-yellow-200 mt-2">
                        {getBrokennessMesage(brokenness)}
                    </p>
                </div>
            </div>
        </div>
    );
}

// Simple similarity calculator (character overlap)
function calculateSimilarity(str1, str2) {
    const set1 = new Set(str1.replace(/\s/g, ''));
    const set2 = new Set(str2.replace(/\s/g, ''));

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return (intersection.size / union.size) * 100;
}

function getBrokennessMesage(score) {
    if (score >= 90) return '🔥 완벽하게 파괴됨! (Perfectly Destroyed!)';
    if (score >= 70) return '💥 엄청 망가졌어요! (Super Broken!)';
    if (score >= 50) return '😵 많이 망가졌네요! (Very Broken!)';
    if (score >= 30) return '😅 조금 망가졌어요 (Somewhat Broken)';
    return '🤔 어? 너무 비슷한데? (Hmm, too similar?)';
}

export default ComparisonResult;
