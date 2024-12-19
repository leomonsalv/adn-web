import { SORT_CONFIG, SortOption } from '@/lib/sortOptionsProducts';
import React from 'react';

interface SortFilterOptionsProps {
  onSortChange: (sort: SortOption | undefined) => void;
  currentSort?: SortOption;
}

export function SortFilterOptions({ onSortChange, currentSort }: SortFilterOptionsProps) {
  const getCurrentSortValue = (): string => {
    if (!currentSort) return '';

    const [field, order] = Object.entries(currentSort)[0];
    return `${field}-${order}`;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (!selectedValue) {
      onSortChange(undefined);
      return;
    }

    const selectedSort = SORT_CONFIG.flatMap((group) => group.options).find(
      (option) => option.value === selectedValue,
    );

    onSortChange(selectedSort?.sort);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Ordenar por</label>
        <select
          title="Seleccionar..."
          value={getCurrentSortValue()}
          onChange={handleSortChange}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base 
                   focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Seleccionar...</option>
          {SORT_CONFIG.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
