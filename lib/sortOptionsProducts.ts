type SortField = 'price' | 'price_extra' | 'name' | 'qty_available' | 'x_studio_laboratory';
type SortOrder = 'asc' | 'desc';

type SortConfig = Array<{
  label: string;
  options: Array<{
    value: string;
    label: string;
    sort: { field: SortField; order: SortOrder };
  }>;
}>;

export const SORT_CONFIG: SortConfig = [
  {
    label: 'Precio',
    options: [
      {
        value: 'price-asc',
        label: 'Menor a Mayor',
        sort: { field: 'price', order: 'asc' },
      },
      {
        value: 'price-desc',
        label: 'Mayor a Menor',
        sort: { field: 'price', order: 'desc' },
      },
    ],
  },
  {
    label: 'Nombre',
    options: [
      {
        value: 'name-asc',
        label: 'A - Z',
        sort: { field: 'name', order: 'asc' },
      },
      {
        value: 'name-desc',
        label: 'Z - A',
        sort: { field: 'name', order: 'desc' },
      },
    ],
  },
  {
    label: 'Laboratorio',
    options: [
      {
        value: 'x_studio_laboratory-asc',
        label: 'A - Z',
        sort: { field: 'x_studio_laboratory', order: 'asc' },
      },
      {
        value: 'x_studio_laboratory-desc',
        label: 'Z - A',
        sort: { field: 'x_studio_laboratory', order: 'desc' },
      },
    ],
  },
  {
    label: 'Otros',
    options: [
      {
        value: 'qty_available-desc',
        label: 'Disponibilidad',
        sort: { field: 'qty_available', order: 'desc' },
      },
    ],
  },
];
