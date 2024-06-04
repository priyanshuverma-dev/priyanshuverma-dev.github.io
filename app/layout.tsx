import Header from "@/components/header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Priyanshu | Personal Portfolio",
  description: "Priyanshu is a full-stack developer.",
  keywords: [
    "Portfolio website",
    "who is Priyanshu Verma",
    "web developer",
    "Priyanshu",
    " Priyanshu Verma",
    "P7uverma",
    "p7utech",
    "p7u",
  ],
  metadataBase: new URL("https://p7u.tech"),
  robots: {
    index: true,
    follow: true,
  },
  authors: {
    name: "Priyanshu Verma",
  },
  openGraph: {
    title: "Priyanshu | Personal Portfolio",
    siteName: "Priyanshu | The Portfolio Website",
    url: "https://p7u.tech",
    description:
      "Hi, I am Priyanshu Verma The Developer. This is my projects portfolio website where you can see my progress and achievements..",
    type: "website",
    countryName: "India",
    emails: ["hello@p7u.tech"],
    determiner: "auto",
    images: ["https://p7u.tech/image-portfolio.png"],
  },
  publisher: "Priyanshu",
  twitter: {
    description:
      "Hi, I am Priyanshu Verma The Developer. This is my projects portfolio website where you can see my progress and achievements..",
    images: ["https://p7u.tech/image-portfolio.png"],
    site: "https://p7u.tech",
    title: "Priyanshu | Personal Portfolio",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
