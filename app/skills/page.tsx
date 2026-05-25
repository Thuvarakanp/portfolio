import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import Band from "@/components/Band";
import TestRunner from "@/components/TestRunner";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("skills");
  return {
    title: p?.title ?? "Skills",
    description: p?.description,
    alternates: { canonical: p?.canonicalPath ?? "/skills" },
    openGraph: {
      title: p?.ogTitle ?? p?.title,
      description: p?.ogDescription ?? p?.description,
      url: p?.canonicalPath ?? "/skills",
    },
  };
}

export default async function SkillsPage() {
  const p = await getPage("skills");
  if (!p) return null;
  const hero = p.hero ?? {};
  const sections = p.sections ?? {};
  const runner = sections.runner;
  const toolkit = sections.toolkit;
  const specimen = sections.specimen;
  const band = sections.band;

  return (
    <>
      <PageHead kicker={hero.kicker} title={hero.title} ledeHtml={hero.lede} />

      {runner && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">01</span>
              <h2>Quality suite — runnable</h2>
              <span className="tag">Tap play</span>
            </Reveal>
            <Reveal>
              <TestRunner title={runner.title} subtitle={runner.subtitle} specs={runner.specs} />
            </Reveal>
          </div>
        </section>
      )}

      {toolkit && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{toolkit.number}</span>
              <h2>{toolkit.title}</h2>
              <span className="tag">{toolkit.tag}</span>
            </Reveal>
            <Reveal stagger className="tk">
              {toolkit.columns.map(
                (
                  c: { heading: string; items: { name: string; note: string }[] },
                  i: number
                ) => (
                  <div key={i} className="col">
                    <h4>{c.heading}</h4>
                    <ul>
                      {c.items.map((it, j) => (
                        <li key={j}>
                          <b>{it.name}</b>
                          <span>{it.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </Reveal>
          </div>
        </section>
      )}

      {specimen && (
        <section className="sec">
          <div className="wrap">
            <Reveal className="sh">
              <span className="no">{specimen.number}</span>
              <h2>{specimen.title}</h2>
              <span className="tag">{specimen.tag}</span>
            </Reveal>
            <Reveal className="doc">
              <div className="dt">
                <span className="id">
                  <svg className="i" aria-hidden="true">
                    <use href="#ph-warning" />
                  </svg>
                  {specimen.docId}
                </span>
                <span className="sv">
                  <svg className="i" aria-hidden="true">
                    <use href="#ph-check-circle" />
                  </svg>
                  {specimen.severity}
                </span>
              </div>
              <div className="db">
                <h3>{specimen.summary}</h3>
                <div className="env">{specimen.environment}</div>
                {specimen.rows.map(
                  (r: { label: string; value: string }, i: number) => (
                    <div key={i} className="r">
                      <div
                        className={`l ${r.label === "Expected" ? "exp" : r.label === "Actual" ? "act" : ""}`}
                      >
                        {r.label}
                      </div>
                      <div className="v" dangerouslySetInnerHTML={{ __html: r.value }} />
                    </div>
                  )
                )}
                <div className="nt" dangerouslySetInnerHTML={{ __html: specimen.note }} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {band && <Band headlineHtml={band.headline} ctas={band.ctas ?? []} />}
    </>
  );
}
