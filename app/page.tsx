import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Band from "@/components/Band";
import { Icon } from "@/components/IconSprite";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("home");
  return {
    title: p?.title ?? "Thuvarakan",
    description: p?.description,
    alternates: { canonical: p?.canonicalPath ?? "/" },
    openGraph: {
      title: p?.ogTitle ?? p?.title,
      description: p?.ogDescription ?? p?.description,
      url: p?.canonicalPath ?? "/",
    },
  };
}

export default async function Home() {
  const page = await getPage("home");
  if (!page) return null;
  const hero = page.hero ?? {};
  const sections = page.sections ?? {};
  const traj = sections.trajectory;
  const tri = sections.triangle;
  const band = sections.band;

  return (
    <>
      <Hero
        indexBits={hero.indexBits ?? []}
        lines={hero.lines ?? []}
        ledeHtml={hero.lede}
        ctas={hero.ctas ?? []}
      />

      {traj && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{traj.number}</span>
              <h2>{traj.title}</h2>
              <span className="tag">{traj.tag}</span>
            </Reveal>
            <Reveal stagger className="pipe">
              {traj.stages.map((s: { status: string; tickIcon: string; tickLabel: string; title: string; years: string; body: string }, i: number) => (
                <div key={i} className={`stg ${s.status}`}>
                  <div className="tick">
                    <svg className={`i ${s.tickIcon === "ph-circle-notch" ? "spin" : ""}`} aria-hidden="true">
                      <use href={`#${s.tickIcon}`} />
                    </svg>
                    {s.tickLabel}
                  </div>
                  <h3 className="serif">{s.title}</h3>
                  <div className="yr">{s.years}</div>
                  <p>{s.body}</p>
                </div>
              ))}
            </Reveal>
            <Reveal as="p" className="pipe-note">
              <span dangerouslySetInnerHTML={{ __html: traj.note }} />
            </Reveal>
            {traj.cta && (
              <Reveal style={{ marginTop: 46, textAlign: "center" }}>
                <Link href={traj.cta.href} className={`btn ${traj.cta.style}`}>
                  {traj.cta.label}
                  {traj.cta.icon && <Icon id={traj.cta.icon} />}
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {tri && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{tri.number}</span>
              <h2>{tri.title}</h2>
              <span className="tag">{tri.tag}</span>
            </Reveal>
            <Reveal stagger className="qg">
              {tri.quadrants.map((q: { src: string; title: string; body: string }, i: number) => (
                <div key={i} className="q">
                  <span className="src">{q.src}</span>
                  <h3 className="serif">{q.title}</h3>
                  <p>{q.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {band && <Band headlineHtml={band.headline} ctas={band.ctas ?? []} />}
    </>
  );
}
