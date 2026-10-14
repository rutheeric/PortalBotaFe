import React from 'react';
import { Search, X } from 'lucide-react';
import { CategoryType, ThemeConfig } from '../types';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: ThemeConfig;
  counts: Record<CategoryType, number>;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'formularios', label: 'Formulários' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'midia', label: 'Fotos & Mídia' },
  { id: 'social', label: 'Social' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  theme,
  counts,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-6 px-2 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 ${theme.textPrimary}`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar links, documentos, formulários..."
          className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border shadow-2xs transition-all focus:outline-hidden focus:ring-2 ${theme.cardBg} ${theme.cardBorder} ${theme.buttonRing} ${theme.textPrimary} placeholder:opacity-50`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full opacity-60 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => {
          const count = counts[cat.id] || 0;
          if (cat.id !== 'todos' && count === 0) return null;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? `${theme.accentBg} ${theme.accentText} shadow-xs`
                  : `opacity-70 hover:opacity-100 bg-black/5 dark:bg-white/10 ${theme.textPrimary}`
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
