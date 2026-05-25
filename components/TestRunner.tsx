"use client";
import { useState } from "react";
import { Icon } from "./IconSprite";

type Spec = { title: string; body: string; ms: number };

type State = "pending" | "run" | "pass";

export default function TestRunner({
  title,
  subtitle,
  specs,
}: {
  title: string;
  subtitle: string;
  specs: Spec[];
}) {
  const [states, setStates] = useState<State[]>(specs.map(() => "pending"));
  const [busy, setBusy] = useState(false);
  const [meter, setMeter] = useState(0);
  const [summary, setSummary] = useState("Press play");
  const [code, setCode] = useState("—");
  const [label, setLabel] = useState("Run");

  function run() {
    if (busy) return;
    setBusy(true);
    setStates(specs.map(() => "pending"));
    setMeter(0);
    setCode("—");
    const rm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const t0 = Date.now();
    let i = 0;
    const step = () => {
      if (i >= specs.length) {
        const sc = ((Date.now() - t0) / 1000).toFixed(2);
        setSummary(`${specs.length} passed · 0 failed · ${sc}s`);
        setCode("0");
        setBusy(false);
        setLabel("Re-run");
        return;
      }
      setStates((s) => s.map((st, k) => (k === i ? "run" : st)));
      const ms = rm ? 40 : specs[i].ms;
      setTimeout(() => {
        setStates((s) => s.map((st, k) => (k === i ? "pass" : st)));
        i++;
        setMeter((i / specs.length) * 100);
        setSummary(`${i} passed · ${specs.length - i} pending`);
        step();
      }, ms);
    };
    step();
  }

  const iconFor = (s: State) =>
    s === "pass" ? "ph-check-circle" : s === "run" ? "ph-circle-notch" : "ph-circle";

  return (
    <div className="runner">
      <div className="rh">
        <div className="t">
          <b>{title}</b> · <span dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
        <button className="runbtn" onClick={run} disabled={busy} type="button">
          <Icon id="ph-play" />
          <span>{label}</span>
        </button>
      </div>
      <div className="rmeter">
        <i style={{ width: `${meter}%` }} />
      </div>
      <div>
        {specs.map((s, idx) => {
          const state = states[idx];
          return (
            <div key={idx} className={`spec ${state === "pending" ? "" : state}`}>
              <span className="ic">
                <svg className={state === "run" ? "spin" : ""} aria-hidden="true">
                  <use href={`#${iconFor(state)}`} />
                </svg>
              </span>
              <div className="d">
                <b>{s.title}</b>
                <small>{s.body}</small>
              </div>
              <span className="rs">{state}</span>
            </div>
          );
        })}
      </div>
      <div className="rf">
        <span>{subtitle}</span>
        <span>
          exit <b>{code}</b>
        </span>
      </div>
    </div>
  );
}
