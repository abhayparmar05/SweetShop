import React, { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-saffron-100 to-royal-100 rounded-xl blur transition duration-500 opacity-75 group-hover:opacity-100"></div>
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-saffron-100 transition-all duration-300 focus-within:ring-2 focus-within:ring-saffron-400 focus-within:border-transparent">
                <div className="pl-4 text-saffron-500">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for your favorite sweets..."
                    className="w-full py-4 px-4 text-gray-700 bg-transparent rounded-xl focus:outline-none placeholder-gray-400"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="pr-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
