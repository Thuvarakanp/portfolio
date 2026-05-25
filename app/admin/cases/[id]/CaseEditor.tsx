"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CaseStudy = {
  id: string;
  order: number;
  industry: string;
  context: string;
  role: string;
  badge: string;
  badgeIcon: string;
  title: string;
  projectName: string;
  challenge: string;
  approach: string;
  triangleAction: string;
  outcomes: string;
};

export default function CaseEditor({ caseStudy }: { caseStudy: CaseStudy }) {
  const router = useRouter();
  const [form, setForm] = useState(caseStudy);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function patch<K extends keyof CaseStudy>(k: K, v: CaseStudy[K]) {
    setForm({ ...form, [k]: v });
  }

  async function save() {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      try {
        JSON.parse(form.outcomes);
      } catch (e) {
        throw new Error(`Outcomes is not valid JSON: ${(e as Error).message}`);
      }
      const res = await fetch(`/api/cases/${caseStudy.id}`, {
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

  async function remove() {
    if (!confirm("Delete this case study?")) return;
    const res = await fetch(`/api/cases/${caseStudy.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/cases");
  }

  return (
    <div className="admin-wrap">
      <h1>Case study</h1>
      <p className="lede-sm">
        <Link href="/admin/cases">← All case studies</Link>
      </p>

      {msg && <div className="flash">{msg}</div>}
      {err && <div className="flash err">{err}</div>}

      <div className="row2">
        <div className="field">
          <label>Order (position)</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => patch("order", Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label>Badge icon (Phosphor id)</label>
          <input
            value={form.badgeIcon}
            onChange={(e) => patch("badgeIcon", e.target.value)}
            placeholder="ph-check-circle"
          />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label>Industry</label>
          <input value={form.industry} onChange={(e) => patch("industry", e.target.value)} />
        </div>
        <div className="field">
          <label>Context</label>
          <input value={form.context} onChange={(e) => patch("context", e.target.value)} />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label>Role</label>
          <input value={form.role} onChange={(e) => patch("role", e.target.value)} />
        </div>
        <div className="field">
          <label>Badge text</label>
          <input value={form.badge} onChange={(e) => patch("badge", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Title</label>
        <input value={form.title} onChange={(e) => patch("title", e.target.value)} />
      </div>
      <div className="field">
        <label>Project name (subhead)</label>
        <input
          value={form.projectName}
          onChange={(e) => patch("projectName", e.target.value)}
        />
      </div>
      <div className="field">
        <label>Challenge</label>
        <textarea
          value={form.challenge}
          onChange={(e) => patch("challenge", e.target.value)}
          rows={3}
        />
      </div>
      <div className="field">
        <label>Approach</label>
        <textarea
          value={form.approach}
          onChange={(e) => patch("approach", e.target.value)}
          rows={3}
        />
      </div>
      <div className="field">
        <label>The triangle in action</label>
        <textarea
          value={form.triangleAction}
          onChange={(e) => patch("triangleAction", e.target.value)}
          rows={3}
        />
      </div>
      <div className="field">
        <label>Outcomes (JSON array of {`{value, label}`})</label>
        <textarea
          value={form.outcomes}
          onChange={(e) => patch("outcomes", e.target.value)}
          rows={5}
          spellCheck={false}
        />
      </div>

      <div className="toolbar">
        <button className="del" onClick={remove}>
          Delete
        </button>
        <button className="save" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
