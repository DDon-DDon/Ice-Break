import { CheckCircle2, Flame, ArrowRightLeft, Sparkles } from 'lucide-react';

function ComparisonResult({ originalText, finalText }) {
    if (!originalText || !finalText) return null;

    const similarity = calculateSimilarity(originalText, finalText);
    const brokenness = 100 - similarity;

    return (
        <div className="mt-10 bg-kahoot-card backdrop-blur-xl rounded-3xl p-8 md:p-10 border-4 border-kahoot-purple/50 shadow-2xl">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <ArrowRightLeft className="w-10 h-10 text-kahoot-pink" strokeWidth={3} />
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        얼마나 망가졌을까?
                    </h2>
                </div>
                <p className="text-kahoot-cyan text-lg font-bold">How Broken?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-emerald-500/20 rounded-2xl p-6 border-4 border-emerald-400 shadow-xl">
                    <h3 className="text-emerald-400 font-black mb-4 flex items-center gap-2 text-xl">
                        <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
                        원본 (Original)
                    </h3>
                    <div className="bg-kahoot-darkPurple/50 rounded-xl p-5 border-2 border-white/10">
                        <p className="text-white text-lg leading-relaxed font-semibold">{originalText}</p>
                    </div>
                </div>

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

            <div className="text-center">
                <div className="inline-block bg-gradient-to-br from-kahoot-orange/30 to-kahoot-pink/30 backdrop-blur-xl rounded-3xl px-12 py-10 border-4 border-kahoot-pink shadow-2xl">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Flame className="w-8 h-8 text-kahoot-orange animate-pulse" strokeWidth={3} />
                        <p className="text-white text-lg font-black tracking-wide uppercase">망가짐 지수</p>
                        <Flame className="w-8 h-8 text-kahoot-orange animate-pulse" strokeWidth={3} />
                    </div>
                    <p className="text-9xl font-black bg-gradient-to-r from-kahoot-orange via-kahoot-pink to-kahoot-cyan bg-clip-text text-transparent drop-shadow-2xl mb-4 animate-pulse">
                        {brokenness.toFixed(0)}%
                    </p>
                    <p className="text-white text-2xl font-black">
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
    if (score >= 90) return '🔥 완벽하게 파괴됨!';
    if (score >= 70) return '💥 엄청 망가졌어요!';
    if (score >= 50) return '😵 많이 망가졌네요!';
    if (score >= 30) return '😅 조금 망가졌어요';
    return '🤔 어? 너무 비슷한데?';
}

export default ComparisonResult;
