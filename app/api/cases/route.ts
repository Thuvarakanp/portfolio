import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

export async function POST() {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const last = await prisma.caseStudy.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? 0) + 1;
  const created = await prisma.caseStudy.create({
    data: {
      order,
      industry: "Industry",
      context: "Context",
      role: "Role",
      badge: "Shipped",
      badgeIcon: "ph-check-circle",
      title: "New case study",
      projectName: `Project ${String(order).padStart(2, "0")} · …`,
      challenge: "",
      approach: "",
      triangleAction: "",
      outcomes: JSON.stringify([{ value: "", label: "" }]),
    },
  });
  return NextResponse.json(created);
}

export async function GET() {
  const blocked = await requireAdmin();
  if (blocked) return blocked;
  const list = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(list);
}
