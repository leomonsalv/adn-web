// app/[categoria]/[subCategoria]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default async function SubCategoryPage(props: {
  params: Promise<{ categoria: string; subCategoria: string }>;
}) {
  const params = await props.params;
  return (
    <CategoryProductGrid
      category={params.categoria}
      subCategory={params.subCategoria}
      niche={null}
    />
  );
}
