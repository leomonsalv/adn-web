import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { NavLinks } from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
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
  title: 'Adan En Línea',
  description: 'Ahora usamos next 15',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="lazyOnload"
          />
          <Toaster />
          <NavLinks />

          <AuthProvider>
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
          </AuthProvider>
        </ReactQueryProvider>
        <Footer />
      </body>
    </html>
  );
}
