import type { Metadata } from "next";
import { getPage, getSiteConfig } from "@/lib/content";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("contact");
  return {
    title: p?.title ?? "Contact",
    description: p?.description,
    alternates: { canonical: p?.canonicalPath ?? "/contact" },
    openGraph: {
      title: p?.ogTitle ?? p?.title,
      description: p?.ogDescription ?? p?.description,
      url: p?.canonicalPath ?? "/contact",
    },
  };
}

export default async function ContactPage() {
  const [p, cfg] = await Promise.all([getPage("contact"), getSiteConfig()]);
  if (!p) return null;
  const hero = p.hero ?? {};
  const contact = cfg?.contact ?? {};
  const availability = Array.isArray(cfg?.availability) ? cfg.availability : [];

  return (
    <>
      <header id="main" className="contactX">
        <div className="wrap">
          <Reveal className="pk">{hero.kicker}</Reveal>
          <Reveal as="h1" className="serif">
            <span dangerouslySetInnerHTML={{ __html: hero.titleHtml ?? hero.title ?? "" }} />
          </Reveal>
          <Reveal className="links">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="btn solid">
                {contact.email}
                <Icon id="ph-envelope-simple" />
              </a>
            )}
            {contact.linkedin && (
              <Link href={contact.linkedin} className="btn ghost" target="_blank" rel="noopener">
                LinkedIn
                <Icon id="ph-linkedin-logo" />
              </Link>
            )}
            {contact.github && (
              <Link href={contact.github} className="btn ghost" target="_blank" rel="noopener">
                GitHub
                <Icon id="ph-github-logo" />
              </Link>
            )}
            {contact.resume && contact.resume !== "#" && (
              <Link href={contact.resume} className="btn ghost" target="_blank" rel="noopener">
                Resume
                <Icon id="ph-file-text" />
              </Link>
            )}
          </Reveal>
          {availability.length > 0 && (
            <Reveal stagger className="avail">
              {availability.map(
                (a: { key: string; value: string; note: string }, i: number) => (
                  <div key={i} className="av">
                    <div className="k">{a.key}</div>
                    <div className="vv">{a.value}</div>
                    {a.note && <p>{a.note}</p>}
                  </div>
                )
              )}
            </Reveal>
          )}
        </div>
      </header>
    </>
  );
}
