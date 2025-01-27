// app/[categoria]/[subCategoria]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default function SubCategoryPage({
  params,
}: {
  params: { categoria: string; subCategoria: string };
}) {
  return (
    <CategoryProductGrid
      category={params.categoria}
      subCategory={params.subCategoria}
      niche={null}
    />
  );
}
