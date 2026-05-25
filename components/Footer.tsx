"use client";
import { usePathname } from "next/navigation";

export default function Footer({ copyright, credit }: { copyright: string; credit: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <div className="ftwrap">
      <div className="wrap">
        <div className="ft">
          <span dangerouslySetInnerHTML={{ __html: copyright }} />
          <span dangerouslySetInnerHTML={{ __html: credit }} />
        </div>
      </div>
    </div>
  );
}
