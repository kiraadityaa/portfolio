"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useThemeAudio, type SiteTheme } from "./ThemeAudioProvider";

type Phase = "reveal" | "choice" | "leaving" | "done";

const LINE_1 = "FA'AL".split("");
const LINE_2 = "ADITYA".split("");

type Ticket = {
  id: SiteTheme;
  no: string;
  keyHint: string;
  title: string;
  tagline: string;
  desc: string;
  meta: string;
  best: string;
  palette: string;
  swatches: { hex: string; name: string }[];
};

const TICKETS: Ticket[] = [
  {
    id: "default",
    no: "01",
    keyHint: "Press 1",
    title: "Default",
    tagline: "Warm paper",
    desc: "Ink text · red accent · moss detail",
    meta: "Editorial — seperti koran & zine",
    best: "Best for reading",
    palette: "paper / ink / red",
    swatches: [
      { hex: "#f4f1ea", name: "Paper" },
      { hex: "#141310", name: "Ink" },
      { hex: "#b3271a", name: "Accent red" },
      { hex: "#3f4a3a", name: "Moss" },
    ],
  },
  {
    id: "mono",
    no: "02",
    keyHint: "Press 2",
    title: "Monochrome",
    tagline: "Focus mode",
    desc: "Full gray · no color distraction",
    meta: "Tenang — tanpa distraksi warna",
    best: "Best for focus",
    palette: "gray scale",
    swatches: [
      { hex: "#ececec", name: "Paper gray" },
      { hex: "#1a1a1a", name: "Ink gray" },
      { hex: "#555555", name: "Mid gray" },
      { hex: "#8c8c8c", name: "Faint gray" },
    ],
  },
];

export default function IntroGate() {
  const { theme, preview, setPreview, enter } = useThemeAudio();
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "choice"
      : "reveal"
  );
  const [leavingTheme, setLeavingTheme] = useState<SiteTheme | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const choiceRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Auto-advance reveal -> choice (respect reduced motion via initial state)
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("choice"), 1500);
    timers.current.push(t);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Lock page scroll behind the overlay for every intro phase so the
  // site can't be scrolled (or observed mid-scroll) before entering.
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    if (phase === "choice") {
      optionRefs.current[focusIndex]?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase, focusIndex]);

  const choose = useCallback(
    (choice: SiteTheme) => {
      if (phase !== "choice") return;
      setLeavingTheme(choice);
      setPreview(null);
      setPhase("leaving");
      const t = window.setTimeout(() => {
        enter(choice);
        // Start the site from the very top so hero animations play fresh.
        window.scrollTo(0, 0);
        setPhase("done");
      }, 280);
      timers.current.push(t);
    },
    [phase, enter, setPreview]
  );

  // Keyboard: ESC skip reveal, 1/2 + arrows + Enter di fase choice
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "reveal") setPhase("choice");
      if (phase !== "choice") return;
      if (e.key === "1") choose("default");
      else if (e.key === "2") choose("mono");
      else if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
        setFocusIndex((i) => {
          const next = (i + dir + TICKETS.length) % TICKETS.length;
          optionRefs.current[next]?.focus();
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, choose]);

  if (phase === "done") return null;

  const activePreview: SiteTheme | null = preview ?? leavingTheme;
  const shown: SiteTheme = activePreview ?? theme;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Intro — choose a theme"
      data-theme-preview={activePreview ?? undefined}
      className={`fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-[var(--night)] text-[var(--cream)] transition-all duration-300 ${
        phase === "leaving" ? "pointer-events-none scale-[1.01] opacity-0" : "opacity-100"
      }`}
    >
      <div aria-hidden="true" className="grid-dark pointer-events-none fixed inset-0 opacity-100" />
      {/* top hairline bar — same language as the rest of the site */}
      <div aria-hidden="true" className="relative h-1 w-full bg-[var(--cream)]/10">
        {phase === "reveal" && (
          <div className="intro-progress h-full w-full bg-[var(--accent-soft)]" />
        )}
      </div>

      {phase === "reveal" && (
        <div className="relative flex min-h-full flex-1 flex-col px-5 sm:px-8">
          <div className="mx-auto flex w-full max-w-[76rem] items-center justify-between py-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--sand)]">
            <span className="intro-fade flex items-center gap-3" style={{ ["--d" as string]: "0ms" }}>
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-[var(--accent-soft)]" />
              Portfolio — 2026
            </span>
            <span className="intro-fade hidden sm:block" style={{ ["--d" as string]: "150ms" }}>
              TKJ / Linux / Python
            </span>
            <span className="intro-fade" style={{ ["--d" as string]: "150ms" }}>
              00 — Intro
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-center py-8 text-center">
            <p
              className="intro-fade font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--sand)]"
              style={{ ["--d" as string]: "200ms" }}
            >
              Fa&rsquo;al Aditya Purnama — Student
            </p>
            <h2
              aria-label="FA'AL ADITYA"
              className="display-hero mx-auto mt-6 text-[clamp(3.4rem,13vw,10rem)]"
            >
              <span className="block" aria-hidden="true">
                {LINE_1.map((ch, i) => (
                  <span
                    key={i}
                    className="intro-letter"
                    style={{ ["--d" as string]: `${200 + i * 65}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className="block text-[var(--accent-soft)]" aria-hidden="true">
                {LINE_2.map((ch, i) => (
                  <span
                    key={i}
                    className="intro-letter"
                    style={{ ["--d" as string]: `${200 + (LINE_1.length + i) * 65}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h2>
            <p
              className="intro-fade mx-auto mt-7 flex items-center justify-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--sand)]"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span aria-hidden="true" className="text-[var(--accent-soft)]">$</span>
              student / tkj / linux / python
              <span aria-hidden="true" className="term-caret bg-[var(--accent-soft)]" />
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[76rem] flex-col items-center justify-between gap-4 border-t border-[var(--night-line)] py-5 sm:flex-row">
            <p className="intro-fade font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--sand)]" style={{ ["--d" as string]: "1050ms" }}>
              Press ESC to skip — auto continues
            </p>
            <button
              type="button"
              onClick={() => setPhase("choice")}
              className="intro-fade w-full border border-[var(--night-faint)] px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--cream-dim)] transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--accent-soft)] sm:w-auto"
              style={{ ["--d" as string]: "1100ms" }}
            >
              Skip intro →
            </button>
          </div>
        </div>
      )}

      {(phase === "choice" || phase === "leaving") && (
        <div
          ref={choiceRef}
          /* m-auto (bukan justify-center): konten pendek tetap tengah,
             konten lebih tinggi dari layar tetap bisa di-scroll dari atas
             di HP portrait — perbaiki bug potong-atas flexbox. */
          className="relative m-auto w-full max-w-[46rem] flex-col justify-center px-4 py-6 sm:px-8 lg:py-10"
        >
          <p className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--sand)] sm:gap-3 sm:text-[0.7rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 bg-[var(--accent-soft)]" />
            <span className="truncate">01 — Pick your ticket</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--night-line)]" />
            <span className="hidden shrink-0 sm:inline">Admit · one story</span>
          </p>

          <h2 className="display-section mt-5 text-[clamp(1.6rem,8vw,3.6rem)]">
            Which screening do you want?
          </h2>
          <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-[var(--cream-dim)] lg:text-[0.98rem]">
            Same film, two projectors.{" "}
            <span className="text-[var(--cream)]">Default</span> runs warm paper with a
            red accent — <span className="text-[var(--cream)]">Mono</span> runs full
            gray for pure focus.{" "}
            <span className="sm:hidden">Tap a ticket to enter.</span>
            <span className="hidden sm:inline">Hover to preview live, click (or press{" "}
            <kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">1</kbd>{" / "}
            <kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">2</kbd>
            {", "}<kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">↑</kbd>{" "}
            <kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">↓</kbd>) to enter.</span>
          </p>
          <p aria-live="polite" className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent-soft)]">
            ● Now previewing — {shown} · {shown === "mono" ? "gray / focus" : "paper / ink / red"}
          </p>

          <div
            className="mt-5 grid gap-4 lg:mt-7 lg:gap-5"
            role="radiogroup"
            aria-label="Theme tickets"
          >
            {TICKETS.map((ticket, idx) => {
              const isSaved = theme === ticket.id && leavingTheme === null;
              const isFocused = shown === ticket.id;
              const isMono = ticket.id === "mono";
              return (
                <div
                  key={ticket.id}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  role="radio"
                  aria-checked={leavingTheme === ticket.id}
                  tabIndex={phase === "choice" ? 0 : -1}
                  onClick={() => choose(ticket.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      choose(ticket.id);
                    }
                  }}
                  onMouseEnter={() => setPreview(ticket.id)}
                  onMouseLeave={() => setPreview(null)}
                  onFocus={() => {
                    setPreview(ticket.id);
                    setFocusIndex(idx);
                  }}
                  onBlur={() => setPreview(null)}
                  data-active={isFocused}
                  aria-label={`Ticket ${ticket.no}: ${ticket.title} — ${ticket.desc}. ${ticket.keyHint} to enter.`}
                  className={`ticket-option group flex min-h-[7rem] cursor-pointer flex-col overflow-hidden border-2 bg-[var(--night-soft)] text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent-soft)] sm:flex-row ${
                    isFocused
                      ? "border-[var(--accent-soft)]"
                      : "border-[var(--night-faint)] hover:border-[var(--cream-dim)]"
                  } ${!isFocused && (preview ?? leavingTheme) ? "opacity-70" : "opacity-100"}`}
                >
                  {/* Stub — nomor + key hint, horizontal di mobile, vertikal di desktop */}
                  <div
                    className={`flex shrink-0 flex-row items-center justify-between gap-2 border-b-2 border-dashed px-4 py-3 sm:w-40 sm:flex-col sm:items-start sm:justify-center sm:gap-1 sm:border-b-0 sm:border-r-2 ${
                      isFocused ? "border-[var(--accent-soft)]/60" : "border-[var(--night-faint)]"
                    }`}
                  >
                    <span className="font-mono text-[1.6rem] font-medium leading-none tracking-tight text-[var(--cream)] sm:text-[2rem]">
                      {ticket.no}
                    </span>
                    <span className="flex flex-wrap items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--sand)] sm:flex-col sm:items-start sm:gap-1 sm:text-[0.65rem]">
                      <span className="sm:hidden">Tap to enter</span>
                      <span className="hidden sm:inline">{ticket.keyHint}</span>
                      <span className="flex items-center gap-1.5" aria-hidden="true">
                        <i
                          title={isMono ? "Mono swatch" : "Paper swatch"}
                          className={`inline-block h-3 w-6 border border-black/40 not-italic ${isMono ? "bg-[#ececec]" : "bg-[#f4f1ea]"}`}
                        />
                        <i
                          title={isMono ? "Ink gray" : "Accent red"}
                          className={`inline-block h-3 w-6 border border-black/40 not-italic ${isMono ? "bg-[#1a1a1a]" : "bg-[#b3271a]"}`}
                        />
                      </span>
                      {isSaved && (
                        <span className="border border-[var(--accent-soft)] px-1.5 py-0.5 text-[var(--accent-soft)]">
                          Saved
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Body — judul + live cover strip + meta */}
                  <div className="flex flex-1 flex-col justify-center gap-2 p-3 sm:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="text-[1.4rem] font-bold leading-none tracking-tight text-[var(--cream)] sm:text-[1.6rem]">
                        {ticket.title}
                        <span className="ml-2 align-middle font-mono text-[0.62rem] font-normal uppercase tracking-[0.14em] text-[var(--sand)]">
                          {ticket.tagline}
                        </span>
                      </p>
                      <span className="hidden border border-[var(--night-faint)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--cream-dim)] lg:inline">
                        {ticket.best}
                      </span>
                    </div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--sand)] sm:text-[0.68rem]">
                      {ticket.desc}
                    </p>

                    {/* Live cover strip — wujud situs mini dalam temanya */}
                    <div
                      aria-hidden="true"
                      className={`mt-1 flex items-center gap-3 border-2 p-2.5 transition-colors sm:p-3 ${
                        isMono ? "border-[#1a1a1a] bg-[#ececec]" : "border-[#141310] bg-[#f4f1ea]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <i className={`h-2.5 w-7 not-italic ${isMono ? "bg-[#1a1a1a]" : "bg-[#141310]"}`} />
                          <i className={`h-2.5 w-4 not-italic ${isMono ? "bg-[#555]" : "bg-[#b3271a]"}`} />
                          <span className={`font-mono text-[0.55rem] uppercase tracking-[0.12em] ${isMono ? "text-[#555]" : "text-[#656056]"}`}>
                            Fa&rsquo;al Aditya — Hero
                          </span>
                        </div>
                        <span className="block truncate text-[0.95rem] font-bold leading-tight tracking-tight" style={{ color: isMono ? "#1a1a1a" : "#141310" }}>
                          Student. Linux. Python.
                        </span>
                        <span className={`mock-bar block w-11/12 ${isMono ? "bg-[#8c8c8c]" : "bg-[#d4cec0]"}`} />
                        <span className={`mock-bar block w-2/3 ${isMono ? "bg-[#b5b5b5]" : "bg-[#ebe6da]"}`} />
                      </div>
                      {/* Kolom swatch disembunyikan di layar sangat sempit agar
                          cover strip tidak menghimpit teks. */}
                      <div className="hidden min-[400px]:flex shrink-0 flex-col items-end gap-1">
                        {ticket.swatches.map((s) => (
                          <i
                            key={s.hex}
                            title={`${s.name} ${s.hex}`}
                            className="h-2.5 w-10 border border-black/30 not-italic"
                            style={{ background: s.hex }}
                          />
                        ))}
                        <span className={`font-mono text-[0.55rem] uppercase tracking-[0.1em] ${isMono ? "text-[#555]" : "text-[#b3271a]"}`}>
                          {ticket.palette}
                        </span>
                      </div>
                    </div>

                    <p className="hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--sand)] sm:block">
                      Aa — {ticket.meta}
                    </p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--cream-dim)] transition-colors group-hover:text-[var(--accent-soft)] sm:text-[0.7rem]">
                      Tear ticket — enter with {ticket.title.toLowerCase()} →
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-1.5 border-t border-[var(--night-line)] pt-3.5 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-[var(--sand)] sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-4 sm:text-[0.68rem]">
            <p>♪ bye × into you — hakiraadityaa · plays after you enter</p>
            <p className="text-[var(--cream-dim)]">Changeable later in header</p>
          </div>
        </div>
      )}
    </div>
  );
}
