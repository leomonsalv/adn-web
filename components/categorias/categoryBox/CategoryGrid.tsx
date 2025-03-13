import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
interface Category {
  title: string;
  image: string;
  link: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
  onViewMore: () => void;
  seeMoreText: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  categories,
  onViewMore,
  seeMoreText,
}) => {
  console.log(categories);
  return (
    <Card className="bg-white p-4 rounded-lg shadow-md h-full w-full flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 h-full items-center">
        {categories.map((category, index) => (
          <Link key={index} href={category.link} className="block">
            <Card
              key={index}
              className="bg-[#EBF3ED] overflow-hidden transition-all duration-500 bg-linear-to-br hover:to-[#7B8967] hover:from-[#1D280E] hover:shadow-lg p-6 w-full h-40 rounded-md shadow-xs flex flex-col justify-between text-left group relative"
            >
              <h3 className="text-lg font-medium">
                <span className="text-black group-hover:text-[#7B8967] transition-colors">
                  {category.title.split(' ')[0]}
                </span>{' '}
                <span className="text-[#7B8967] group-hover:text-white transition-colors">
                  {category.title.split(' ').slice(1).join(' ')}
                </span>
              </h3>
              <Image
                height={70}
                width={70}
                src={category.image}
                alt={category.title}
                className="w-16 h-16 absolute right-2 bottom-2"
              />
            </Card>
          </Link>
        ))}
      </div>
      <button
        type="button"
        onClick={onViewMore}
        className="mt-4 text-blue-600 hover:underline text-sm font-medium text-start"
      >
        {seeMoreText}
      </button>
    </Card>
  );
};

export default CategoryGrid;
