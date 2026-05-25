import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CaseEditor from "./CaseEditor";

export const dynamic = "force-dynamic";

export default async function EditCase({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await prisma.caseStudy.findUnique({ where: { id } });
  if (!c) notFound();
  return <CaseEditor caseStudy={c} />;
}
