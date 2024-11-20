// filters.tsx
"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FiltersProps {
  filters: FilterSection[];
}

interface MobileFilterDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterSection[];
}

interface FilterSectionProps {
  section: FilterSection;
  isFirst: boolean;
}

interface FilterOptionProps {
  sectionId: string;
  option: FilterOption;
  optionIdx: number;
}

interface MobileFilterDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterSection[];
}

/**
 * Filters Component for Desktop View.
 *
 * @param {FilterSection[]} filters - The list of filter sections to be displayed.
 * @returns {JSX.Element} The Filters component for desktop.
 */
export function Filters({ filters }: FiltersProps): JSX.Element {
  return (
    <form className="space-y-10 divide-y divide-gray-200">
      {filters.map((section, sectionIdx) => (
        <FilterSectionComponent
          key={section.name}
          section={section}
          isFirst={sectionIdx === 0}
        />
      ))}
    </form>
  );
}

/**
 * Component for rendering individual filter sections.
 *
 * @param {FilterSection} section - The filter section data.
 * @param {boolean} isFirst - Whether this is the first filter section.
 * @returns {JSX.Element} The filter section component.
 */
function FilterSectionComponent({
  section,
  isFirst,
}: FilterSectionProps): JSX.Element {
  return (
    <div className={isFirst ? "" : "pt-10"}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-900">
          {section.name}
        </legend>
        <div className="space-y-3 pt-6">
          {section.options.map((option, optionIdx) => (
            <FilterOptionComponent
              key={option.value}
              sectionId={section.id}
              option={option}
              optionIdx={optionIdx}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

/**
 * Component for rendering individual filter options.
 *
 * @param {string} sectionId - The ID of the filter section.
 * @param {FilterOption} option - The filter option data.
 * @param {number} optionIdx - The index of the option.
 * @returns {JSX.Element} The filter option component.
 */
function FilterOptionComponent({
  sectionId,
  option,
  optionIdx,
}: FilterOptionProps): JSX.Element {
  return (
    <div className="flex items-center">
      <input
        defaultValue={option.value}
        id={`${sectionId}-${optionIdx}`}
        name={`${sectionId}[]`}
        type="checkbox"
        className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label
        htmlFor={`${sectionId}-${optionIdx}`}
        className="ml-3 text-sm text-gray-600"
      >
        {option.label}
      </label>
    </div>
  );
}

/**
 * Mobile Filter Dialog Component.
 *
 * @param {boolean} isOpen - Indicates if the dialog is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to set dialog open state.
 * @param {FilterSection[]} filters - The list of filter sections to be displayed.
 * @returns {JSX.Element} The mobile filter dialog component.
 */
export function MobileFilterDialog({
  isOpen,
  setIsOpen,
  filters,
}: MobileFilterDialogProps): JSX.Element {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="relative z-40 lg:hidden"
    >
      <div className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear" />
      <div className="fixed inset-0 z-40 flex">
        <Dialog.Panel className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <form className="mt-4">
            {filters.map((section) => (
              <Disclosure
                key={section.name}
                as="div"
                className="border-t border-gray-200 pb-4 pt-4"
              >
                <fieldset>
                  <legend className="w-full px-2">
                    <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                      <span className="text-sm font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel className="px-4 pb-2 pt-4">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <FilterOptionComponent
                          key={option.value}
                          sectionId={section.id}
                          option={option}
                          optionIdx={optionIdx}
                        />
                      ))}
                    </div>
                  </DisclosurePanel>
                </fieldset>
              </Disclosure>
            ))}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
