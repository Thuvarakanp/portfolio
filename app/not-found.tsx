import { getPage } from "@/lib/content";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import Reveal from "@/components/Reveal";

export default async function NotFound() {
  const p = await getPage("not-found");
  const hero = p?.hero ?? {
    kicker: "404 · Not found",
    title: "This test was skipped.",
    lede:
      "The page you were looking for doesn't exist — maybe it moved, maybe it was never written. <em>Let's get you somewhere useful.</em>",
    ctas: [
      { label: "Back to home", href: "/", style: "solid", icon: "ph-arrow-right" },
      { label: "Selected work", href: "/work", style: "ghost", icon: "ph-arrow-up-right" },
    ],
  };

  return (
    <header id="main" className="contactX">
      <div className="wrap">
        <Reveal className="pk">{hero.kicker}</Reveal>
        <Reveal as="h1" className="serif">
          {hero.title}
        </Reveal>
        {hero.lede && (
          <Reveal as="p" style={{ marginTop: 30, fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--ink-2)", maxWidth: "46ch", lineHeight: 1.5 }}>
            <span dangerouslySetInnerHTML={{ __html: hero.lede }} />
          </Reveal>
        )}
        {hero.ctas && (
          <Reveal className="links">
            {hero.ctas.map(
              (c: { label: string; href: string; style: string; icon?: string }) => (
                <Link key={c.label} href={c.href} className={`btn ${c.style}`}>
                  {c.label}
                  {c.icon && <Icon id={c.icon} />}
                </Link>
              )
            )}
          </Reveal>
        )}
      </div>
    </header>
  );
}
