import React from 'react';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import { products } from '@/lib/dummyData';
import CategoryGrid from './CategoryGrid';

type Props = {
  CategoryObject: {
    title: string;
    imageUrl: string;
    description: string;
    href: string;
  }[];
};

const CategoryObject = [
  {
    title: 'Accesorios',
    imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    description: 'Variety of accessories',
    href: '#',
    products: [
      {
        id: 1,
        name: 'Cinturón',
        price: 25.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
      },
      {
        id: 2,
        name: 'Reloj',
        price: 50.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
      },
      {
        id: 3,
        name: 'Gorra',
        price: 15.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
      },
    ],
  },
  {
    title: 'Bags',
    imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    description: 'Variety of bags',
    href: '#',
    products: [
      {
        id: 4,
        name: 'Mochila',
        price: 50.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
      },
      {
        id: 5,
        name: 'Bolso',
        price: 40.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
      },
      {
        id: 6,
        name: 'Cartera',
        price: 30.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
      },
    ],
  },
  {
    title: 'Jackets',
    imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    description: 'Variety of jackets',
    href: '#',
    products: [
      {
        id: 7,
        name: 'Chaqueta de cuero',
        price: 100.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
      },
      {
        id: 8,
        name: 'Chaqueta de mezclilla',
        price: 80.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
      },
      {
        id: 9,
        name: 'Chaqueta de invierno',
        price: 120.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
      },
    ],
  },
  {
    title: 'Shirts',
    imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
    description: 'Variety of shirts',
    href: '#',
    products: [
      {
        id: 10,
        name: 'Camisa de vestir',
        price: 50.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
      },
      {
        id: 11,
        name: 'Camisa casual',
        price: 40.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
      },
      {
        id: 12,
        name: 'Camisa de manga corta',
        price: 30.0,
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
      },
    ],
  },
];

const categories = [
  {
    title: 'Herramientas de limpiar',
    description: 'Productos para limpieza del hogar',
    image: 'https://picsum.photos/0/100',
    link: '#',
  },
  {
    title: 'Almacenamiento en casa',
    description: 'Organiza tus espacios con estilo',
    image: 'https://picsum.photos/100/200',
    link: '#',
  },
  {
    title: 'Decoración del hogar',
    description: 'Embellece tu espacio con nuestras opciones',
    image: 'https://picsum.photos/200/300',
    link: '#',
  },
  {
    title: 'Ropa de cama',
    description: 'Encuentra comodidad y estilo',
    image: 'https://picsum.photos/300/400',
    link: '#',
  },
];

function categoryBox({ CategoryObject: Items }: Props) {
  const handleViewMore = () => {
    console.log('Ver más clickeado');
  };

  return (
    <div className=" flex items-center justify-center">
      <CategoryGrid
        title="Cosas para comprar"
        categories={categories}
        onViewMore={handleViewMore}
      />
    </div>
  );
}

export default categoryBox;
