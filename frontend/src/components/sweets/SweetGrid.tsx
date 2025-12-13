import type { FC } from 'react';
import type { Sweet } from '../../types/sweet.types';
import SweetCard from './SweetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

interface SweetGridProps {
    sweets: Sweet[];
    isLoading?: boolean;
}

const SweetGrid: FC<SweetGridProps> = ({ sweets, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (sweets.length === 0) {
        return (
            <EmptyState
                title="No Sweets Found"
                message="We couldn't find any sweets matching your criteria. Try adjusting your filters or check back later!"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
                <SweetCard key={sweet._id} sweet={sweet} />
            ))}
        </div>
    );
};

export default SweetGrid;
