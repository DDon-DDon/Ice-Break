/**
 * @file main.jsx
 * @description 애플리케이션 엔트리 포인트 (Entry Point)
 * 
 * 이 파일은 React 앱이 시작되는 최초 진입점입니다.
 * HTML의 'root' 요소에 React 컴포넌트 트리를 마운트합니다.
 * 
 * @dependency App.jsx - 메인 애플리케이션 컴포넌트
 * @dependency index.css - 전역 스타일 (Tailwind CSS)
 */

// React 18+ StrictMode: 개발 모드에서 잠재적 문제를 감지하기 위해
// 컴포넌트를 두 번 렌더링하여 부작용(side effects)을 체크함
import { StrictMode } from 'react'

// createRoot: React 18의 새로운 루트 API
// 기존 ReactDOM.render() 대신 사용하며, Concurrent Mode 지원
import { createRoot } from 'react-dom/client'

// 전역 CSS 스타일 (Tailwind CSS 설정 포함)
import './index.css'

// 메인 애플리케이션 컴포넌트
import App from './App.jsx'

/**
 * 애플리케이션 초기화
 * 
 * 1. document.getElementById('root'): index.html의 <div id="root">를 찾음
 * 2. createRoot(): 해당 DOM 요소에 React 루트 생성
 * 3. render(): 컴포넌트 트리를 DOM에 렌더링
 * 
 * StrictMode는 프로덕션 빌드에서는 자동으로 비활성화됨
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

