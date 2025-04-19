import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import SchemaOrg from "@/components/SchemaOrg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tecserim.com'),
  title: {
    default: "TECSERIM Sarl | Refrigeration and Air Conditioning Solutions",
    template: "%s | TECSERIM Sarl"
  },
  description: "TECSERIM offers installation, configuration, and commissioning of CAREL components for refrigeration and air conditioning systems, including programmable controllers, supervision systems, sensors, and more.",
  keywords: ["refrigeration", "air conditioning", "HVAC", "CAREL", "Morocco", "cooling solutions", "climate control"],
  authors: [{ name: "TECSERIM Sarl" }],
  creator: "TECSERIM Sarl",
  publisher: "TECSERIM Sarl",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    title: "TECSERIM Sarl | Refrigeration and Air Conditioning Solutions",
    description: "TECSERIM offers installation, configuration, and commissioning of CAREL components for refrigeration and air conditioning systems.",
    siteName: "TECSERIM Sarl",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TECSERIM Sarl - Climate Control Solutions",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TECSERIM Sarl | Climate Control Experts",
    description: "Professional refrigeration and air conditioning solutions across Morocco",
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <WhatsAppButton />
          <SchemaOrg />
        </LanguageProvider>
      </body>
    </html>
  );
}
