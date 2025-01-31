import Link from 'next/link';
import React from 'react';

type Props = {
  key: string;
  title: string;
  imageUrl: string;
  description: string;
  href: string;
};

export default function CategoryCard({ key, title, imageUrl, description, href }: Props) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="px-4 py-5 sm:px-6">{title}</div>
      <div className="px-4 py-5 sm:p-6">
        <img src={imageUrl} alt={title} className="h-32 w-full object-cover" />
        <p className="mt-2 text-lg font-medium text-gray-900">{description}</p>
      </div>
      <Link href={href} className="px-4 py-4 sm:px-6">
        Ver más
      </Link>
    </div>
  );
}
