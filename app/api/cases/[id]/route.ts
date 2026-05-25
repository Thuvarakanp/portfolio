import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

const schema = z.object({
  order: z.number().int(),
  industry: z.string(),
  context: z.string(),
  role: z.string(),
  badge: z.string(),
  badgeIcon: z.string(),
  title: z.string().min(1),
  projectName: z.string(),
  challenge: z.string(),
  approach: z.string(),
  triangleAction: z.string(),
  outcomes: z.string(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try {
    JSON.parse(parsed.data.outcomes);
  } catch (e) {
    return NextResponse.json({ error: `Outcomes JSON: ${(e as Error).message}` }, { status: 400 });
  }
  // If order changed and conflicts, swap with the existing holder.
  const existingAtOrder = await prisma.caseStudy.findUnique({
    where: { order: parsed.data.order },
  });
  if (existingAtOrder && existingAtOrder.id !== id) {
    const current = await prisma.caseStudy.findUnique({ where: { id } });
    if (current) {
      await prisma.caseStudy.update({
        where: { id: existingAtOrder.id },
        data: { order: current.order },
      });
    }
  }
  const updated = await prisma.caseStudy.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const { id } = await params;
  await prisma.caseStudy.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
