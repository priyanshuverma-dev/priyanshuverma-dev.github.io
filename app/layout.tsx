import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "@/components/layout/main";
import { Analytics } from "@vercel/analytics/react";

import localFont from "next/font/local";

const font_300 = localFont({
  src: "./fonts/font-300.ttf",
  weight: "300",
  display: "swap",
});
const font_700 = localFont({
  src: "./fonts/font-700.ttf",
  weight: "300",
  display: "swap",
});

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}
export const metadata: Metadata = {
  title: "Priyanshu Verma",
  description: "Priyanshu's homepage",
  authors: {
    name: "Priyanshu Verma",
    url: "https://priyanshu-verma.vercel.app",
  },
  openGraph: {
    type: "website",
    title: "Priyanshu Verma",
    images: "https://priyanshu-verma.vercel.app/card.png",
    description: "Priyanshu's homepage",
  },
  twitter: {
    creator: "@pvdev",
    site: "@pvdev",
    title: "Priyanshu Verma",
    images: "https://priyanshu-verma.vercel.app/card.png",
    description: "Priyanshu's homepage",
    card: "summary_large_image",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font_300.className} ${font_700.className}  antialiased bg-[#f0e7db] dark:bg-[#202023]`}
      >
        <Providers>
          <Layout>
            {children}
            <Analytics />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
