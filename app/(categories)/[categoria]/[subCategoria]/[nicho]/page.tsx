// app/[categoria]/[subCategoria]/[nicho]/page.tsx

import CategoryProductGrid from '@/components/categorias/categoryProductGrid';

export default async function NichePage(props: {
  params: Promise<{ categoria: string; subCategoria: string; niche: string }>;
}) {
  const params = await props.params;
  return (
    <CategoryProductGrid
      category={params.categoria}
      subCategory={params.subCategoria}
      niche={params.niche}
    />
  );
}
