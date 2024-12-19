// sortOptionsProducts.ts

export interface SortOption {
  [key: string]: 'asc' | 'desc';
}

interface SortConfigItem {
  value: string;
  label: string;
  sort: SortOption;
}

interface SortConfigGroup {
  label: string;
  options: SortConfigItem[];
}

export const SORT_CONFIG: SortConfigGroup[] = [
  {
    label: 'Precio',
    options: [
      {
        value: 'price-asc',
        label: 'Menor a Mayor',
        sort: { price: 'asc' },
      },
      {
        value: 'price-desc',
        label: 'Mayor a Menor',
        sort: { price: 'desc' },
      },
    ],
  },
  {
    label: 'Nombre',
    options: [
      {
        value: 'name-asc',
        label: 'A - Z',
        sort: { name: 'asc' },
      },
      {
        value: 'name-desc',
        label: 'Z - A',
        sort: { name: 'desc' },
      },
    ],
  },
  {
    label: 'Laboratorio',
    options: [
      {
        value: 'x_studio_laboratory-asc',
        label: 'A - Z',
        sort: { x_studio_laboratory: 'asc' },
      },
      {
        value: 'x_studio_laboratory-desc',
        label: 'Z - A',
        sort: { x_studio_laboratory: 'desc' },
      },
    ],
  },
  {
    label: 'Otros',
    options: [
      {
        value: 'qty_available-desc',
        label: 'Disponibilidad',
        sort: { qty_available: 'desc' },
      },
    ],
  },
];
