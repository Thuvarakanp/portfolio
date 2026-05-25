import type { Metadata } from "next";
import { getPage, getCaseStudies, getGallery } from "@/lib/content";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Band from "@/components/Band";
import Counter from "@/components/Counter";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("work");
  return {
    title: p?.title ?? "Work",
    description: p?.description,
    alternates: { canonical: p?.canonicalPath ?? "/work" },
    openGraph: {
      title: p?.ogTitle ?? p?.title,
      description: p?.ogDescription ?? p?.description,
      url: p?.canonicalPath ?? "/work",
    },
  };
}

export default async function WorkPage() {
  const [p, cases, gallery] = await Promise.all([
    getPage("work"),
    getCaseStudies(),
    getGallery(),
  ]);
  if (!p) return null;
  const hero = p.hero ?? {};
  const sections = p.sections ?? {};
  const nums = sections.nums;
  const band = sections.band;

  return (
    <>
      <PageHead kicker={hero.kicker} title={hero.title} ledeHtml={hero.lede} />

      <section className="sec">
        <div className="wrap">
          <Reveal className="sh">
            <span className="no">01</span>
            <h2>Case studies</h2>
            <span className="tag">Context · approach · outcome</span>
          </Reveal>
          {cases.map((c) => (
            <Reveal key={c.id} as="article" className="case">
              <div className="meta-col">
                <div className="row">
                  <span className="k">Industry</span>
                  <span className="v">{c.industry}</span>
                </div>
                <div className="row">
                  <span className="k">Context</span>
                  <span className="v">{c.context}</span>
                </div>
                <div className="row">
                  <span className="k">Role</span>
                  <span className="v">{c.role}</span>
                </div>
                <span className="badge">
                  <svg className="i" aria-hidden="true">
                    <use href={`#${c.badgeIcon}`} />
                  </svg>
                  {c.badge}
                </span>
              </div>
              <div>
                <h3 className="serif">{c.title}</h3>
                <div className="pn">{c.projectName}</div>
                <div className="fld">
                  <div className="l">Challenge</div>
                  <p>{c.challenge}</p>
                </div>
                <div className="fld">
                  <div className="l">Approach</div>
                  <p>{c.approach}</p>
                </div>
                <div className="fld">
                  <div className="l">The triangle in action</div>
                  <p className="hi">{c.triangleAction}</p>
                </div>
                <div className="out">
                  {Array.isArray(c.outcomes) &&
                    c.outcomes.map(
                      (o: { value: string; label: string }, i: number) => (
                        <div key={i}>
                          <div className="big serif">{o.value}</div>
                          <div className="lbl">{o.label}</div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">02</span>
              <h2>Visual evidence</h2>
              <span className="tag">Field artifacts · sample</span>
            </Reveal>
            <Reveal stagger className="gal">
              {gallery.map((g) => (
                <figure key={g.id} className={`it ${g.slot}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                  <figcaption className="cap">
                    <div>
                      <span className="lbl">{g.label}</span>
                      <b>{g.title}</b>
                    </div>
                    <span className="yr">{g.reference}</span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
            <Reveal as="p" className="gal-note">
              Placeholder imagery · swap with real captures
            </Reveal>
          </div>
        </section>
      )}

      {nums && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{nums.number}</span>
              <h2>{nums.title}</h2>
              <span className="tag">{nums.tag}</span>
            </Reveal>
            <Reveal stagger className="nums">
              {nums.items.map(
                (
                  n: { prefix: string; value: number; suffix: string; label: string },
                  i: number
                ) => (
                  <div key={i} className="n">
                    <div className="v">
                      {n.prefix && <u>{n.prefix}</u>}
                      <Counter to={n.value} />
                      {n.suffix && <u>{n.suffix}</u>}
                    </div>
                    <div className="l" dangerouslySetInnerHTML={{ __html: n.label }} />
                  </div>
                )
              )}
            </Reveal>
          </div>
        </section>
      )}

      {band && <Band headlineHtml={band.headline} ctas={band.ctas ?? []} />}
    </>
  );
}
