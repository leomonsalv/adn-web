import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { categories } from '@/lib/categories';
import { Category, Niche, Subcategory } from '@/types/categories';

interface CategoryPopoverProps {
  category: Category;
}

interface MenuSectionProps {
  headingId: string;
  title: string;
  niches?: Niche[];
  subcategories?: Subcategory[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ headingId, title, niches, subcategories }) => (
  <div>
    <p id={headingId} className="font-medium text-gray-900">
      {title}
    </p>
    <ul role="list" aria-labelledby={headingId} className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
      {subcategories?.map((subcategory) => (
        <li key={subcategory._id} className="flex">
          <a href={`/${subcategory.slug}`} className="hover:text-gray-800">
            {subcategory.name}
          </a>
        </li>
      ))}
      {niches?.map((niche) => (
        <li key={niche._id} className="flex">
          <a href={`/${niche.slug}`} className="hover:text-gray-800">
            {niche.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const CategoryPopover: React.FC<CategoryPopoverProps> = ({ category }) => (
  <Popover key={category._id} className="flex">
    <div className="relative flex">
      <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
        {category.name}
      </PopoverButton>
    </div>
    <PopoverPanel className="absolute inset-x-0 top-full text-gray-500 transition sm:text-sm">
      <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
            {category.subcategories.map((subcategory) => (
              <MenuSection
                key={subcategory._id}
                headingId={`subcategory-heading-${subcategory._id}`}
                title={subcategory.name}
                niches={subcategory.niches}
              />
            ))}
          </div>
        </div>
      </div>
    </PopoverPanel>
  </Popover>
);

const MegaMenu: React.FC = () => (
  <div className="hidden h-full lg:flex">
    <div className="ml-8 flex h-full justify-center space-x-8">
      {categories.map((category: Category) => (
        <CategoryPopover key={category._id} category={category} />
      ))}
    </div>
  </div>
);

export default MegaMenu;
