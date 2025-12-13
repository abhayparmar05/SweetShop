import React, { useState, useCallback } from 'react';
import Header from '../components/layout/Header';
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

    // Count active filters
    const activeFiltersCount = [searchQuery, category, minPrice, maxPrice].filter(Boolean).length;

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-saffron-50 via-cream-50 to-rose-50 border-b border-saffron-100">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOTczMTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHpNMTggMTM0aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04ek0wIDEzNGg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                    <div className="text-center mb-6">
                        <h1 className="heading-1 mb-3">
                            <span className="gradient-text">Discover Sweet Delights</span>
                        </h1>
                        <p className="text-gray-600 text-body max-w-2xl mx-auto">
                            Explore our curated collection of premium sweets from around the world
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Bar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        {activeFiltersCount > 0 && (
                            <div className="flex items-center gap-2 bg-saffron-50 rounded-xl px-4 py-3 border border-saffron-200 animate-pulse">
                                <span className="text-2xl">🔍</span>
                                <div>
                                    <p className="text-tiny text-saffron-600 font-semibold">Active Filters</p>
                                    <p className="text-small font-bold text-saffron-700">{activeFiltersCount} applied</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn-secondary flex items-center gap-2 shadow-sm"
                        >
                            <span className="text-xl">🎛️</span>
                            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                            {activeFiltersCount > 0 && (
                                <span className="ml-1 bg-saffron-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className={`lg:col-span-1 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
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
                        {/* Results Header */}
                        {!isLoading && sweets.length > 0 && (
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="heading-4 font-semibold text-gray-700">
                                    {isFiltering ? (
                                        <span>
                                            Found <span className="text-saffron-600">{sweets.length}</span> result{sweets.length !== 1 ? 's' : ''}
                                        </span>
                                    ) : (
                                        <span>All Sweets</span>
                                    )}
                                </h2>
                                {isFiltering && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-small text-saffron-600 hover:text-saffron-700 font-medium flex items-center gap-1 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Sweet Grid */}
                        <SweetGrid sweets={sweets} isLoading={isLoading} />

                        {/* Pagination - only show when not filtering */}
                        {!isFiltering && !isLoading && sweets.length > 0 && (
                            <div className="mt-8">
                                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
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
