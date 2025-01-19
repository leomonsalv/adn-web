export default function CategoryLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { categoria: string };
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Category: {params.categoria}</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
