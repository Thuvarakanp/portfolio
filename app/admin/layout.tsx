import { auth, signOut } from "@/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const email = session?.user?.email;
  // Login page renders without the chrome.
  if (!session) return <>{children}</>;

  return (
    <>
      <div className="admin-bar">
        <Link href="/admin" className="home">
          Admin <i style={{ color: "var(--ink-3)", fontStyle: "italic" }}>— Thuvarakan</i>
        </Link>
        <nav>
          <Link href="/admin/pages">Pages</Link>
          <Link href="/admin/cases">Case studies</Link>
          <Link href="/admin/gallery">Gallery</Link>
          <Link href="/admin/site">Site</Link>
          <Link href="/admin/nav">Nav</Link>
          <Link href="/" target="_blank" rel="noopener">
            View site ↗
          </Link>
        </nav>
        <div className="who">
          <span>{email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </div>
      </div>
      {children}
    </>
  );
}
