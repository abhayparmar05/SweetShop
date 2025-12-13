import React, { useState, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/sweets/SearchBar';
import FilterPanel from '../components/sweets/FilterPanel';
import SweetGrid from '../components/sweets/SweetGrid';
import Pagination from '../components/common/Pagination';
import Footer from '../components/layout/Footer';
import { useSweets, useSearchSweets } from '../hooks/useSweets';
import type { SweetCategory } from '../types/sweet.types';

const DashboardPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState<SweetCategory | ''>('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Determine if we're searching/filtering
    const isFiltering = searchQuery || category || minPrice || maxPrice;

    // Build search params
    const searchParams = {
        ...(searchQuery && { name: searchQuery }),
        ...(category && { category }),
        ...(minPrice && { minPrice: parseFloat(minPrice) }),
        ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
    };

    // Use appropriate query based on whether we're filtering
    const { data: paginatedData, isLoading: isPaginatedLoading } = useSweets(page, 12);
    const { data: searchData, isLoading: isSearchLoading } = useSearchSweets(searchParams);

    const sweets = isFiltering ? searchData?.data || [] : paginatedData?.data || [];
    const isLoading = isFiltering ? isSearchLoading : isPaginatedLoading;
    const totalPages = paginatedData?.pagination?.pages || 1;

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setPage(1);
    }, []);

    const handleClearFilters = () => {
        setSearchQuery('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8 select-none">
                    <h1 className="text-5xl font-bold gradient-text mb-2">Sweet Shop</h1>
                    <p className="text-gray-600 text-lg">Discover delicious treats for every taste!</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full btn-secondary flex justify-center items-center gap-2"
                    >
                        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                        <span>🔍</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar - Hidden on mobile unless toggled */}
                    <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <FilterPanel
                            category={category}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onCategoryChange={setCategory}
                            onMinPriceChange={setMinPrice}
                            onMaxPriceChange={setMaxPrice}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Sweets Grid */}
                    <div className="lg:col-span-3">
                        <SweetGrid sweets={sweets} isLoading={isLoading} />

                        {/* Pagination - only show when not filtering */}
                        {!isFiltering && !isLoading && sweets.length > 0 && (
                            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        )}

                        {/* Results count for search/filter */}
                        {isFiltering && !isLoading && (
                            <div className="mt-6 text-center text-gray-600">
                                Found {sweets.length} sweet{sweets.length !== 1 ? 's' : ''}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
