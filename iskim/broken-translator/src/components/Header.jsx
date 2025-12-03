import { Globe, Sparkles, AlertTriangle } from 'lucide-react';

function Header() {
    return (
        <header className="text-center mb-10 animate-fadeIn">
            <div className="flex items-center justify-center gap-4 mb-4">
                <Globe className="w-16 h-16 text-kahoot-pink animate-spin-slow" strokeWidth={2} />
                <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-kahoot-pink via-kahoot-purple to-kahoot-cyan bg-clip-text text-transparent drop-shadow-2xl">
                    Broken
                    <br className="md:hidden" />
                    Translator
                </h1>
                <Globe className="w-16 h-16 text-kahoot-cyan animate-spin-slow" strokeWidth={2} />
            </div>

            <p className="text-2xl md:text-3xl text-white mb-3 font-bold">
                번역기 전화 놀이
            </p>

            <p className="text-lg text-kahoot-pink font-bold flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5" />
                Where meanings go to die!
                <Sparkles className="w-5 h-5" />
            </p>

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
