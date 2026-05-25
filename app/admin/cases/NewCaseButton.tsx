"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCaseButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function create() {
    setBusy(true);
    const res = await fetch("/api/cases", { method: "POST" });
    setBusy(false);
    if (res.ok) {
      const c = await res.json();
      router.push(`/admin/cases/${c.id}`);
    }
  }
  return (
    <button className="save" onClick={create} disabled={busy} style={{ marginTop: 30 }}>
      {busy ? "Creating…" : "+ New case study"}
    </button>
  );
}
