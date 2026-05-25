import { prisma } from "@/lib/prisma";
import GalleryEditor from "./GalleryEditor";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return <GalleryEditor items={items} />;
}
