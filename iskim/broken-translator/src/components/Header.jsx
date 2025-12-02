function Header() {
    return (
        <header className="text-center mb-8 animate-fadeIn">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 animate-pulse">
                <span className="inline-block animate-bounce">🌐</span>
                {' '}Broken Translator{' '}
                <span className="inline-block animate-bounce animation-delay-150">🌐</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
                번역기 전화 놀이
            </p>
            <p className="text-lg text-yellow-300 font-semibold">
                Where meanings go to die! 😂
            </p>
            <div className="mt-4 inline-block bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-2 border-2 border-red-400">
                <p className="text-red-200 font-bold">
                    ⚠️ 쓸모없음 지수: ⭐⭐⭐⭐⭐
                </p>
            </div>
        </header>
    );
}

export default Header;
