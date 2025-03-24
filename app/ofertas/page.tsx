'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSpecialCategories from '@/hooks/use-special-categories';
import { NextSeo } from 'next-seo';

export default function OfertasPage() {
  const { useGetClientSpecialCategories } = useSpecialCategories();
  const {
    data: specialCategoriesData,
    isLoading,
    isError,
    error,
  } = useGetClientSpecialCategories();

  const specialCategories = useMemo(() => {
    return specialCategoriesData?.special_categories || [];
  }, [specialCategoriesData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error?.message || 'Ocurrió un error al cargar las categorías especiales'}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NextSeo
        title="Ofertas Especiales | Adan Farmacia"
        description="Descubre todas nuestras ofertas y categorías especiales en Adan Farmacia"
      />

      <div className="pt-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Ofertas Especiales</h1>
        <p className="text-gray-500 mb-8">
          Explora nuestras categorías con ofertas y productos especiales
        </p>

        {specialCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No hay categorías especiales disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {specialCategories.map((category) => {
              const categorySlug =
                category.slug || category.title?.toLowerCase().replace(/\s+/g, '-');
              const categoryName = category.name || category.title;
              const imageUrl = category.imageUrl || category.image_url;
              return (
                <div
                  key={category.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="relative aspect-[3/2] bg-gray-200">
                    {imageUrl && (
                      <Image
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        alt={categoryName || ''}
                        src={imageUrl}
                        className="group-hover:opacity-75"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link href={`/ofertas/${categorySlug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {categoryName}
                      </Link>
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500">{category.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
