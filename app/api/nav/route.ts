import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

const schema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
      label: z.string().min(1),
      href: z.string().min(1),
    })
  ),
});

export async function PUT(req: Request) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Wipe and re-insert — simplest way to handle arbitrary deletes / reorders / additions
  // without juggling unique-order conflicts mid-transaction.
  await prisma.$transaction([
    prisma.navItem.deleteMany(),
    ...parsed.data.items.map((it) =>
      prisma.navItem.create({
        data: { order: it.order, label: it.label, href: it.href },
      })
    ),
  ]);
  const items = await prisma.navItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ items });
}
