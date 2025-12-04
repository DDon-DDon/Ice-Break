import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TranslationInput from './TranslationInput';

describe('TranslationInput', () => {
    it('renders correctly', () => {
        render(<TranslationInput onTranslate={() => { }} isLoading={false} />);

        expect(screen.getByPlaceholderText(/예: 안녕하세요, 저는 개발자입니다./i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /번역 망치기 시작!/i })).toBeInTheDocument();
    });

    it('calls onTranslate with input text when submitted', () => {
        const handleTranslate = vi.fn();
        render(<TranslationInput onTranslate={handleTranslate} isLoading={false} />);

        const input = screen.getByPlaceholderText(/예: 안녕하세요, 저는 개발자입니다./i);
        const button = screen.getByRole('button', { name: /번역 망치기 시작!/i });

        fireEvent.change(input, { target: { value: '테스트 문장' } });
        fireEvent.click(button);

        expect(handleTranslate).toHaveBeenCalledWith('테스트 문장');
    });

    it('disables button when loading', () => {
        render(<TranslationInput onTranslate={() => { }} isLoading={true} />);

        const button = screen.getByRole('button', { name: /번역 망치는 중.../i });
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent(/번역 망치는 중.../i);
    });
});
