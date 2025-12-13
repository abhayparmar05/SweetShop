import React from 'react';
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

const FilterPanel: React.FC<FilterPanelProps> = ({
    category,
    minPrice,
    maxPrice,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    onClearFilters,
}) => {
    const categories: Array<{ value: SweetCategory | ''; label: string; icon?: string }> = [
        { value: '', label: 'All Categories' },
        { value: 'chocolate', label: '🍫 Chocolate' },
        { value: 'swiss-western', label: '🧁 Swiss / Western' },
        { value: 'festival', label: '🎉 Festival' },
        { value: 'premium-dry-fruit', label: '🥜 Premium / Dry Fruit' },
        { value: 'regional-traditional', label: '🪔 Regional / Traditional' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-saffron-100 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                </div>
                <button
                    onClick={onClearFilters}
                    className="text-xs font-bold text-saffron-600 hover:text-saffron-700 bg-saffron-50 px-3 py-1.5 rounded-full transition-colors hover:bg-saffron-100"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2.5">Category</label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value as SweetCategory | '')}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-400 focus:border-transparent outline-none appearance-none transition-shadow"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2.5">Price Range (₹)</label>
                    <div className="flex gap-3 items-center">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₹</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => onMinPriceChange(e.target.value)}
                                className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-400 focus:border-transparent outline-none transition-shadow text-sm"
                                min="0"
                                step="100"
                            />
                        </div>
                        <span className="text-gray-400 font-medium">-</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₹</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => onMaxPriceChange(e.target.value)}
                                className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-400 focus:border-transparent outline-none transition-shadow text-sm"
                                min="0"
                                step="100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
