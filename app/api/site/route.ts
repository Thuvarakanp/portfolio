import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

const schema = z.object({
  siteName: z.string(),
  siteTagline: z.string(),
  status: z.string(),
  copyright: z.string(),
  footerCredit: z.string(),
  contact: z.string(),
  availability: z.string(),
  ogImage: z.string(),
  themeColor: z.string(),
});

export async function PATCH(req: Request) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try {
    JSON.parse(parsed.data.contact);
    JSON.parse(parsed.data.availability);
  } catch (e) {
    return NextResponse.json({ error: `Invalid JSON: ${(e as Error).message}` }, { status: 400 });
  }
  const updated = await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: { id: "singleton", ...parsed.data },
  });
  return NextResponse.json(updated);
}
