"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Item = {
  id: string;
  order: number;
  slot: string;
  src: string;
  alt: string;
  label: string;
  title: string;
  reference: string;
};

export default function GalleryEditor({ items: initial }: { items: Item[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function patch(id: string, k: keyof Item, v: string | number) {
    setItems((all) => all.map((it) => (it.id === id ? { ...it, [k]: v } : it)));
  }

  async function save(id: string) {
    setBusy(id);
    setErr(null);
    setMsg(null);
    const it = items.find((x) => x.id === id);
    if (!it) return;
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(it),
    });
    setBusy(null);
    if (!res.ok) setErr(await res.text());
    else {
      setMsg(`Saved "${it.title}"`);
      router.refresh();
    }
  }

  async function upload(id: string, file: File) {
    setBusy(id);
    setErr(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setBusy(null);
    if (!res.ok) {
      setErr(await res.text());
      return;
    }
    const { url } = (await res.json()) as { url: string };
    patch(id, "src", url);
    setMsg(`Uploaded — remember to save.`);
  }

  async function remove(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((all) => all.filter((it) => it.id !== id));
      router.refresh();
    }
  }

  async function add() {
    setBusy("new");
    const res = await fetch("/api/gallery", { method: "POST" });
    setBusy(null);
    if (res.ok) {
      const created = await res.json();
      setItems((all) => [...all, created]);
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Gallery</h1>
      <p className="lede-sm">
        Six slots map to the layout grid on /work (slots <code>a</code>–<code>f</code>). Image
        upload writes to <code>/public/uploads/</code> in development.
      </p>
      {msg && <div className="flash">{msg}</div>}
      {err && <div className="flash err">{err}</div>}

      {items.map((it) => (
        <div key={it.id} className="list-card" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={it.src}
            alt={it.alt}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: "1px solid var(--hair)" }}
          />
          <div>
            <div className="row2">
              <div className="field">
                <label>Slot (a–f)</label>
                <input value={it.slot} onChange={(e) => patch(it.id, "slot", e.target.value)} />
              </div>
              <div className="field">
                <label>Order</label>
                <input
                  type="number"
                  value={it.order}
                  onChange={(e) => patch(it.id, "order", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="field">
              <label>Image URL</label>
              <input value={it.src} onChange={(e) => patch(it.id, "src", e.target.value)} />
            </div>
            <div className="field">
              <label>Upload (dev only)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(it.id, f);
                }}
              />
            </div>
            <div className="field">
              <label>Alt text (accessibility)</label>
              <textarea
                value={it.alt}
                onChange={(e) => patch(it.id, "alt", e.target.value)}
                rows={2}
              />
            </div>
            <div className="row2">
              <div className="field">
                <label>Label (caption eyebrow)</label>
                <input
                  value={it.label}
                  onChange={(e) => patch(it.id, "label", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Reference (e.g. Project 01)</label>
                <input
                  value={it.reference}
                  onChange={(e) => patch(it.id, "reference", e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label>Title (caption serif text)</label>
              <input value={it.title} onChange={(e) => patch(it.id, "title", e.target.value)} />
            </div>
            <div className="toolbar">
              <button className="del" onClick={() => remove(it.id)}>
                Delete
              </button>
              <button
                className="save"
                onClick={() => save(it.id)}
                disabled={busy === it.id}
              >
                {busy === it.id ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button className="save" onClick={add} disabled={busy === "new"} style={{ marginTop: 30 }}>
        {busy === "new" ? "Creating…" : "+ New gallery item"}
      </button>
      <p className="lede-sm" style={{ marginTop: 30 }}>
        <Link href="/admin">← Dashboard</Link>
      </p>
    </div>
  );
}
