// app/[categoria]/[subCategoria]/[nicho]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default function NichePage({
  params,
}: {
  params: { categoria: string; subCategoria: string; niche: string };
}) {
  return (
    <CategoryProductGrid
      category={params.categoria}
      subCategory={params.subCategoria}
      niche={params.niche}
    />
  );
}
