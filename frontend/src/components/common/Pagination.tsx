import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrevious}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${canGoPrevious
                    ? 'bg-saffron-500 text-white hover:bg-saffron-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                Previous
            </button>

            <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${canGoNext
                    ? 'bg-saffron-500 text-white hover:bg-saffron-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
