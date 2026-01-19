import React, { useState } from 'react';
import { SearchIcon, CloseIcon, FilterIcon } from './icons';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

export interface FilterOptions {
  category?: string[];
  author?: string;
  dateRange?: string;
  sortBy?: 'recent' | 'popular' | 'trending';
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilterChange,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'ai-coding', label: 'AI Coding', icon: '🤖' },
    { id: 'automation', label: 'Automation', icon: '⚡' },
    { id: 'productivity', label: 'Productivity', icon: '🚀' },
    { id: 'learning', label: 'Learning', icon: '📚' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'best-practices', label: 'Best Practices', icon: '✨' },
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
    onFilterChange({
      category: selectedCategories,
      sortBy
    });
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearAll = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('recent');
    onSearch('');
    onFilterChange({ sortBy: 'recent' });
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-6 animate-fadeIn">
      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search posts, experiments, or playbooks..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
            autoFocus
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-lg border transition-colors ${
            showFilters || selectedCategories.length > 0
              ? 'bg-neutral-900 border-neutral-900 text-white'
              : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <FilterIcon size={20} />
        </button>
        <button
          onClick={onClose}
          className="p-2.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-neutral-100 animate-slideDown">
          {/* Categories */}
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-wider mb-2 block">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategories.includes(category.id)
                      ? 'bg-neutral-900 text-white border border-neutral-900'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-wider mb-2 block">
              Sort By
            </label>
            <div className="flex gap-2">
              {[
                { id: 'recent' as const, label: 'Most Recent', icon: '🕐' },
                { id: 'popular' as const, label: 'Most Popular', icon: '🔥' },
                { id: 'trending' as const, label: 'Trending', icon: '📈' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === option.id
                      ? 'bg-neutral-900 text-white border border-neutral-900'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  <span className="mr-1.5">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSearch}
              className="flex-1 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all"
            >
              Apply Filters
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(searchQuery || selectedCategories.length > 0) && !showFilters && (
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Filtering:</span>
          {searchQuery && (
            <span className="px-2 py-1 bg-neutral-100 rounded text-neutral-700">
              "{searchQuery}"
            </span>
          )}
          {selectedCategories.length > 0 && (
            <span className="px-2 py-1 bg-neutral-100 rounded text-neutral-700">
              {selectedCategories.length} categories
            </span>
          )}
          <button
            onClick={clearAll}
            className="ml-auto text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
