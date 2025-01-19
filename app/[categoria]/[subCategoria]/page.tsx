import Link from 'next/link';
import { niches } from '../../../data/categories';

export default function SubCategoryPage({
  params,
}: {
  params: { categoryType: string; subCategory: string };
}) {
  const nicheList = niches[params.subCategory] || [];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{params.subCategory}</h2>
      <ul className="space-y-2">
        {nicheList.map((niche) => (
          <li key={niche.id}>
            <Link
              href={`/${params.categoryType}/${params.subCategory}/${niche.id}`}
              className="text-green-500 hover:underline"
            >
              {niche.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
