type SortField = 'price' | 'price_extra' | 'name' | 'availability';
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
        value: 'price_asc',
        label: 'Menor a Mayor',
        sort: { field: 'price', order: 'asc' },
      },
      {
        value: 'price_desc',
        label: 'Mayor a Menor',
        sort: { field: 'price', order: 'desc' },
      },
    ],
  },
  {
    label: 'Nombre',
    options: [
      {
        value: 'name_asc',
        label: 'A - Z',
        sort: { field: 'name', order: 'asc' },
      },
      {
        value: 'name_desc',
        label: 'Z - A',
        sort: { field: 'name', order: 'desc' },
      },
    ],
  },
  {
    label: 'Disponibilidad',
    options: [
      {
        value: 'availability_desc',
        label: 'Mayor a Menor',
        sort: { field: 'availability', order: 'desc' },
      },
      {
        value: 'availability_asc',
        label: 'Menor a Mayor',
        sort: { field: 'availability', order: 'asc' },
      },
    ],
  },
];
