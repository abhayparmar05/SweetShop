import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

describe('Pagination', () => {
    const mockOnPageChange = vi.fn();

    afterEach(() => {
        mockOnPageChange.mockClear();
    });

    it('should render current page and total pages', () => {
        render(
            <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
        );
        expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    });

    it('should disable Previous button on first page', () => {
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
        );
        const prevButton = screen.getByText('Previous');
        expect(prevButton).toBeDisabled();
    });

    it('should disable Next button on last page', () => {
        render(
            <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
        );
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
    });

    it('should call onPageChange with decremented page when Previous is clicked', async () => {
        const user = userEvent.setup();
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
        );

        const prevButton = screen.getByText('Previous');
        await user.click(prevButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('should call onPageChange with incremented page when Next is clicked', async () => {
        const user = userEvent.setup();
        render(
            <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
        );

        const nextButton = screen.getByText('Next');
        await user.click(nextButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('should enable both buttons when in the middle of pages', () => {
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
        );

        const prevButton = screen.getByText('Previous');
        const nextButton = screen.getByText('Next');

        expect(prevButton).not.toBeDisabled();
        expect(nextButton).not.toBeDisabled();
    });
});
