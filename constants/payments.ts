interface PaymentsPM {
  name: string;
  phone: string;
  rif: string;
}

export const PaymentsPM: PaymentsPM[] = [
  { name: 'Banca Amiga', phone: '0424-1611374', rif: 'J-500594313' },
  { name: 'Banco Plaza', phone: '0212-9876543', rif: 'J-123456789' },
] as const;
