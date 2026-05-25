import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PagesIndex() {
  const pages = await prisma.page.findMany({ orderBy: { id: "asc" } });
  return (
    <div className="admin-wrap">
      <h1>Pages</h1>
      <p className="lede-sm">SEO meta, hero block and page-specific sections.</p>
      {pages.map((p) => (
        <div key={p.id} className="list-card">
          <div className="sub">{p.id}</div>
          <h4>{p.title}</h4>
          <p style={{ color: "var(--ink-3)", fontSize: ".88rem", marginTop: 6 }}>
            {p.description}
          </p>
          <div className="actions">
            <Link href={`/admin/pages/${p.id}`}>Edit</Link>
            {p.canonicalPath && (
              <Link href={p.canonicalPath} target="_blank" rel="noopener">
                View ↗
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
