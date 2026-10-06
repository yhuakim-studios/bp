import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { WaFab } from "@/components/WaFab";
import { branches, site, waLink } from "@/lib/site";

// Archivo (variable, wide 125%) matches the raised letters on the shop sign; Instrument Sans for reading;
// IBM Plex Mono for label and receipt details; Doto for the LED strip.
const display = localFont({
  src: "./fonts/archivo-variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const body = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/instrument-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/instrument-sans-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/instrument-sans-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-mono",
  display: "swap",
});
const led = localFont({ src: "./fonts/doto-latin-900-normal.woff2", weight: "900", variable: "--font-led", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bakay Pharmacy — Trusted Pharmacy in Nsukka & Enugu | Open 24/7",
    template: "%s | Bakay Pharmacy",
  },
  description:
    "Bakay Pharmacy & Store: pharmacist-owned community pharmacy in Nsukka (Odenigbo Road, Fen Park) and Enugu (Nike Lake Road). Genuine medicines, prescriptions, health checks and WhatsApp ordering. Open 24 hours, 7 days a week.",
  keywords: ["pharmacy Nsukka", "pharmacy near UNN", "pharmacy Enugu", "Nike Lake Road pharmacy", "Bakay Pharmacy"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Bakay Pharmacy",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

// One Pharmacy entity per branch for Google local results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": branches.map((b) => ({
    "@type": "Pharmacy",
    "@id": `${site.url}/branches#${b.id}`,
    name: `Bakay Pharmacy — ${b.area}`,
    url: `${site.url}/branches#${b.id}`,
    telephone: b.phone,
    parentOrganization: { "@type": "Organization", name: site.legalName },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.city,
      addressRegion: `${b.state} State`,
      addressCountry: "NG",
    },
    ...(b.geo ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        // schema.org convention for 24-hour opening
        opens: "00:00",
        closes: "23:59",
      },
    ],
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${display.variable} ${body.variable} ${mono.variable} ${led.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
        <WaFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
