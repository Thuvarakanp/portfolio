"use client";
import { useEffect, useRef } from "react";

/**
 * Wraps children with the .rv (reveal) or .stag (stagger) class and toggles
 * .in when the element enters the viewport. Mirrors the IntersectionObserver
 * logic from the original static site.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  stagger = false,
  children,
  style,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  stagger?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target.classList.contains("stag")) {
            const kids = e.target.children;
            for (let j = 0; j < kids.length; j++) {
              (kids[j] as HTMLElement).style.transitionDelay = `${j * 0.05}s`;
            }
          }
          e.target.classList.add("in");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = `${stagger ? "stag" : "rv"} ${className}`.trim();
  const TagAny = Tag as React.ElementType;
  return (
    <TagAny ref={ref as React.Ref<HTMLElement>} className={cls} style={style}>
      {children}
    </TagAny>
  );
}
