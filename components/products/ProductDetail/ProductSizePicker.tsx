/**
 * Componente para seleccionar la talla de un producto.
 *
 * **Nota:** Este componente depende de un objeto `product` con la siguiente estructura mínima:
 * ```json
 * {
 *   "name": "Nombre del producto",
 *   "sizes": [
 *     {
 *       "name": "S",
 *       "inStock": true
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * El componente recibe:
 * - `product`: El objeto del producto que incluye un array de `sizes` con la información de las tallas.
 * - `selectedSize`: La talla actualmente seleccionada.
 * - `setSelectedSize`: Función para actualizar la talla seleccionada.
 *
 * Ejemplo de uso:
 * ```tsx
 * <ProductSizePicker
 *   product={miProducto}
 *   selectedSize={miProducto.sizes[0]}
 *   setSelectedSize={setTallaSeleccionada}
 * />
 * ```
 */

import { product } from '@/lib/dummyData'
import { classNames } from '@/lib/utils'
import { Radio, RadioGroup } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: typeof product
  selectedSize: (typeof product.sizes)[0]
  setSelectedSize: React.Dispatch<React.SetStateAction<(typeof product.sizes)[0]>>
}

const ProductSizePicker = (props: Props) => {
  const { product, selectedSize, setSelectedSize } = props

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Talla</h2>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Ver tabla de tallas
        </Link>
      </div>

      <fieldset aria-label="Choose a size" className="mt-2">
        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="grid grid-cols-3 gap-3 sm:grid-cols-6"
        >
          {product.sizes.map((size) => (
            <Radio
              key={size.name}
              value={size}
              disabled={!size.inStock}
              className={classNames(
                size.inStock
                  ? 'cursor-pointer focus:outline-none'
                  : 'cursor-not-allowed opacity-25',
                'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-black data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2 data-[checked]:hover:bg-black sm:flex-1',
              )}
            >
              {size.name}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  )
}

export default ProductSizePicker
