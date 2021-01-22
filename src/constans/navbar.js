// import { useTranslation } from 'react-i18next';
import { HOME, PRODUCTS, ACCOUNT } from 'constans/routes';

// const { t } = useTranslation();

const navbar = [
  {
    name: 'SALUD',
    route: HOME
  },
  {
    name: 'VITAMINAS',
    route: PRODUCTS
  },
  {
    name: 'INSUMOS',
    route: ACCOUNT
  },
  {
    name: 'MEDICAMENTOS',
    route: HOME
  },
  {
    name: 'ALIMENTOS',
    route: HOME
  },
  {
    name: 'NIÑOS',
    route: HOME
  },
  {
    name: 'PERSONALES',
    route: HOME
  },
  {
    name: 'BELLEZA',
    route: HOME
  },
  {
    name: 'HOGAR',
    route: HOME
  },
  {
    name: 'ESCRITORIO',
    route: HOME
  }
];

export default navbar;
