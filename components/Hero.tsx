"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./IconSprite";

type HeroLine = { text: string; className?: string; strike?: boolean };
type Cta = { label: string; href: string; style?: "solid" | "ghost"; icon?: string };

export default function Hero({
  indexBits = [],
  lines = [],
  ledeHtml,
  ctas = [],
}: {
  indexBits?: string[];
  lines?: HeroLine[];
  ledeHtml?: string;
  ctas?: Cta[];
}) {
  const [ixShow, setIxShow] = useState(false);
  const [shownLines, setShownLines] = useState<number[]>([]);
  const [cut, setCut] = useState(false);
  const [ledeIn, setLedeIn] = useState(false);
  const [cueIn, setCueIn] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const ledeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (rm) {
      setIxShow(true);
      setShownLines(lines.map((_, i) => i));
      setCut(true);
      setLedeIn(true);
      setCueIn(true);
      return;
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setIxShow(true), 180));
    lines.forEach((_, k) => {
      timers.push(
        window.setTimeout(() => setShownLines((s) => [...s, k]), 340 + k * 150)
      );
    });
    timers.push(window.setTimeout(() => setCut(true), 340 + lines.length * 150 + 250));
    timers.push(window.setTimeout(() => setLedeIn(true), 340 + lines.length * 150 + 120));
    timers.push(window.setTimeout(() => setCueIn(true), 340 + lines.length * 150 + 360));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [lines]);

  // Parallax on the hero on scroll (skip on mobile / reduced motion).
  useEffect(() => {
    if (window.innerWidth <= 760) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 900 && h1Ref.current) {
          h1Ref.current.style.transform = `translateY(${y * 0.12}px)`;
          if (ledeRef.current) ledeRef.current.style.transform = `translateY(${y * -0.05}px)`;
        }
        tick = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="main" className="hero">
      <div className="wrap">
        <div className={`ix${ixShow ? " show" : ""}`}>
          {indexBits.map((b, i) => (
            <span key={i}>{b}</span>
          ))}
        </div>
        <h1 ref={h1Ref}>
          {lines.map((l, i) => (
            <span key={i} className={`h-line${shownLines.includes(i) ? " show" : ""}`}>
              {l.strike ? (
                <span className="in">
                  <span className={`c${cut ? " cut" : ""}`}>{l.text}</span>
                </span>
              ) : (
                <span className={`in ${l.className ?? ""}`}>{l.text}</span>
              )}
            </span>
          ))}
        </h1>
        <div className="hero-foot">
          <div>
            {ledeHtml && (
              <p
                ref={ledeRef}
                className={`lede${ledeIn ? " in" : ""}`}
                dangerouslySetInnerHTML={{ __html: ledeHtml }}
              />
            )}
            {ctas.length > 0 && (
              <div className={`heroctas${cueIn ? " in" : ""}`}>
                {ctas.map((c) => (
                  <Link key={c.label} href={c.href} className={`btn ${c.style ?? "solid"}`}>
                    {c.label}
                    {c.icon && <Icon id={c.icon} />}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={`scrollcue rv${cueIn ? " in" : ""}`}>
            <span>Scroll</span>
            <Icon id="ph-arrow-down" />
          </div>
        </div>
      </div>
    </header>
  );
}
