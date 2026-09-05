"use client";

import { useEffect, useState } from "react";

const LINES = [
  { prompt: "faal@linux:~$", cmd: "whoami" },
  { prompt: "", cmd: "", out: "faal — student, tinkerer, TKJ grade 12" },
  { prompt: "faal@linux:~$", cmd: "cat interests.txt" },
  { prompt: "", cmd: "", out: "linux · python · networking · open-source" },
  { prompt: "faal@linux:~$", cmd: "uptime --curiosity" },
  { prompt: "", cmd: "", out: "up 16 years, load: always learning" },
];

export default function Terminal() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => {
        setCount(LINES.length);
        setDone(true);
      }, 0);
      return () => clearTimeout(t);
    }
    const t = setInterval(() => {
      setCount((c) => {
        if (c >= LINES.length) {
          clearInterval(t);
          setDone(true);
          return c;
        }
        return c + 1;
      });
    }, 650);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      role="img"
      aria-label="Decorative terminal showing whoami output describing Fa'al as a student and tinkerer"
      className="overflow-hidden border border-[#2c2a24] bg-[#171511] text-[#ece7db]"
    >
      <div className="flex items-center justify-between border-b border-[#2c2a24] px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.12em] text-[#8f897c] uppercase">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a372f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a372f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          </span>
          faal@linux — bash
        </span>
        <span>utf-8</span>
      </div>
      <div className="min-h-[19rem] space-y-3 px-4 py-5 font-mono text-[0.82rem] leading-relaxed sm:text-[0.88rem]">
        {LINES.slice(0, count).map((l, i) => (
          <p key={i}>
            {l.prompt ? (
              <>
                <span className="text-[#9aa88f]">{l.prompt}</span>{" "}
                <span className="text-[#ece7db]">{l.cmd}</span>
              </>
            ) : (
              <span className="text-[#b7b0a1]">{l.out}</span>
            )}
          </p>
        ))}
        <p aria-hidden="true">
          <span className="text-[#9aa88f]">faal@linux:~$</span>{" "}
          {done ? <span className="term-caret" /> : <span className="term-caret" />}
        </p>
      </div>
    </div>
  );
}
