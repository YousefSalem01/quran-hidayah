import type { Metadata } from "next";
import { Changa, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../components/i18n/I18nProvider";

const arabicFont = Changa({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const latinFont = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran Academy",
  description:
    "Learn Quran, Tajweed, Arabic and Islamic studies online with certified native Arabic teachers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${arabicFont.variable} ${latinFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

