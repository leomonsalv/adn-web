import React from 'react';
import CategoryGrid from './CategoryGrid';
import { categoriesBox } from '@/lib/dummyData';

type Props = {
  //CategoryObject tiene que ser lo que vendria de BE
  CategoryObject: {
    title: string;
    imageUrl: string;
    description: string;
    href: string;
  }[];
};

function categoryBox({ CategoryObject }: Props) {
  const handleViewMore = () => {
    console.log('Aqui tiene que ir la url que lleva a la pagina de la categoria');
  };

  return (
    <div className=" flex items-center justify-center">
      <CategoryGrid
        title="Cosas para comprar"
        categories={categoriesBox}
        onViewMore={handleViewMore}
        seeMoreText="Ver más"
      />
    </div>
  );
}

export default categoryBox;
