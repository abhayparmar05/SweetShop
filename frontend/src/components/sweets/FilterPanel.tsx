import type { FC } from 'react';
import { FaFilter } from 'react-icons/fa';
import type { SweetCategory } from '../../types/sweet.types';

interface FilterPanelProps {
    category: SweetCategory | '';
    minPrice: string;
    maxPrice: string;
    onCategoryChange: (category: SweetCategory | '') => void;
    onMinPriceChange: (price: string) => void;
    onMaxPriceChange: (price: string) => void;
    onClearFilters: () => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
    category,
    minPrice,
    maxPrice,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    onClearFilters,
}) => {
    const categories: Array<{ value: SweetCategory | ''; label: string }> = [
        { value: '', label: 'All Categories' },
        { value: 'chocolate', label: '🍫 Chocolate' },
        { value: 'swiss-western', label: '🧁 Swiss / Western' },
        { value: 'festival', label: '🎉 Festival' },
        { value: 'premium-dry-fruit', label: '🥜 Premium / Dry Fruit' },
        { value: 'regional-traditional', label: '🪔 Regional / Traditional' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <FaFilter className="text-saffron-600" />
                    <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                </div>
                <button
                    onClick={onClearFilters}
                    className="text-sm font-semibold text-saffron-600 hover:text-saffron-700 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-5">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value as SweetCategory | '')}
                            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-400 focus:border-saffron-400 outline-none appearance-none transition-all cursor-pointer text-gray-700"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                    <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => onMinPriceChange(e.target.value)}
                                className="w-full pl-7 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-400 focus:border-saffron-400 outline-none transition-all text-sm"
                                min="0"
                                step="50"
                            />
                        </div>
                        <span className="text-gray-400">—</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => onMaxPriceChange(e.target.value)}
                                className="w-full pl-7 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-400 focus:border-saffron-400 outline-none transition-all text-sm"
                                min="0"
                                step="50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;