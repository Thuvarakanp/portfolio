import { prisma } from "./prisma";

export async function getPage(id: string) {
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return null;
  return {
    ...page,
    hero: safeParse(page.hero),
    sections: safeParse(page.sections),
  };
}

export async function getSiteConfig() {
  const c = await prisma.siteConfig.findUnique({ where: { id: "singleton" } });
  if (!c) return null;
  return {
    ...c,
    contact: safeParse(c.contact),
    availability: safeParse(c.availability),
  };
}

export async function getNav() {
  return prisma.navItem.findMany({ orderBy: { order: "asc" } });
}

export async function getCaseStudies() {
  const list = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });
  return list.map((c) => ({ ...c, outcomes: safeParse(c.outcomes) }));
}

export async function getGallery() {
  return prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeParse(s: string | null | undefined): any {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
