"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Cfg = {
  id: string;
  siteName: string;
  siteTagline: string;
  status: string;
  copyright: string;
  footerCredit: string;
  contact: string;
  availability: string;
  ogImage: string;
  themeColor: string;
};

export default function SiteEditor({ cfg: initial }: { cfg: Cfg }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function patch<K extends keyof Cfg>(k: K, v: Cfg[K]) {
    setForm({ ...form, [k]: v });
  }

  async function save() {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      JSON.parse(form.contact);
      JSON.parse(form.availability);
      const res = await fetch("/api/site", {
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
      <h1>Site config</h1>
      <p className="lede-sm">
        <Link href="/admin">← Dashboard</Link>
      </p>
      {msg && <div className="flash">{msg}</div>}
      {err && <div className="flash err">{err}</div>}

      <div className="row2">
        <div className="field">
          <label>Site name</label>
          <input value={form.siteName} onChange={(e) => patch("siteName", e.target.value)} />
        </div>
        <div className="field">
          <label>Tagline</label>
          <input value={form.siteTagline} onChange={(e) => patch("siteTagline", e.target.value)} />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label>Status pill text</label>
          <input value={form.status} onChange={(e) => patch("status", e.target.value)} />
        </div>
        <div className="field">
          <label>Theme color (browser chrome)</label>
          <input value={form.themeColor} onChange={(e) => patch("themeColor", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Copyright</label>
        <input value={form.copyright} onChange={(e) => patch("copyright", e.target.value)} />
      </div>
      <div className="field">
        <label>Footer credit (HTML allowed)</label>
        <textarea
          value={form.footerCredit}
          onChange={(e) => patch("footerCredit", e.target.value)}
          rows={2}
        />
      </div>
      <div className="field">
        <label>OG image path</label>
        <input value={form.ogImage} onChange={(e) => patch("ogImage", e.target.value)} />
      </div>
      <div className="field">
        <label>Contact (JSON: {`{ email, linkedin, github, resume }`})</label>
        <textarea
          value={form.contact}
          onChange={(e) => patch("contact", e.target.value)}
          rows={6}
          spellCheck={false}
        />
      </div>
      <div className="field">
        <label>Availability (JSON array of {`{ key, value, note }`})</label>
        <textarea
          value={form.availability}
          onChange={(e) => patch("availability", e.target.value)}
          rows={10}
          spellCheck={false}
        />
      </div>

      <div className="toolbar">
        <Link href="/admin" className="del">
          Cancel
        </Link>
        <button className="save" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
