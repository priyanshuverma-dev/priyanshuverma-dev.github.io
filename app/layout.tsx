import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "@/components/layout/main";
import { Analytics } from "@vercel/analytics/react";

import { M_PLUS_Rounded_1c } from "next/font/google";
const fonts = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["300", "700"],
  display: "swap",
});

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}
export const metadata: Metadata = {
  title: "Priyanshu Verma",
  description: "Priyanshu's homepage",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Priyanshu's homepage" />
        <meta name="author" content="Priyanshu Verma" />
        <meta name="author" content="craftzdog" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Priyanshu Verma" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@craftzdog" />
        <meta name="twitter:creator" content="@craftzdog" />
        <meta name="twitter:image" content="https://www.craftz.dog/card.png" />
        <meta property="og:site_name" content="Priyanshu Verma" />
        <meta name="og:title" content="Priyanshu Verma" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.craftz.dog/card.png" />
        <title>Priyanshu Verma - Homepage</title>
      </head> */}
      <body
        className={`${fonts.className} antialiased bg-[#f0e7db] dark:bg-[#202023]`}
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
