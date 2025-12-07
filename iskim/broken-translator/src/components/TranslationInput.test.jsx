/**
 * @file TranslationInput.test.jsx
 * @description TranslationInput 컴포넌트 테스트
 * 
 * React Testing Library + Vitest를 사용한 컴포넌트 테스트입니다.
 * UI 렌더링, 사용자 인터랙션, 콜백 호출을 검증합니다.
 * 
 * @see https://testing-library.com/docs/react-testing-library/intro
 */

// ===== Testing Library 유틸리티 =====
// - render: 컴포넌트를 가상 DOM에 렌더링
// - screen: 렌더링된 DOM 요소 쿼리
// - fireEvent: 사용자 이벤트 시뮬레이션 (클릭, 입력 등)
import { render, screen, fireEvent } from '@testing-library/react';

// ===== Vitest 테스트 유틸리티 =====
// - describe: 테스트 그룹 정의
// - it: 개별 테스트 케이스 정의
// - expect: 단언(assertion) 함수
// - vi: 모킹/스파이 유틸리티
import { describe, it, expect, vi } from 'vitest';

// 테스트 대상 컴포넌트
import TranslationInput from './TranslationInput';

/**
 * TranslationInput 컴포넌트 테스트 스위트
 * 
 * 테스트 케이스:
 * 1. 컴포넌트가 올바르게 렌더링되는지
 * 2. 폼 제출 시 콜백이 호출되는지
 * 3. 로딩 상태에서 버튼이 비활성화되는지
 */
describe('TranslationInput', () => {
    
    /**
     * 테스트 1: 기본 렌더링 확인
     * 
     * 컴포넌트가 마운트될 때 필수 UI 요소가 존재하는지 검증
     * - 플레이스홀더 텍스트가 있는 textarea
     * - "번역 망치기 시작!" 버튼
     */
    it('renders correctly', () => {
        // 컴포넌트 렌더링 (빈 콜백과 isLoading=false 전달)
        render(<TranslationInput onTranslate={() => { }} isLoading={false} />);

        // DOM 요소 검증
        // getByPlaceholderText: placeholder 속성으로 요소 찾기
        expect(screen.getByPlaceholderText(/예: 안녕하세요, 저는 개발자입니다./i)).toBeInTheDocument();
        
        // getByRole: 접근성 역할(role)로 요소 찾기
        expect(screen.getByRole('button', { name: /번역 망치기 시작!/i })).toBeInTheDocument();
    });

    /**
     * 테스트 2: 폼 제출 동작 확인
     * 
     * 사용자가 텍스트를 입력하고 버튼을 클릭했을 때
     * onTranslate 콜백이 올바른 인자로 호출되는지 검증
     */
    it('calls onTranslate with input text when submitted', () => {
        // vi.fn(): 스파이 함수 생성 (호출 여부, 전달된 인자 추적)
        const handleTranslate = vi.fn();
        
        // 스파이 함수를 onTranslate prop으로 전달
        render(<TranslationInput onTranslate={handleTranslate} isLoading={false} />);

        // DOM 요소 가져오기
        const input = screen.getByPlaceholderText(/예: 안녕하세요, 저는 개발자입니다./i);
        const button = screen.getByRole('button', { name: /번역 망치기 시작!/i });

        // 사용자 인터랙션 시뮬레이션
        // 1. 텍스트 입력 (change 이벤트)
        fireEvent.change(input, { target: { value: '테스트 문장' } });
        
        // 2. 버튼 클릭 (click 이벤트)
        fireEvent.click(button);

        // 단언: onTranslate가 '테스트 문장'으로 호출되었어야 함
        expect(handleTranslate).toHaveBeenCalledWith('테스트 문장');
    });

    /**
     * 테스트 3: 로딩 상태 UI 확인
     * 
     * isLoading=true일 때:
     * - 버튼이 비활성화(disabled)되어야 함
     * - 버튼 텍스트가 "번역 망치는 중..."으로 변경되어야 함
     */
    it('disables button when loading', () => {
        // isLoading=true로 렌더링
        render(<TranslationInput onTranslate={() => { }} isLoading={true} />);

        // 로딩 상태의 버튼 찾기 (텍스트가 변경됨)
        const button = screen.getByRole('button', { name: /번역 망치는 중.../i });
        
        // 단언: 버튼이 비활성화 상태여야 함
        expect(button).toBeDisabled();
        
        // 단언: 버튼 텍스트가 올바른지 확인
        expect(button).toHaveTextContent(/번역 망치는 중.../i);
    });
});

