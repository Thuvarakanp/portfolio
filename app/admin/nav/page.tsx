import { prisma } from "@/lib/prisma";
import NavEditor from "./NavEditor";

export const dynamic = "force-dynamic";

export default async function NavPage() {
  const items = await prisma.navItem.findMany({ orderBy: { order: "asc" } });
  return <NavEditor items={items} />;
}
