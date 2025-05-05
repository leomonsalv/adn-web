import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { NavLinks } from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer/index';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryProvider } from '@/providers/react-query-provider';
// import { Inter } from "next/font/google";
import { AuthProvider } from '@/providers/auth-provider';
import Script from 'next/script';

// const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Adan En Línea | Tu vida tu flow',
  description: 'Traemos bienestar a tu hogar. Productos que mejoran tu día a día.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - Head */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ReactQueryProvider>
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
              strategy="lazyOnload"
            />
            {/* Facebook Pixel */}
            {FB_PIXEL_ID && (
              <>
                <Script
                  id="fb-pixel"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      !function(f,b,e,v,n,t,s)
                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                      n.queue=[];t=b.createElement(e);t.async=!0;
                      n.src=v;s=b.getElementsByTagName(e)[0];
                      s.parentNode.insertBefore(t,s)}(window, document,'script',
                      'https://connect.facebook.net/en_US/fbevents.js');
                      fbq('init', '${FB_PIXEL_ID}');
                      fbq('track', 'PageView');
                    `,
                  }}
                />
                <noscript>
                  <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                  />
                </noscript>
              </>
            )}
            {/* Google Tag Manager - NoScript */}
            {GTM_ID && (
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            )}
            <Toaster />
            <NavLinks />
            <ThemeProvider
              forcedTheme="light"
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <CounterStoreProvider>{children}</CounterStoreProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
