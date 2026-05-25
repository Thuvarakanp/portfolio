import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageEditor from "./PageEditor";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();
  return <PageEditor page={page} />;
}
