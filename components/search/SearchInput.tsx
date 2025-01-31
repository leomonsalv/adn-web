import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes, useCallback, useState, useEffect } from 'react';
import useSearchProduct from '@/hooks/use-search-products';
import SearchSuggestions from './SearchSuggestions';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  selectedCategory: string;
  setSelectedCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: { name: string; id: string }[];
  onSearch: (query: string) => void;
  value?: string;
}

export default function SearchInput({
  selectedCategory,
  setSelectedCategory,
  categories,
  onSearch,
  value,
  ...props
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>(value ?? '');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { searchSuggestions } = useSearchProduct();
  const { data: suggestionsData } = searchSuggestions(debouncedValue);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSelectSuggestion = (suggestion: { name: string; id: string }) => {
    setInputValue(suggestion.name);
    onSearch(suggestion.name);
  };

  return (
    <div className="relative">
      <div className="flex rounded-md bg-white shadow-xs ring-1 ring-inset ring-gray-300">
        <div className="hidden sm:flex items-center bg-[#E2E2E2] rounded-l-md">
          <select
            className="h-10 rounded-l-md border-0 bg-transparent text-gray-900 focus:ring-0 sm:text-sm val:bg-red-500 max-w-[8rem] truncate"
            value={selectedCategory}
            onChange={handleSelectCategory}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex flex-1 items-center">
          <input
            {...props}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(inputValue.length > 2)}
            type="text"
            className="block w-full rounded-md sm:rounded-l-none border-0 py-1.5 pl-10 pr-10 text-sm text-gray-900 ring-0 placeholder:text-gray-400 focus:ring-0"
            placeholder="Busca por producto (Ej. Jabón para niños)"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      {inputValue.length > 2 && suggestionsData?.results?.documents && (
        <SearchSuggestions
          suggestions={suggestionsData.results.documents.map((suggestion, index) => ({
            name: suggestion.suggestion,
            id: `${suggestion.suggestion}-${index}`,
          }))}
          searchQuery={inputValue}
          onSelect={handleSelectSuggestion}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
