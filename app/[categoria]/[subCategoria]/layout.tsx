export default function SubCategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categoria: string; subCategoria: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">
          {params.categoria} &nbsp;
          {'>'} &nbsp;
          {params.subCategoria}
        </h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
