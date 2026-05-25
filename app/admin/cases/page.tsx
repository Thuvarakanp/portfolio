import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NewCaseButton from "./NewCaseButton";

export const dynamic = "force-dynamic";

export default async function CasesIndex() {
  const cases = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="admin-wrap">
      <h1>Case studies</h1>
      <p className="lede-sm">Articles on the Work page. Order is by ascending number.</p>
      {cases.map((c) => (
        <div key={c.id} className="list-card">
          <div className="sub">
            #{c.order} · {c.industry} · {c.badge}
          </div>
          <h4>{c.title}</h4>
          <div className="actions">
            <Link href={`/admin/cases/${c.id}`}>Edit</Link>
            <Link href="/work#" target="_blank" rel="noopener">
              View ↗
            </Link>
          </div>
        </div>
      ))}
      <NewCaseButton />
    </div>
  );
}
