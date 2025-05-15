import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { Bars3Icon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Category } from '@/types/categories';

interface CategorySectionProps {
  category: Category;
  isMobile?: boolean;
  onLinkClick?: () => void; // Nueva prop para manejar el cierre del menú
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  isMobile = false,
  onLinkClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para alternar la expansión de categorías
  const toggleExpand = (e: React.MouseEvent) => {
    // Prevenir la navegación si se hace clic en el área de expansión
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // En dispositivos móviles, solo se expande al hacer clic
  // En desktop, se expande al hacer hover o clic
  const handleMouseEvents = isMobile
    ? {}
    : {
        onMouseEnter: () => setIsExpanded(true),
        onMouseLeave: () => setIsExpanded(false),
      };

  return (
    <div className="space-y-2" {...handleMouseEvents}>
      <div className="flex items-center justify-between group cursor-pointer">
        <Link
          href={`/${category.slug}`}
          className="font-bold text-base text-gray-900 hover:text-gray-600 flex-grow"
          onClick={(e) => {
            e.stopPropagation();
            if (isMobile && onLinkClick) {
              onLinkClick();
            }
          }}
        >
          {category.name}
        </Link>
        {category.subcategories && category.subcategories.length > 0 && (
          <button
            onClick={toggleExpand}
            className="p-1 focus:outline-none"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Contraer categoría' : 'Expandir categoría'}
          >
            <ChevronRightIcon
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        )}
      </div>

      {category.subcategories && category.subcategories.length > 0 && (
        <div
          className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          ${isMobile ? 'pl-4' : ''}
        `}
        >
          {category.subcategories.map((subcategory) => (
            <div key={subcategory._id} className={`py-2 ${isMobile ? 'my-1' : 'py-1'}`}>
              <Link
                href={`/${subcategory.slug}`}
                className={`block font-semibold text-gray-700 hover:text-gray-900 ${isMobile ? 'text-sm py-1.5' : 'text-sm'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMobile && onLinkClick) {
                    onLinkClick();
                  }
                }}
              >
                {subcategory.name}
              </Link>

              {subcategory.niches && subcategory.niches.length > 0 && (
                <ul className={`pl-2 mt-1 ${isMobile ? 'space-y-2' : 'space-y-1'}`}>
                  {subcategory.niches.map((niche) => (
                    <li key={niche._id}>
                      <Link
                        href={`/${niche.slug}`}
                        className={`block text-gray-600 hover:text-gray-900 ${isMobile ? 'text-sm py-1.5' : 'text-xs'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isMobile && onLinkClick) {
                            onLinkClick();
                          }
                        }}
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
      )}
    </div>
  );
};

const MobileMenu: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="flex items-center gap-x-1 text-sm font-medium text-white hover:opacity-75 lg:hidden"
        onClick={() => setIsOpen(true)} // Asegurarse de que el trigger abra el menú
      >
        <Bars3Icon className="h-5 w-5" />
        <span className="text-sm font-bold">Todo</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-md p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Categorías</h2>
            <p className="text-xs text-gray-500 mt-1">
              Toca en una categoría para ver sus subcategorías
            </p>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="p-4 space-y-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <CategorySection category={category} isMobile={true} onLinkClick={closeMenu} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopMenu: React.FC<{ categories: Category[] }> = ({ categories }) => (
  <Popover>
    <PopoverTrigger className="hidden lg:flex items-center gap-x-1 text-sm font-medium text-white hover:opacity-75">
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
);

interface MegaMenuProps {
  categories: Category[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories }) => {
  return (
    <nav className="bg-[#2C3A4C] border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="h-12">
          <div className="flex-1 overflow-x-auto no-scrollbar h-full">
            <div className="flex items-center space-x-4 px-4 h-full justify-between">
              <MobileMenu categories={categories} />
              <DesktopMenu categories={categories} />

              <div className="hidden lg:flex items-center space-x-4">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category._id}
                    href={`/${category.slug}`}
                    className="text-sm font-medium text-white hover:opacity-75 whitespace-nowrap py-3"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

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
              <Link
                href="/servicios"
                className="flex items-center h-full text-white hover:opacity-75 shrink-0"
              >
                <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">
                  Servicios
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
