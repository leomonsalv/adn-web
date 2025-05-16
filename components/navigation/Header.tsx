'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';
import { logOutAccount } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CARRITO, HISTORIAL, LOGIN, HOME } from '@/lib/routes';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

import NavLogo from '@/public/navigation-logo';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import SearchInput from '../search/SearchInput';
import { useRouter, usePathname } from 'next/navigation';
import { navbarMenuHover } from '@/lib/dummyData';
import useCart from '@/hooks/use-cart';
import { useCartStore } from '@/stores/cart-store';
import { categories } from '@/lib/categories';
import MegaMenu from '@/components/navigation/MegaMenu';
import { formatVefCurrency } from '@/lib/utils';
import useProducts from '@/hooks/use-products';

export function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useAuth();
  const { toast } = useToast();
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState({ value: '', category: '1' });
  const {
    cart,
    couponData,
    updateCartWithFullProducts,
    setCart,
    getCartTotal,
    getCartCount,
    clearCart,
    setCouponData,
  } = useCartStore();
  const { useGetProductsBatch } = useProducts();
  const { useGetCart } = useCart();
  const { data: cartData, isSuccess } = useGetCart();
  const queryClient = useQueryClient();

  const cartProducts = useMemo(() => {
    return cart?.products || [];
  }, [cart]);

  const { data: fullProductsData, isLoading: isProductsLoading } =
    useGetProductsBatch(cartProducts);

  useEffect(() => {
    if (fullProductsData && !isProductsLoading) {
      updateCartWithFullProducts(fullProductsData);
    }
  }, [fullProductsData, isProductsLoading, updateCartWithFullProducts]);

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
        const searchValue = (e.target as HTMLInputElement).value;
        router.push(`/b?q=${searchValue}`);
      }
    },
    [search.value, search.category, router],
  );

  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/b?q=${query.toLowerCase()}`);
    },
    [search.category],
  );

  useEffect(() => {
    if (cartData && isSuccess && user) {
      setCart(cartData);
    }
  }, [cartData, isSuccess, user]);

  useEffect(() => {
    if (pathname !== '/checkout') {
      if (couponData && user) {
        setCouponData(null);
      }
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logOutAccount();
      queryClient.clear();
      localStorage.clear();
      clearCart();

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
            <div className="flex items-center gap-x-2 sm:gap-x-4 sm:flex">
              <Link href="/" aria-label="adan" className="shrink-0">
                <NavLogo />
              </Link>
            </div>

            {/* Search bar - simplified on mobile */}
            <div className="flex-1 px-2 lg:px-6">
              <div className="w-full mx-auto">
                <SearchInput
                  selectedCategory={search.category}
                  setSelectedCategory={handleSelectCategory}
                  categories={[]}
                  value={search.value}
                  onChange={handleChange}
                  onKeyDown={handleEnterSearch}
                  onSearch={handleSearch}
                />
              </div>
            </div>

            {/* User account and cart */}
            <div className="flex items-center justify-end">
              {/* User account - visible on all devices */}
              <div className="flex items-center">
                {loading || !user?.displayName || user.isAnonymous ? (
                  <Link
                    href={LOGIN}
                    className="text-sm text-white hover:text-gray-200 flex flex-col"
                  >
                    <span className="text-xs text-white hover:text-gray-200 hidden sm:inline">
                      Hola, Identifícate
                    </span>
                    <span className="text-sm text-white font-semibold hover:text-gray-200">
                      <span className="sm:hidden">Iniciar Sesión</span>
                      <span className="hidden sm:inline">
                        Cuenta y Listas <ChevronDownIcon className="ml-1 h-3.5 w-3.5 inline" />
                      </span>
                    </span>
                  </Link>
                ) : (
                  <PopoverGroup className="flex hover:opacity-75 shrink-0">
                    <Popover className="relative">
                      <PopoverButton className="text-sm text-white hover:text-gray-200 flex flex-col">
                        <span className="text-xs text-white hover:text-gray-200 hidden sm:inline">
                          Hola,{' '}
                          <strong>
                            {user?.displayName !== 'undefined' ? user?.displayName : 'Anónimo'}
                          </strong>
                        </span>
                        <span className="text-sm text-white font-semibold hover:text-gray-200">
                          <span className="sm:hidden">Mi Cuenta</span>
                          <span className="hidden sm:inline">
                            Cuenta y Listas <ChevronDownIcon className="ml-1 h-3.5 w-3.5 inline" />
                          </span>
                        </span>
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="absolute left-0 top-full mt-2 w-80 rounded-lg bg-white p-4 shadow-lg animate-accordion-down opacity-0 scale-95 data-open:opacity-100 data-open:scale-100"
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

              {/* Orders - visible on all devices */}
              <div className="flex items-center ml-2 sm:ml-4">
                <Link
                  href={user && !user.isAnonymous ? HISTORIAL : LOGIN}
                  className="text-sm text-white hover:text-gray-200 flex flex-col"
                >
                  <span className="text-xs text-white hover:text-gray-200 hidden sm:inline">
                    Devoluciones
                  </span>
                  <span className="text-sm text-white font-semibold hover:text-gray-200">
                    <span className="hidden sm:inline">y Pedidos</span>
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
                        {getCartCount() > 0 ? `${formatVefCurrency(getCartTotal())}` : '0.00'}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MegaMenu categories={categories} />
    </header>
  );
}
