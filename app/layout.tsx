import "./globals.css";
import type { Metadata, Viewport } from "next";
import { getSiteConfig, getNav } from "@/lib/content";
import IconSprite from "@/components/IconSprite";
import Bar from "@/components/Bar";
import Footer from "@/components/Footer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getSiteConfig();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${cfg?.siteName ?? "Thuvarakan"} — QA`, template: "%s" },
    description: "Designer · Developer · QA",
    icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
    openGraph: {
      type: "website",
      siteName: `${cfg?.siteName ?? "Thuvarakan"} - QA`,
      images: [{ url: cfg?.ogImage ?? "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [cfg?.ogImage ?? "/og-image.png"] },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const cfg = await getSiteConfig();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: cfg?.themeColor ?? "#F6F4EF",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [cfg, nav] = await Promise.all([getSiteConfig(), getNav()]);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Instrument+Sans:wght@400;500;600&family=Spline+Sans+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <IconSprite />
        <Bar
          siteName={cfg?.siteName ?? "Thuvarakan"}
          siteTagline={cfg?.siteTagline ?? "QA"}
          status={cfg?.status ?? "Open to roles"}
          nav={nav.map((n) => ({ id: n.id, label: n.label, href: n.href }))}
        />
        {children}
        <Footer
          copyright={cfg?.copyright ?? "© 2026 Thuvarakan"}
          credit={cfg?.footerCredit ?? ""}
        />
      </body>
    </html>
  );
}
