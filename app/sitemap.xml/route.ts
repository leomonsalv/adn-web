// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <sitemap>
      <loc>https://www.adan.life/page-sitemap/sitemap.xml</loc>
      <lastmod>2025-05-26</lastmod>
   </sitemap>
   <sitemap>
      <loc>https://www.adan.life/category-sitemap/sitemap.xml</loc>
      <lastmod>2025-05-26</lastmod>
   </sitemap>
   <sitemap>
      <loc>https://www.adan.life/product-sitemap/sitemap.xml</loc>
      <lastmod>2025-05-26</lastmod>
   </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
