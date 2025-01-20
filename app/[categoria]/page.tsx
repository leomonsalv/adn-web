import { categories, subCategories } from '@/data/categories';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { categoryType: string } }) {
  const category = categories.find((cat) => cat.id === params.categoryType);
  const subCategoryList = subCategories[params.categoryType] || [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{category?.name}</h2>
      <ul className="space-y-2">
        {subCategoryList.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`/${params.categoryType}/${sub.id}`}
              className="text-blue-500 hover:underline"
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
