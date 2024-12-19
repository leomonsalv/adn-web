'use client';

import { usePathname } from 'next/navigation';

import { useUser } from '@/hooks/use-user';
import { Button } from '../ui/button';
import { logOutAccount } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { CARRITO, HISTORIAL, LOGIN, SEARCH, HOME } from '@/lib/routes';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

import NavLogo from '@/public/navigation-logo';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import { CustomBadge } from '../ui/badge';
import SearchInput from '../search/SearchInput';
import { useRouter } from 'next/navigation';
import { categories, navbarMenuHover } from '@/lib/dummyData';
import useCart from '@/hooks/use-cart';
import { useCartStore } from '@/stores/cart-store';

export function NavLinks() {
  const router = useRouter();
  const { user, loading } = useUser();
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [search, setSearch] = useState({ value: '', category: '1' });
  const { cart, setCart, getCartTotal, getCartCount } = useCartStore();
  const { useGetCart } = useCart();
  const { data: cartData, isSuccess } = useGetCart();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch({ value: e.target.value, category: search.category });
    },
    [search.category],
  );

  const handleSelectCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearch({ value: search.value, category: e.target.value });
    },
    [search.value],
  );

  const handleEnterSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        router.push(
          `${SEARCH}?query=${search.value.toLowerCase()}&category=${search.category.toLowerCase()}`,
        );
      }
    },
    [search],
  );

  const handleSearch = useCallback(
    (query: string) => {
      router.push(
        `${SEARCH}?query=${query.toLowerCase()}&category=${search.category.toLowerCase()}`,
      );
    },
    [search.category],
  );

  useEffect(() => {
    if (cartData && isSuccess) {
      setCart(cartData);
    }
  }, [cartData, isSuccess]);

  const handleLogout = async () => {
    try {
      await logOutAccount();
      router.replace(HOME);
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado con éxito tu sesión.',
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Hubo un error al cerrar tu sesión.',
      });
    }
  };

  return (
    <header className="w-full">
      {/* Top navigation bar */}
      <div className="bg-[#232F3E] text-white md:py-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between gap-x-2 sm:gap-x-4">
            {/* Logo and mobile menu */}
            <div className="flex items-center gap-x-2 sm:gap-x-4 hidden sm:flex">
              <Link href="/" aria-label="adan" className="flex-shrink-0">
                <NavLogo />
              </Link>
            </div>

            {/* Search bar - simplified on mobile */}
            <div className="flex-1 px-2 lg:px-6">
              <div className="w-full mx-auto">
                <SearchInput
                  selectedCategory={search.category}
                  setSelectedCategory={handleSelectCategory}
                  categories={categories}
                  value={search.value}
                  onChange={handleChange}
                  onKeyDown={handleEnterSearch}
                  onSearch={handleSearch}
                />
              </div>
            </div>

            {/* User account and cart - simplified on mobile */}
            <div className="flex items-center justify-end">
              {/* User account - hidden on mobile */}
              <div className="hidden sm:flex items-center">
                {loading || !user?.displayName ? (
                  <Link
                    href={LOGIN}
                    className="text-sm text-white hover:text-gray-200 flex flex-col"
                  >
                    <span className="text-xs text-white hover:text-gray-200">
                      Hola, Identifícate
                    </span>
                    <span className="text-sm text-white font-semibold hover:text-gray-200">
                      Cuenta y Listas <ChevronDownIcon className="ml-1 h-3.5 w-3.5 inline" />
                    </span>
                  </Link>
                ) : (
                  <PopoverGroup className="flex hover:opacity-75 shrink-0">
                    <Popover className="relative">
                      <PopoverButton className="text-sm text-white hover:text-gray-200 flex flex-col">
                        <span className="text-xs text-white hover:text-gray-200">
                          Hola, <strong>{user.displayName}</strong>
                        </span>
                        <span className="text-sm text-white font-semibold hover:text-gray-200">
                          Cuenta y Listas <ChevronDownIcon className="ml-1 h-3.5 w-3.5 inline" />
                        </span>
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="absolute left-0 top-full mt-2 w-80 rounded-lg bg-white p-4 shadow-lg animate-accordion-down opacity-0 scale-95 data-[open]:opacity-100 data-[open]:scale-100"
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {navbarMenuHover.map((items) => (
                            <Link
                              key={items.name}
                              href={items.href}
                              className="flex items-center rounded-lg p-2 text-sm text-gray-900 hover:bg-gray-50"
                            >
                              <span>{items.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <Button
                            className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </Button>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </PopoverGroup>
                )}
              </div>

              {/* Orders - hidden on mobile */}
              <div className="hidden sm:flex items-center ml-4">
                <Link
                  href={HISTORIAL}
                  className="text-sm text-white hover:text-gray-200 flex flex-col"
                >
                  <span className="text-xs text-white hover:text-gray-200">Devoluciones</span>
                  <span className="text-sm text-white font-semibold hover:text-gray-200">
                    y Pedidos
                  </span>
                </Link>
              </div>

              {/* Cart - simplified on mobile */}
              <div className="flex items-center md:ml-4">
                <Link
                  href={CARRITO}
                  className="group flex items-center p-2 rounded-lg bg-[#37424F]"
                >
                  <div className="relative flex items-end">
                    <ShoppingCartIcon
                      className="h-6 w-6 text-white group-hover:text-gray-200"
                      aria-hidden="true"
                    />
                    {getCartCount() > 0 && (
                      <span className="absolute top-[-0.25rem] right-[-0.25rem] bg-red-500 px-1 rounded-full text-xs text-white">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  {/* Cart details - hidden on mobile */}
                  {getCartCount() > 0 && (
                    <div className="hidden sm:flex flex-col items-start ml-2">
                      <span className="text-xs text-white hover:text-gray-200 opacity-50 leading-none">
                        Carrito
                      </span>
                      <span className="font-semibold text-white group-hover:text-gray-200 leading-md">
                        {getCartCount() > 0 ? `Bs. ${getCartTotal()}` : '0.00'}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      {/* <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-x-1 text-sm font-medium text-white"
        >
          <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          <span className="ml-2">Todo</span>
        </button>
      </div> */}

      {/* <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50">
        <DialogPanel
          className="fixed inset-y-0 left-0 z-50 w-[80%] overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-in-out"
          data-open={mobileMenuOpen}
          style={{
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-cyan-400">adan</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/ofertas"
                  className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50"
                >
                  Ofertas del Día
                  <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    40% OFF
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog> */}

      {/* Main navigation - Updated to include Todo and Ofertas in scrollable area */}
      <nav className="bg-[#2C3A4C] border-t border-gray-700">
        <div className="mx-auto max-w-7xl px-2 sm:px-6">
          <div className="h-12">
            {/* Single scrollable container for all navigation items */}
            <div className="flex-1 overflow-x-auto no-scrollbar h-full">
              <div className="flex items-center space-x-4 px-4 h-full justify-between">
                {/* Todo button with popover */}
                <PopoverGroup className="flex hover:opacity-75 shrink-0">
                  <Popover className="relative">
                    <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-white">
                      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-bold">Todo</span>
                    </PopoverButton>
                    <PopoverPanel
                      transition
                      anchor="bottom"
                      className="absolute left-0 top-full mt-2 w-80 rounded-lg bg-white p-4 shadow-lg animate-accordion-down opacity-0 scale-95 data-[open]:opacity-100 data-[open]:scale-100"
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center rounded-lg p-2 text-sm text-gray-900 hover:bg-gray-50"
                          >
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <Link
                          href="/ofertas"
                          className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Ver todas las ofertas
                          <ChevronDownIcon
                            className="ml-1 h-4 w-4 rotate-[-90deg]"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </PopoverPanel>
                  </Popover>
                </PopoverGroup>

                {/* Categories */}
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-sm font-medium text-white hover:opacity-75 whitespace-nowrap py-3 "
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
                  <CustomBadge color="red" className="ml-2.5">
                    40% OFF
                  </CustomBadge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
