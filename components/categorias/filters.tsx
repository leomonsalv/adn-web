import React from 'react';
import { DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';
import { SORT_CONFIG, SortOption } from '@/lib/sortOptionsProducts';

interface FacetValue {
  value: string;
  count: number;
}

interface Facet {
  type: string;
  data: FacetValue[];
}

interface Facets {
  [key: string]: Facet[];
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FiltersProps {
  facets?: Facets;
}

function SortSection({
  onSortChange,
  currentSort,
}: {
  onSortChange?: (sort: SortOption | undefined) => void;
  currentSort?: SortOption;
}) {
  const getCurrentSortValue = (): string => {
    if (!currentSort) return '';
    const [field, order] = Object.entries(currentSort)[0];
    return `${field}-${order}`;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onSortChange) return;

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
    <div className="pb-6">
      <select
        title="Ordenar por..."
        value={getCurrentSortValue()}
        onChange={handleSortChange}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
}

//BORRA LA X_ Y LOS SEPARA PARA QUE SEAN PARTE DEL FILTRO LOS NOMBRES
const transformFacetsToFilters = (facets?: Facets): FilterSection[] => {
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

export function Filters({ facets }: FiltersProps): JSX.Element {
  const filters = transformFacetsToFilters(facets);

  if (filters.length === 0) {
    return <div className="text-sm text-gray-500">No hay filtros disponibles</div>;
  }

  return (
    <form className="space-y-10 divide-y divide-gray-200">
      {filters.map((section, sectionIdx) => (
        <FilterSection key={section.name} section={section} isFirst={sectionIdx === 0} />
      ))}
    </form>
  );
}

function FilterSection({
  section,
  isFirst,
}: {
  section: FilterSection;
  isFirst: boolean;
}): JSX.Element {
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
                defaultValue={option.value}
                type="checkbox"
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

interface MobileFilterDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  facets?: Facets;
}

export function MobileFilterDialog({
  isOpen,
  setIsOpen,
  facets,
  onSortChange,
  currentSort,
}: MobileFilterDialogProps): JSX.Element {
  const filters = transformFacetsToFilters(facets);

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

          <div className="mt-4">
            <div className="px-4 py-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Ordenar por</h3>
              <SortSection onSortChange={onSortChange} currentSort={currentSort} />
            </div>

            <form className="mt-4">
              {filters.length > 0 ? (
                filters.map((section) => (
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
                              defaultValue={option.value}
                              type="checkbox"
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
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-gray-500">No hay filtros disponibles</div>
              )}
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Filters;
