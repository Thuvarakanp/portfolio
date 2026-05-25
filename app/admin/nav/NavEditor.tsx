"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type N = { id: string; order: number; label: string; href: string };

export default function NavEditor({ items: initial }: { items: N[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function patch(id: string, k: keyof N, v: string | number) {
    setItems((all) => all.map((it) => (it.id === id ? { ...it, [k]: v } : it)));
  }

  function add() {
    const order = items.length ? Math.max(...items.map((i) => i.order)) + 1 : 1;
    setItems([...items, { id: `new-${Date.now()}`, order, label: "New", href: "/" }]);
  }

  function removeLocal(id: string) {
    setItems(items.filter((it) => it.id !== id));
  }

  async function save() {
    setBusy(true);
    setErr(null);
    setMsg(null);
    const res = await fetch("/api/nav", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items }),
    });
    setBusy(false);
    if (!res.ok) setErr(await res.text());
    else {
      setMsg("Saved.");
      router.refresh();
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Navigation</h1>
      <p className="lede-sm">
        <Link href="/admin">← Dashboard</Link>
      </p>
      {msg && <div className="flash">{msg}</div>}
      {err && <div className="flash err">{err}</div>}

      {items.map((it) => (
        <div key={it.id} className="list-card">
          <div className="row2">
            <div className="field">
              <label>Order</label>
              <input
                type="number"
                value={it.order}
                onChange={(e) => patch(it.id, "order", Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Label</label>
              <input value={it.label} onChange={(e) => patch(it.id, "label", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Href</label>
            <input value={it.href} onChange={(e) => patch(it.id, "href", e.target.value)} />
          </div>
          <button className="del" onClick={() => removeLocal(it.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="toolbar">
        <button className="del" onClick={add}>
          + Add link
        </button>
        <button className="save" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save nav"}
        </button>
      </div>
    </div>
  );
}
