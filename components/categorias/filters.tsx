import React from 'react';
import { DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { SearchFormType } from '@/types/search';
import { Facets } from '@/types/categories';
import SortSection from './sortFilterOptions';

// Props comunes para ambos componentes
interface BaseFilterProps {
  facets?: Facets;
  selectedFilters: Partial<Record<keyof Facets, string[]>>;
  onFilterChange: (filters: Partial<Record<keyof Facets, string[]>>) => void;
  onSortChange: (sort: NonNullable<SearchFormType['sort']>) => void;
  onPriceRangeChange: (range: NonNullable<SearchFormType['priceRange']>) => void;
  currentSort?: SearchFormType['sort'];
  currentPriceRange?: SearchFormType['priceRange'];
}

interface MobileFilterDialogProps extends BaseFilterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FiltersProps extends BaseFilterProps {}

const transformFacetsToFilters = (facets?: Facets) => {
  if (!facets) return [];

  return Object.entries(facets)
    .filter(([key]) => key.startsWith('x_'))
    .map(([key, facetData]) => ({
      id: key,
      name: key.split('_').slice(2).join(' ').toUpperCase(),
      options: facetData[0].data.map((item) => ({
        value: item.value,
        label: `${item.value} (${item.count})`,
        count: item.count,
      })),
    }));
};

interface FilterSection {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count: number;
  }[];
}

function FilterSectionComponent({
  section,
  isFirst,
  selectedValues = [],
  onOptionChange,
}: {
  section: FilterSection;
  isFirst: boolean;
  selectedValues?: string[];
  onOptionChange?: (sectionId: string, value: string, checked: boolean) => void;
}) {
  return (
    <div className={isFirst ? '' : 'pt-10'}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
        <div className="space-y-3 pt-6">
          {section.options.map((option, optionIdx) => (
            <div key={option.value} className="flex items-center">
              <input
                id={`${section.id}-${optionIdx}`}
                name={`${section.id}[]`}
                value={option.value}
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={(e) => onOptionChange?.(section.id, option.value, e.target.checked)}
                className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function Filters({
  facets,
  selectedFilters,
  onFilterChange,
  onSortChange,
  onPriceRangeChange,
  currentSort,
  currentPriceRange,
}: FiltersProps) {
  const filters = transformFacetsToFilters(facets);

  const handleOptionChange = (sectionId: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[sectionId as keyof Facets] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFilterChange({
      ...selectedFilters,
      [sectionId]: newValues,
    });
  };

  if (filters.length === 0) {
    return <div className="text-sm text-gray-500">No hay filtros disponibles</div>;
  }

  return (
    <div>
      <SortSection
        onSortChange={onSortChange}
        onPriceRangeChange={onPriceRangeChange}
        currentSort={currentSort}
        currentPriceRange={currentPriceRange}
      />
      <form className="space-y-10 divide-y divide-gray-200">
        {filters.map((section, sectionIdx) => (
          <FilterSectionComponent
            key={section.name}
            section={section}
            isFirst={sectionIdx === 0}
            selectedValues={selectedFilters[section.id as keyof Facets]}
            onOptionChange={handleOptionChange}
          />
        ))}
      </form>
    </div>
  );
}

export function MobileFilterDialog({
  isOpen,
  setIsOpen,
  facets,
  selectedFilters,
  onFilterChange,
  onSortChange,
  onPriceRangeChange,
  currentSort,
  currentPriceRange,
}: MobileFilterDialogProps) {
  const filters = transformFacetsToFilters(facets);

  const handleOptionChange = (sectionId: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[sectionId as keyof Facets] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFilterChange({
      ...selectedFilters,
      [sectionId]: newValues,
    });
  };

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-40 lg:hidden">
      <div className="fixed inset-0 bg-black/25" />
      <div className="fixed inset-0 z-40 flex">
        <DialogPanel className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Cerrar menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 px-4">
            <SortSection
              onSortChange={onSortChange}
              onPriceRangeChange={onPriceRangeChange}
              currentSort={currentSort}
              currentPriceRange={currentPriceRange}
            />
          </div>

          <form className="mt-4">
            {filters.map((section) => (
              <Disclosure
                key={section.name}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
                defaultOpen
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon className="size-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={selectedFilters[section.id as keyof Facets]?.includes(
                            option.value,
                          )}
                          onChange={(e) =>
                            handleOptionChange(section.id, option.value, e.target.checked)
                          }
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Filters;
