import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

export async function POST() {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const last = await prisma.galleryItem.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? 0) + 1;
  const slot = ["a", "b", "c", "d", "e", "f"][(order - 1) % 6];
  const created = await prisma.galleryItem.create({
    data: {
      order,
      slot,
      src: `https://picsum.photos/seed/new-${order}/1200/720`,
      alt: "Describe what this image shows for screen readers.",
      label: "Label",
      title: "Title",
      reference: "Reference",
    },
  });
  return NextResponse.json(created);
}
