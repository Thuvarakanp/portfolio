import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

const schema = z.object({
  order: z.number().int(),
  slot: z.string().min(1),
  src: z.string().min(1),
  alt: z.string(),
  label: z.string(),
  title: z.string(),
  reference: z.string(),
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

  const existingAtOrder = await prisma.galleryItem.findUnique({
    where: { order: parsed.data.order },
  });
  if (existingAtOrder && existingAtOrder.id !== id) {
    const current = await prisma.galleryItem.findUnique({ where: { id } });
    if (current) {
      await prisma.galleryItem.update({
        where: { id: existingAtOrder.id },
        data: { order: current.order },
      });
    }
  }

  const updated = await prisma.galleryItem.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const { id } = await params;
  await prisma.galleryItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
