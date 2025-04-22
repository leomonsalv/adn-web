'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VariantOption {
  name: string;
  value: string;
  type: string;
  images?: string[];
}

interface ProductColorSelectorProps {
  selectedColor: VariantOption | null;
  setSelectedColor: (color: VariantOption) => void;
  variantOptions?: {
    color?: {
      type: string;
      values: string[];
    };
  };
  variantOptionsMap?: Record<string, any>;
}

export function ProductColorSelector({
  selectedColor,
  setSelectedColor,
  variantOptions,
  variantOptionsMap,
}: ProductColorSelectorProps) {
  if (!variantOptions?.color || !variantOptions.color.values.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <h2 className="text-sm font-medium text-gray-900">Color</h2>

      <div className="mt-2 flex flex-wrap gap-2">
        {variantOptions.color.values.map((colorValue) => {
          const isSelected = selectedColor?.value === colorValue;
          return (
            <button
              key={colorValue}
              type="button"
              className={cn(
                'flex items-center justify-center rounded-full h-8 w-8 border',
                isSelected
                  ? 'ring-2 ring-offset-1 ring-blue-500'
                  : 'ring-1 ring-gray-200 hover:ring-gray-300',
              )}
              style={{ backgroundColor: colorValue }}
              onClick={() =>
                setSelectedColor({
                  name: 'color',
                  value: colorValue,
                  type: 'color',
                })
              }
              aria-label={`Color ${colorValue}`}
            >
              <span className="sr-only">{colorValue}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ProductSizePickerProps {
  selectedSize: VariantOption | null;
  setSelectedSize: (size: VariantOption) => void;
  variantOptions?: {
    size?: {
      type: string;
      values: string[];
    };
  };
  variantOptionsMap?: Record<string, any>;
  selectedColor?: VariantOption | null;
}

export function ProductSizePicker({
  selectedSize,
  setSelectedSize,
  variantOptions,
  variantOptionsMap,
  selectedColor,
}: ProductSizePickerProps) {
  if (!variantOptions?.size || !variantOptions.size.values.length) {
    return null;
  }

  // Filtrar tamaños disponibles basados en el color seleccionado
  const availableSizes = variantOptions.size.values.filter((sizeValue) => {
    if (!selectedColor || !variantOptionsMap) return true;

    // Si hay un color seleccionado, verificar si este tamaño está disponible para ese color
    return variantOptionsMap[selectedColor.value]?.options?.[sizeValue] !== undefined;
  });

  if (availableSizes.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Tamaño</h2>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
        {availableSizes.map((sizeValue) => {
          const isSelected = selectedSize?.value === sizeValue;
          const isAvailable = true; // Aquí podrías verificar stock si es necesario

          return (
            <button
              key={sizeValue}
              type="button"
              className={cn(
                'flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium uppercase',
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : isAvailable
                    ? 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                    : 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400',
              )}
              disabled={!isAvailable}
              onClick={() =>
                setSelectedSize({
                  name: 'size',
                  value: sizeValue,
                  type: 'select',
                })
              }
              aria-label={`Tamaño ${sizeValue}${!isAvailable ? ' (no disponible)' : ''}`}
            >
              {sizeValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}
