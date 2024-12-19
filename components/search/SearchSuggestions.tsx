import { useEffect, useRef } from 'react';

interface SearchSuggestionsProps {
  suggestions: { name: string; id: string }[];
  searchQuery: string;
  onSelect: (suggestion: { name: string; id: string }) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchSuggestions({
  suggestions,
  searchQuery,
  onSelect,
  isOpen,
  onClose,
}: SearchSuggestionsProps) {
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!suggestions.length || !isOpen) return null;

  return (
    <div
      ref={suggestionsRef}
      className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto z-50"
    >
      <ul className="py-2">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
            onClick={() => {
              onSelect(suggestion);
              onClose();
            }}
          >
            {highlightMatch(suggestion.name, searchQuery)}
          </li>
        ))}
      </ul>
    </div>
  );
}
