// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const xml = `# =======================================
# robots.txt para https://www.adan.life
# Última actualización: 2025-05-23
# =======================================

# ---------------------------------------
# Reglas generales para todos los bots
# ---------------------------------------
User-agent: *
Disallow: /checkout*
Disallow: /carrito*
Disallow: /my-account*
Disallow: /buscar*
Disallow: /busqueda*
Disallow: /404
Disallow: /gracias*
Disallow: /?s=


# Permitir recursos necesarios
Allow: /*.js$
Allow: /*.css$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.gif$
Allow: /*.svg$
Allow: /*.webp$

# ---------------------------------------
# Bloqueo de parámetros para evitar duplicados
# (Solo si no necesitas indexar URLs con parámetros)
# ---------------------------------------
Disallow: /*?*

# ---------------------------------------
# Bloqueo de bots agresivos y scrapers conocidos
# ---------------------------------------
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: Scrapy
Disallow: /

User-agent: Scrapy 2.7.1
Disallow: /

User-agent: Scrapy 2.8.0
Disallow: /

# ---------------------------------------
# Sitemaps del sitio
# ---------------------------------------
Sitemap: https://www.adan.life/sitemap.xml
Sitemap: https://www.adan.life/page-sitemap.xml
Sitemap: https://www.adan.life/category-sitemap.xml
Sitemap: https://www.adan.life/product-sitemap.xml`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
