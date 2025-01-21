export default function NicheLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categoria: string; subCategoria: string; nicho: string };
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-lg font-bold">
          {params.categoria} {'> '} &nbsp;
          {params.subCategoria} {'>'} &nbsp;
          {params.nicho}
        </h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
