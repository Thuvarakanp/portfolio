"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./IconSprite";

type Nav = { id: string; label: string; href: string };

export default function Bar({
  siteName,
  siteTagline,
  status,
  nav,
}: {
  siteName: string;
  siteTagline: string;
  status: string;
  nav: Nav[];
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    setReady(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <div className={`bar${ready ? " ready" : ""}${scrolled ? " scrolled" : ""}`}>
      <div className="nm">
        <Link href="/">
          {siteName} <i>— {siteTagline}</i>
        </Link>
      </div>
      <nav>
        {nav.map((n) => (
          <Link key={n.id} href={n.href} className={isActive(n.href) ? "active" : ""}>
            {n.label}
          </Link>
        ))}
        <span className="st">
          <Icon id="ph-broadcast" />
          {status}
        </span>
      </nav>
    </div>
  );
}
