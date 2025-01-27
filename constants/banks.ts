interface Bank {
  value: string;
  label: string;
}

export const BANKS: Bank[] = [
  { label: 'Banco de Venezuela', value: '0102' },
  { label: 'Banesco', value: '0134' },
  { label: 'Banco Provincial (BBVA)', value: '0108' },
  { label: 'Banco Mercantil', value: '0105' },
  { label: 'Banco Nacional de Crédito (BNC)', value: '0191' },
  { label: 'Banco Occidental de Descuento (BOD)', value: '0116' },
  { label: 'Bancaribe', value: '0114' },
  { label: 'Banco Exterior', value: '0115' },
  { label: 'Banco Fondo Común', value: '0151' },
  { label: 'Banco Venezolano de Crédito', value: '0104' },
  { label: 'Banco Bicentenario', value: '0175' },
  { label: 'Banco del Tesoro', value: '0163' },
  { label: 'Banco Activo', value: '0171' },
  { label: 'Banco Plaza', value: '0138' },
  { label: 'Banco Caroní', value: '0128' },
  { label: 'Bancamiga', value: '0172' },
  { label: 'Banco Sofitasa', value: '0137' },
  { label: 'Banco Nacional de Vivienda y Hábitat (BANAVIH)', value: '0166' },
  { label: 'Banco Agrícola de Venezuela', value: '0168' },
  { label: 'Banco de la Fuerza Armada Nacional Bolivariana (BANFANB)', value: '0177' },
] as const;
