/**
 * Componente para seleccionar el color de un producto.
 *
 * **Nota:** Este componente depende de un objeto `product` con la siguiente estructura mínima:
 * ```json
 * {
 *   "name": "Nombre del producto",
 *   "colors": [
 *     {
 *       "name": "Black",
 *       "bgColor": "bg-gray-900",
 *       "selectedColor": "ring-gray-900"
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * El componente recibe:
 * - `product`: El objeto del producto, que incluye un array de `colors` con la información del color.
 * - `selectedColor`: El color actualmente seleccionado.
 * - `setSelectedColor`: Función para actualizar el color seleccionado.
 *
 * Ejemplo de uso:
 * ```tsx
 * <ProductColorSelector
 *   product={miProducto}
 *   selectedColor={miProducto.colors[0]}
 *   setSelectedColor={setColorSeleccionado}
 * />
 * ```
 */

import { Radio, RadioGroup } from '@headlessui/react'
import { product } from '@/lib/dummyData'
import { classNames } from '@/lib/utils'
import React from 'react'

type Props = {
  product: typeof product
  selectedColor: (typeof product.colors)[0]
  setSelectedColor: React.Dispatch<React.SetStateAction<(typeof product.colors)[0]>>
} & React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
  }

const ProductColorSelector = (props: Props) => {
  const { product, selectedColor, setSelectedColor } = props

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Color</h2>

      <fieldset aria-label="Choose a color" className="mt-2">
        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="flex items-center space-x-3"
        >
          {product.colors.map((color) => (
            <Radio
              key={color.name}
              value={color}
              aria-label={color.name}
              className={classNames(
                color.selectedColor,
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(color.bgColor, 'size-8 rounded-full border border-black/10')}
              />
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  )
}

export default ProductColorSelector
