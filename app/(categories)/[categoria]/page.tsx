// app/[categoria]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default function CategoryPage({ params }: { params: { categoria: string } }) {
  return <CategoryProductGrid category={params.categoria} subCategory={null} niche={null} />;
}
