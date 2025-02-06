import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { categories } from '@/lib/categories';
import Link from 'next/link';
import { Bars3Icon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getCategories } from '@/api/categories';
import { Category } from '@/types/categories';

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between group">
        <Link
          href={`/categoria/${category.slug}`}
          className="font-bold text-base text-gray-900 hover:text-gray-600 flex-grow"
        >
          {category.name}
        </Link>
        <ChevronRightIcon
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isHovered ? 'rotate-90' : ''
          }`}
        />
      </div>

      {/* Subcategories */}
      <div
        className={`
        overflow-hidden transition-all duration-200 ease-in-out
        ${isHovered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        {category.subcategories?.map((subcategory) => (
          <div key={subcategory._id} className="pl-4 py-1">
            <Link
              href={`/categoria/${subcategory.slug}`}
              className="block font-semibold text-sm text-gray-700 hover:text-gray-900"
            >
              {subcategory.name}
            </Link>

            {/* Niches */}
            {subcategory.niches && subcategory.niches.length > 0 && (
              <ul className="pl-2 mt-1 space-y-1">
                {subcategory.niches.map((niche) => (
                  <li key={niche._id}>
                    <Link
                      href={`/${niche.slug}`}
                      className="text-xs text-gray-600 hover:text-gray-900"
                    >
                      {niche.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MegaMenu = () => {
  return (
    <nav className="bg-[#2C3A4C] border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="h-12">
          <div className="flex-1 overflow-x-auto no-scrollbar h-full">
            <div className="flex items-center space-x-4 px-4 h-full justify-between">
              {/* Todo button with mega menu */}
              <Popover>
                <PopoverTrigger className="flex items-center gap-x-1 text-sm font-medium text-white hover:opacity-75">
                  <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-bold">Todo</span>
                </PopoverTrigger>
                <PopoverContent className="w-[80vw] max-w-4xl p-4" align="start">
                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <CategorySection key={category._id} category={category} />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* First 8 categories */}
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category._id}
                  href={`/categoria/${category.slug}`}
                  className="text-sm font-medium text-white hover:opacity-75 whitespace-nowrap py-3"
                >
                  {category.name}
                </Link>
              ))}

              {/* Offers banner */}
              <Link
                href="/ofertas"
                className="flex items-center h-full text-white hover:opacity-75 shrink-0"
              >
                <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">
                  Ofertas del Día
                </span>
                <span className="ml-2.5 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                  40% OFF
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenu;
