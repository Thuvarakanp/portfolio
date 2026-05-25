import { prisma } from "@/lib/prisma";
import SiteEditor from "./SiteEditor";

export const dynamic = "force-dynamic";

export default async function SitePage() {
  let cfg = await prisma.siteConfig.findUnique({ where: { id: "singleton" } });
  if (!cfg) {
    cfg = await prisma.siteConfig.create({
      data: {
        id: "singleton",
        siteName: "Thuvarakan",
        siteTagline: "QA",
        status: "Open to roles",
        copyright: "",
        footerCredit: "",
        contact: "{}",
        availability: "[]",
        ogImage: "/og-image.png",
        themeColor: "#F6F4EF",
      },
    });
  }
  return <SiteEditor cfg={cfg} />;
}
