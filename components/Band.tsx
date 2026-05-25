import Link from "next/link";
import Reveal from "./Reveal";
import { Icon } from "./IconSprite";

type Cta = { label: string; href: string; style?: "solid" | "ghost"; icon?: string };

export default function Band({ headlineHtml, ctas = [] }: { headlineHtml: string; ctas?: Cta[] }) {
  return (
    <section className="band">
      <div className="wrap">
        <Reveal>
          <h2 dangerouslySetInnerHTML={{ __html: headlineHtml }} />
          {ctas.length > 0 && (
            <div className="links">
              {ctas.map((c) => (
                <Link key={c.label} href={c.href} className={`btn ${c.style ?? "solid"}`}>
                  {c.label}
                  {c.icon && <Icon id={c.icon} />}
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
