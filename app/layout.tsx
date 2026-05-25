import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tweens.dev",
  description: "A collection of web animations built with React and plain CSS. Copy and drop into any project.",
  metadataBase: new URL("https://tweens.dev"),
  alternates: {
    canonical: "https://tweens.dev",
  },
  openGraph: {
    title: "tweens.dev",
    description: "A collection of web animations built with React and plain CSS. Copy and drop into any project.",
    url: "https://tweens.dev",
    siteName: "tweens.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tweens.dev",
    description: "A collection of web animations built with React and plain CSS. Copy and drop into any project.",
    creator: "@rcuffdev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
