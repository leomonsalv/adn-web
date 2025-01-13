import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Category {
  title: string;
  image: string;
  link: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
  onViewMore: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ title, categories, onViewMore }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#EBF3ED] transition-all duration-500 bg-gradient-to-br hover:to-[#7B8967] hover:from-[#1D280E] hover:shadow-lg p-6 w-40 h-40 rounded-md shadow-sm flex flex-col justify-between text-left group relative"
          >
            <h3 className="text-lg font-medium">
              <span className="text-black group-hover:text-[#7B8967] transition-colors">
                {category.title.split(' ')[0]}
              </span>{' '}
              <span className="text-[#7B8967] group-hover:text-white transition-colors">
                {category.title.split(' ').slice(1).join(' ')}
              </span>
            </h3>
            <Link href={category.link}>
              <Image
                height={64}
                width={64}
                src={category.image}
                alt={category.title}
                className="w-16 h-16 absolute right-2 bottom-2"
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={onViewMore}
        className="mt-4 text-blue-600 hover:underline text-sm font-medium"
      >
        Descubra más en Hogar
      </button>
    </div>
  );
};

export default CategoryGrid;
