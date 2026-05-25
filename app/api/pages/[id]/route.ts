import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  canonicalPath: z.string().nullable().optional(),
  hero: z.string(),
  sections: z.string(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const { id } = await params;
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // Make sure JSON columns are actually JSON.
  try {
    JSON.parse(parsed.data.hero);
    JSON.parse(parsed.data.sections);
  } catch (e) {
    return NextResponse.json({ error: `Invalid JSON: ${(e as Error).message}` }, { status: 400 });
  }
  const page = await prisma.page.update({ where: { id }, data: parsed.data });
  return NextResponse.json(page);
}
