import { useState } from 'react';
import Header from './components/Header';
import TranslationInput from './components/TranslationInput';
import TranslationChain from './components/TranslationChain';
import ComparisonResult from './components/ComparisonResult';
import { runTranslationChain } from './services/translationService';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [translationData, setTranslationData] = useState(null);
  const [error, setError] = useState(null);

  const handleTranslate = async (text) => {
    setIsLoading(true);
    setError(null);
    setTranslationData(null);

    try {
      const data = await runTranslationChain(text);
      setTranslationData(data);
    } catch (err) {
      setError(err.message || '번역 중 오류가 발생했습니다.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kahoot-background via-kahoot-darkPurple to-kahoot-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <TranslationInput onTranslate={handleTranslate} isLoading={isLoading} />

        {error && (
          <div className="mt-6 bg-kahoot-orange/20 backdrop-blur-md rounded-2xl p-5 border-4 border-kahoot-orange shadow-xl">
            <p className="text-white text-lg font-bold">❌ {error}</p>
          </div>
        )}

        {translationData && (
          <>
            <TranslationChain
              results={translationData.results}
              usedMockData={translationData.usedMockData}
            />
            <ComparisonResult
              originalText={translationData.results[0]?.text}
              finalText={translationData.results[translationData.results.length - 1]?.text}
            />
          </>
        )}

        {!translationData && !isLoading && (
          <div className="mt-8 text-center text-kahoot-pink">
            <p className="text-xl font-bold">👆 위에 문장을 입력하고 번역을 망쳐보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
