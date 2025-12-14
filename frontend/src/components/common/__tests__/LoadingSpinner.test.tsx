import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
    it('should render spinner with default medium size', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.w-12');
        expect(spinner).toBeTruthy();
    });

    it('should render small spinner when size is sm', () => {
        const { container } = render(<LoadingSpinner size="sm" />);
        const spinner = container.querySelector('.w-6');
        expect(spinner).toBeTruthy();
    });

    it('should render large spinner when size is lg', () => {
        const { container } = render(<LoadingSpinner size="lg" />);
        const spinner = container.querySelector('.w-16');
        expect(spinner).toBeTruthy();
    });

    it('should have spin animation class', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeTruthy();
    });
});
