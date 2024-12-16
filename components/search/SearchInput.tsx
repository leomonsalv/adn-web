import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { InputHTMLAttributes } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: { name: string }[]
}

export default function SearchInput({
  selectedCategory,
  setSelectedCategory,
  categories,
  ...props
}: SearchInputProps) {
  return (
    <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300">
      {/* Category select - hidden on mobile */}
      <div className="hidden sm:flex items-center bg-[#E2E2E2] rounded-l-md">
        <select
          className="h-10 rounded-l-md border-0 bg-transparent text-gray-900 focus:ring-0 sm:text-sm val:bg-red-500 max-w-[8rem] truncate"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Todo</option>
          {categories.map((category) => (
            <option key={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Search input - simplified on mobile */}
      <div className="relative flex flex-1 items-center">
        <input
          {...props}
          prefix="Buscar"
          type="text"
          className="block w-full rounded-md sm:rounded-l-none border-0 py-1.5 pl-10 pr-10 text-sm text-gray-900 ring-0 placeholder:text-gray-400 focus:ring-0"
          placeholder="Busca por producto (Ej. Jabón para niños)"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
