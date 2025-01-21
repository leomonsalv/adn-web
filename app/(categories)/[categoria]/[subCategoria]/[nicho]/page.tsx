export default function NichePage({
  params,
}: {
  params: { categoryType: string; subCategory: string; niche: string };
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{params.niche}</h2>
      <p>
        Explore the best products in the <strong>{params.niche}</strong> niche under the{' '}
        <strong>{params.subCategory}</strong> subcategory of <strong>{params.categoryType}</strong>.
      </p>
    </div>
  );
}
