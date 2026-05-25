// Server component for the inner-page header (about/work/skills hero).
import Reveal from "./Reveal";

export default function PageHead({
  kicker,
  title,
  ledeHtml,
}: {
  kicker?: string | null;
  title: string;
  ledeHtml?: string | null;
}) {
  return (
    <header id="main" className="phead">
      <div className="wrap">
        {kicker && <Reveal className="pk">{kicker}</Reveal>}
        <Reveal as="h1" className="pt serif">
          {title}
        </Reveal>
        {ledeHtml && (
          <Reveal as="p" style={{ marginTop: 30 }}>
            <span dangerouslySetInnerHTML={{ __html: ledeHtml }} />
          </Reveal>
        )}
      </div>
    </header>
  );
}
