import { SORT_CONFIG } from '@/lib/sortOptionsProducts';
import { SearchFormType } from '@/types/search';

interface SortSectionProps {
  onSortChange: (sort: NonNullable<SearchFormType['sort']>) => void;
  onPriceRangeChange: (range: NonNullable<SearchFormType['priceRange']>) => void;
  currentSort?: SearchFormType['sort'];
  currentPriceRange?: SearchFormType['priceRange'];
}

const SortSection = ({
  onSortChange,
  onPriceRangeChange,
  currentSort,
  currentPriceRange,
}: SortSectionProps) => {
  if (!onSortChange) return null;

  const getCurrentSortValue = (): string => {
    if (!currentSort) return '';
    return `${currentSort.field}-${currentSort.order}`;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (!selectedValue) {
      return;
    }

    // Encontrar la opción seleccionada en la configuración
    const selectedSort = SORT_CONFIG.flatMap((group) => group.options).find(
      (option) => option.value === selectedValue,
    );

    if (selectedSort) {
      onSortChange(selectedSort.sort);
    }
  };

  return (
    <div className="mb-6">
      <select
        title="Ordenar por..."
        value={getCurrentSortValue()}
        onChange={handleSortChange}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base 
                  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Ordenar por...</option>
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
  );
};

export default SortSection;
