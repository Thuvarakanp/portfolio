"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm({ from }: { from: string }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setBusy(false);
    if (!res || res.error) {
      setErr("Wrong username or password.");
      return;
    }
    // Hard nav so the layout re-renders with the new session cookie picked up.
    window.location.href = from;
  }

  return (
    <form onSubmit={submit}>
      <div className="field">
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          autoFocus
        />
      </div>
      {err && <div className="flash err" style={{ marginBottom: 18 }}>{err}</div>}
      <button className="save" type="submit" disabled={busy} style={{ width: "100%" }}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
