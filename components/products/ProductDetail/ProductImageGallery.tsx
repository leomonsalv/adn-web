'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  laboratory?: string;
  variant?: {
    color?: string;
    size?: string;
  };
  variantOptionsMap?: Record<string, { images?: string[] }>;
}
function getHighResUrl(url: string, targetResolution: 1024 | 1920 = 1024) {
  return url.replace('/512/', `/${targetResolution}/`);
}
export default function ProductImageGallery({
  images = [],
  productName,
  laboratory,
  variant,
  variantOptionsMap,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>(images);

  // Actualizar las imágenes cuando cambian las variantes o las imágenes principales
  useEffect(() => {
    // Verificar si hay variantes seleccionadas y opciones de variantes disponibles
    if (variant && variantOptionsMap) {
      // Primero intentar obtener imágenes de la combinación específica de color y tamaño
      if (variant.color && variant.size) {
        // Buscar en el mapa de variantes si existe una combinación específica
        const colorOptions = variantOptionsMap[variant.color]?.options;
        if (colorOptions && colorOptions[variant.size]) {
          // Si hay imágenes específicas para esta combinación en variantOptionsMap
          const variantImages = variantOptionsMap[variant.color]?.images || [];
          if (variantImages.length > 0) {
            setGalleryImages(variantImages);
            setSelectedImageIndex(0);
            return;
          }
        }
      }

      // Si no hay combinación específica, intentar con el color
      if (variant.color && variantOptionsMap[variant.color]?.images?.length) {
        setGalleryImages(variantOptionsMap[variant.color].images || []);
        setSelectedImageIndex(0);
        return;
      }

      // Si no hay imágenes por color, intentar con el tamaño
      if (variant.size && variantOptionsMap[variant.size]?.images?.length) {
        setGalleryImages(variantOptionsMap[variant.size].images || []);
        setSelectedImageIndex(0);
        return;
      }
    }

    // Si hay variantes pero no se encontraron imágenes específicas, o no hay variantes,
    // usar las imágenes principales del producto
    if (images.length > 0) {
      setGalleryImages(images);
      setSelectedImageIndex(0);
    }
  }, [images, variant, variantOptionsMap]);

  // Si no hay imágenes, mostrar una imagen por defecto
  if (galleryImages.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg flex justify-center items-center h-[500px] w-full">
        <Image
          alt={`Imagen del producto ${productName}`}
          src="/delivery.jpeg"
          height={500}
          width={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="size-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Imagen principal */}
      <div className="overflow-hidden rounded-lg flex justify-center items-center h-[500px] w-full bg-white">
        <Image
          key={`main-${selectedImageIndex}`}
          alt={`Imagen del producto ${productName}${laboratory ? ` vendido por ${laboratory}` : ''}`}
          src={getHighResUrl(galleryImages[selectedImageIndex])}
          height={800}
          width={800}
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Miniaturas */}
      {galleryImages.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {galleryImages.map((image, index) => (
            <button
              key={`thumb-${index}`}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                'relative h-16 w-16 rounded-md border overflow-hidden',
                selectedImageIndex === index
                  ? 'border-2 border-blue-500'
                  : 'border-gray-200 hover:border-gray-300',
              )}
              aria-label={`Ver imagen ${index + 1} de ${galleryImages.length}`}
            >
              <Image
                src={image.trim().replace(/`/g, '')}
                alt={`Miniatura ${index + 1} del producto ${productName}`}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
