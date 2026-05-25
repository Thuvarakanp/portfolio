"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Page = {
  id: string;
  title: string;
  description: string;
  ogTitle: string | null;
  ogDescription: string | null;
  canonicalPath: string | null;
  hero: string;
  sections: string;
};

export default function PageEditor({ page }: { page: Page }) {
  const router = useRouter();
  const [form, setForm] = useState(page);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function patch<K extends keyof Page>(k: K, v: Page[K]) {
    setForm({ ...form, [k]: v });
  }

  async function save() {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      // Validate JSON locally before sending
      try {
        JSON.parse(form.hero);
        JSON.parse(form.sections);
      } catch (e) {
        throw new Error(`Invalid JSON: ${(e as Error).message}`);
      }
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("Saved.");
      router.refresh();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Page · {page.id}</h1>
      <p className="lede-sm">
        <Link href="/admin/pages">← All pages</Link>
      </p>

      {msg && <div className="flash">{msg}</div>}
      {err && <div className="flash err">{err}</div>}

      <div className="field">
        <label>Title (browser tab + &lt;title&gt;)</label>
        <input value={form.title} onChange={(e) => patch("title", e.target.value)} />
      </div>
      <div className="field">
        <label>Description (meta description)</label>
        <textarea
          value={form.description}
          onChange={(e) => patch("description", e.target.value)}
          rows={2}
        />
      </div>
      <div className="row2">
        <div className="field">
          <label>OG Title</label>
          <input value={form.ogTitle ?? ""} onChange={(e) => patch("ogTitle", e.target.value)} />
        </div>
        <div className="field">
          <label>Canonical path</label>
          <input
            value={form.canonicalPath ?? ""}
            onChange={(e) => patch("canonicalPath", e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label>OG Description</label>
        <textarea
          value={form.ogDescription ?? ""}
          onChange={(e) => patch("ogDescription", e.target.value)}
          rows={2}
        />
      </div>

      <div className="field">
        <label>Hero block (JSON)</label>
        <span className="hint">
          Shape varies by page. Home: <code>{`{ indexBits, lines, lede, ctas }`}</code>. Inner
          pages: <code>{`{ kicker, title, lede }`}</code>.
        </span>
        <textarea
          value={form.hero}
          onChange={(e) => patch("hero", e.target.value)}
          rows={12}
          spellCheck={false}
        />
      </div>

      <div className="field">
        <label>Sections (JSON)</label>
        <span className="hint">
          The structured body of the page. Each top-level key is a section. See seed data for
          shape examples.
        </span>
        <textarea
          value={form.sections}
          onChange={(e) => patch("sections", e.target.value)}
          rows={24}
          spellCheck={false}
        />
      </div>

      <div className="toolbar">
        <Link href="/admin/pages" className="del">
          Cancel
        </Link>
        <button className="save" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
