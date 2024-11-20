import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CounterStoreProvider } from "@/providers/counter-store-provider";
import "./globals.css";
import { NavLinks } from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

// const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Adan En Línea",
  description: "Ahora usamos next 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavLinks />
        {/* TODO: DECIDAMOS QUE FUENTE VAMOS A UTILIZAR <body className={inter.className}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CounterStoreProvider>{children}</CounterStoreProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
