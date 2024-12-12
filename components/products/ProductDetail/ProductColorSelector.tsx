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
