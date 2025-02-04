// app/[categoria]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default async function CategoryPage(props: { params: Promise<{ categoria: string }> }) {
  const params = await props.params;
  return <CategoryProductGrid category={params.categoria} subCategory={null} niche={null} />;
}
