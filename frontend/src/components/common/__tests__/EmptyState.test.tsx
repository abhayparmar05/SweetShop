import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../EmptyState';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('EmptyState', () => {
    it('should render title and message', () => {
        render(<EmptyState title="No Data" message="There is no data to display" />);

        expect(screen.getByText('No Data')).toBeInTheDocument();
        expect(screen.getByText('There is no data to display')).toBeInTheDocument();
    });

    it('should render icon when provided', () => {
        render(<EmptyState title="No Data" message="Empty" icon="📦" />);

        expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('should not render action button when actionLabel is not provided', () => {
        render(<EmptyState title="No Data" message="Empty" />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render and handle action button click', async () => {
        const user = userEvent.setup();
        const mockAction = vi.fn();

        render(
            <EmptyState
                title="No Data"
                message="Empty"
                actionLabel="Add Item"
                onAction={mockAction}
            />
        );

        const button = screen.getByText('Add Item');
        expect(button).toBeInTheDocument();

        await user.click(button);
        expect(mockAction).toHaveBeenCalledOnce();
    });

    it('should not render button if actionLabel provided but no onAction', () => {
        render(
            <EmptyState
                title="No Data"
                message="Empty"
                actionLabel="Add Item"
            />
        );

        expect(screen.queryByText('Add Item')).not.toBeInTheDocument();
    });
});
