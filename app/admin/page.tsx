import Link from "next/link";

export const metadata = { title: "Admin" };

const cards = [
  { k: "01", href: "/admin/pages", title: "Pages", desc: "Hero copy, lede, page-specific sections, SEO meta — one editor per page." },
  { k: "02", href: "/admin/cases", title: "Case studies", desc: "Add, edit and reorder the case study articles on the Work page." },
  { k: "03", href: "/admin/gallery", title: "Gallery", desc: "Manage the six gallery slots on Work. Upload images (dev only) or paste URLs." },
  { k: "04", href: "/admin/site", title: "Site config", desc: "Site name, status, copyright, footer credit, contact, availability." },
  { k: "05", href: "/admin/nav", title: "Navigation", desc: "Reorder, rename and re-route the top nav links." },
];

export default function AdminHome() {
  return (
    <div className="admin-wrap">
      <h1>Dashboard</h1>
      <p className="lede-sm">Everything visible on the public site is editable here.</p>
      <div className="admin-grid">
        {cards.map((c) => (
          <Link key={c.k} href={c.href} className="admin-card">
            <div className="k">{c.k}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
