import React from 'react';
import CategoryGrid from './CategoryGrid';

type Props = {
  CategoryObject: {
    title: string;
    imageUrl: string;
    description: string;
    href: string;
  }[];
};

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
        seeMoreText="Ver más"
      />
    </div>
  );
}

export default categoryBox;
