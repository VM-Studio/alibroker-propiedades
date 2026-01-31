import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";
import GoogleTag from "./components/GoogleTag";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d306c",
};

export const metadata: Metadata = {
  title: "Exclusiva Casa en Altos de Campo Grande | Ali Broker",
  description: "Descubre esta excepcional propiedad de 510m² cubiertos sobre 1600m² de terreno. Sistema Béton Brut, 4 dormitorios, piscina 12x5, sauna, gimnasio y ático. Una obra arquitectónica única en Altos de Campo Grande.",
  keywords: ["casa en venta", "Altos de Campo Grande", "propiedad exclusiva", "inmobiliaria", "béton brut", "casa con piscina"],
  authors: [{ name: "Ali Broker" }],
  creator: "Ali Broker",
  publisher: "Ali Broker",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://alibroker.com",
    title: "Exclusiva Casa en Altos de Campo Grande | Ali Broker",
    description: "Propiedad de 510m² cubiertos sobre 1600m² de terreno. Sistema Béton Brut, piscina 12x5, sauna, gimnasio y ático.",
    siteName: "Ali Broker",
    images: [
      {
        url: "/casa1.png",
        width: 1200,
        height: 630,
        alt: "Casa exclusiva en Altos de Campo Grande",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusiva Casa en Altos de Campo Grande",
    description: "510m² cubiertos, sistema Béton Brut, piscina, sauna y más.",
    images: ["/casa1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect a recursos externos */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <GoogleTag />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}