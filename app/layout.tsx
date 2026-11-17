import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { site } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-source-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.home.metaTitle,
    template: `%s | ${site.school.name}`,
  },
  description: site.school.description,
  applicationName: site.school.name,
  keywords: [
    "Florida real estate school",
    "REIB Institute",
    "FREC courses",
    "real estate pre-license",
    "continuing education Florida",
    "professional development",
    "international business education",
    site.school.city,
  ],
  authors: [{ name: site.school.name }],
  creator: site.school.name,
  publisher: site.school.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.school.name,
    title: site.home.metaTitle,
    description: site.school.description,
    images: [
      {
        url: site.home.heroImage,
        alt: site.home.heroImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.home.metaTitle,
    description: site.school.description,
    images: [site.home.heroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.school.name,
  alternateName: site.school.shortName,
  url: siteUrl,
  description: site.school.description,
  ...(site.school.email ? { email: site.school.email } : {}),
  telephone: site.school.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.school.city,
    addressRegion: "FL",
    addressCountry: "US",
  },
  logo: absoluteUrl(site.school.logoSrc),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-base text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#content"
          className="absolute left-4 top-4 z-50 -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink focus:translate-y-0"
        >
          {site.ui.skipToContent}
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
