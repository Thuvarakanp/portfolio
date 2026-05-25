import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Band from "@/components/Band";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("about");
  return {
    title: p?.title ?? "About",
    description: p?.description,
    alternates: { canonical: p?.canonicalPath ?? "/about" },
    openGraph: {
      title: p?.ogTitle ?? p?.title,
      description: p?.ogDescription ?? p?.description,
      url: p?.canonicalPath ?? "/about",
    },
  };
}

export default async function AboutPage() {
  const p = await getPage("about");
  if (!p) return null;
  const hero = p.hero ?? {};
  const sections = p.sections ?? {};
  const story = sections.story;
  const band = sections.band;

  return (
    <>
      <PageHead kicker={hero.kicker} title={hero.title} ledeHtml={hero.lede} />

      {story && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{story.number}</span>
              <h2>{story.title}</h2>
              <span className="tag">{story.tag}</span>
            </Reveal>
            <div className="edit">
              <Reveal>
                <p className="lead" dangerouslySetInnerHTML={{ __html: story.lead }} />
                {story.paragraphs?.map((p: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </Reveal>
              <Reveal className="matrix">
                {story.matrix?.map(
                  (m: { key: string; value: string; icon: string }, i: number) => (
                    <div key={i} className="mr">
                      <div className="mk">
                        <svg className="i" aria-hidden="true">
                          <use href={`#${m.icon}`} />
                        </svg>
                        {m.key}
                      </div>
                      <div className="mv" dangerouslySetInnerHTML={{ __html: m.value }} />
                    </div>
                  )
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {band && <Band headlineHtml={band.headline} ctas={band.ctas ?? []} />}
    </>
  );
}
