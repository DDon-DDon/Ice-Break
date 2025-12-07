/**
 * @file App.jsx
 * @description 메인 애플리케이션 컴포넌트 (루트 컴포넌트)
 * 
 * 이 파일은 전체 앱의 허브 역할을 합니다.
 * - 전역 상태 관리 (로딩, 번역 데이터, 에러)
 * - 자식 컴포넌트 조합 (Header, TranslationInput, TranslationChain, ComparisonResult)
 * - 번역 서비스 호출 및 결과 처리
 * 
 * @dependency Header - 페이지 헤더/타이틀
 * @dependency TranslationInput - 사용자 입력 폼
 * @dependency TranslationChain - 번역 단계 시각화
 * @dependency ComparisonResult - 원본/결과 비교
 * @dependency translationService - 번역 API 서비스
 */

import { useState } from 'react';

// ===== 컴포넌트 Import =====
// 각 컴포넌트는 독립적이며, App에서만 import됨 (Leaf 노드)
import Header from './components/Header';
import TranslationInput from './components/TranslationInput';
import TranslationChain from './components/TranslationChain';
import ComparisonResult from './components/ComparisonResult';

// ===== 서비스 Import =====
// 비즈니스 로직은 services 폴더에서 분리 관리
import { runTranslationChain } from './services/translationService';

/**
 * App 컴포넌트 - 애플리케이션의 최상위 컴포넌트
 * 
 * @returns {JSX.Element} 전체 앱 UI
 */
function App() {
  // ===== 상태 관리 (State Management) =====
  
  // isLoading: 번역 API 호출 중인지 여부 (로딩 스피너 표시용)
  const [isLoading, setIsLoading] = useState(false);
  
  // translationData: 번역 결과 데이터 (results 배열 + usedMockData 플래그)
  const [translationData, setTranslationData] = useState(null);
  
  // error: 에러 메시지 (API 실패 시 사용자에게 표시)
  const [error, setError] = useState(null);

  /**
   * handleTranslate - 번역 실행 핸들러
   * 
   * TranslationInput 컴포넌트에서 호출되며,
   * 번역 체인(한국어→핀란드어→아랍어→일본어→한국어)을 실행합니다.
   * 
   * @param {string} text - 사용자가 입력한 원본 텍스트
   */
  const handleTranslate = async (text) => {
    // 1. 로딩 상태 시작, 이전 데이터 초기화
    setIsLoading(true);
    setError(null);
    setTranslationData(null);

    try {
      // 2. 번역 서비스 호출 (비동기)
      // data 구조: { results: [...], usedMockData: boolean }
      const data = await runTranslationChain(text);
      
      // 3. 성공 시 결과 저장
      setTranslationData(data);
    } catch (err) {
      // 4. 실패 시 에러 메시지 저장
      setError(err.message || '번역 중 오류가 발생했습니다.');
      console.error('Translation error:', err);
    } finally {
      // 5. 성공/실패 무관하게 로딩 종료
      setIsLoading(false);
    }
  };

  // ===== UI 렌더링 =====
  return (
    // 전체 페이지 컨테이너: 그라데이션 배경
    <div className="min-h-screen bg-gradient-to-br from-kahoot-background via-kahoot-darkPurple to-kahoot-background p-4 md:p-8">
      {/* 중앙 정렬 컨테이너 (최대 너비 제한) */}
      <div className="max-w-3xl mx-auto">
        
        {/* 1. 헤더 영역: 타이틀, 로고 */}
        <Header />

        {/* 2. 입력 폼: 텍스트 입력 + 번역 버튼 */}
        <TranslationInput onTranslate={handleTranslate} isLoading={isLoading} />

        {/* 3. 에러 표시: 번역 실패 시 */}
        {error && (
          <div className="mt-6 bg-kahoot-orange/20 backdrop-blur-md rounded-2xl p-5 border-4 border-kahoot-orange shadow-xl">
            <p className="text-white text-lg font-bold">❌ {error}</p>
          </div>
        )}

        {/* 4. 번역 결과: 성공 시 (조건부 렌더링) */}
        {translationData && (
          <>
            {/* 4-1. 번역 체인 시각화: 각 단계별 결과 */}
            <TranslationChain
              results={translationData.results}
              usedMockData={translationData.usedMockData}
            />
            
            {/* 4-2. 비교 결과: 원본 vs 최종 결과 + 망가짐 지수 */}
            <ComparisonResult
              originalText={translationData.results[0]?.text}
              finalText={translationData.results[translationData.results.length - 1]?.text}
            />
          </>
        )}

        {/* 5. 초기 상태: 결과 없고, 로딩도 아닐 때 안내 메시지 */}
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

