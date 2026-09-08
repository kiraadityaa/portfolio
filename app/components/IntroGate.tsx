"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useThemeAudio, type SiteTheme } from "./ThemeAudioProvider";

type Phase = "reveal" | "choice" | "leaving" | "done";

const LINE_1 = "FA'AL".split("");
const LINE_2 = "ADITYA".split("");

type Card = {
  id: SiteTheme;
  no: string;
  title: string;
  desc: string;
  meta: string;
  swatches: string[];
};

const CARDS: Card[] = [
  {
    id: "default",
    no: "01",
    title: "Default",
    desc: "Warm paper · ink · red accent",
    meta: "Editorial — seperti koran & zine",
    swatches: ["#f4f1ea", "#141310", "#b3271a", "#3f4a3a"],
  },
  {
    id: "mono",
    no: "02",
    title: "Monochrome",
    desc: "Full gray · focus mode",
    meta: "Tenang — tanpa distraksi warna",
    swatches: ["#ececec", "#1a1a1a", "#555555", "#8c8c8c"],
  },
];

export default function IntroGate() {
  const { theme, enter } = useThemeAudio();
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "choice"
      : "reveal"
  );
  const [leavingTheme, setLeavingTheme] = useState<SiteTheme | null>(null);
  const [hovered, setHovered] = useState<SiteTheme | null>(null);
  const choiceRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Auto-advance reveal -> choice (respect reduced motion via initial state)
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("choice"), 2600);
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
      choiceRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const choose = useCallback(
    (choice: SiteTheme) => {
      if (phase !== "choice") return;
      setLeavingTheme(choice);
      setPhase("leaving");
      const t = window.setTimeout(() => {
        enter(choice);
        // Start the site from the very top so hero animations play fresh.
        window.scrollTo(0, 0);
        setPhase("done");
      }, 450);
      timers.current.push(t);
    },
    [phase, enter]
  );

  // Keyboard: ESC skip reveal, 1/2 choose theme
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "reveal") setPhase("choice");
      if (phase === "choice") {
        if (e.key === "1") choose("default");
        if (e.key === "2") choose("mono");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, choose]);

  if (phase === "done") return null;

  const preview: SiteTheme | null = hovered ?? leavingTheme;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Intro — choose a theme"
      data-theme-preview={preview ?? undefined}
      className={`fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-[var(--night)] text-[var(--cream)] transition-all duration-500 ${
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
          className="relative mx-auto flex min-h-full w-full max-w-[76rem] flex-1 flex-col justify-center px-4 py-6 sm:px-8 lg:py-8"
        >
          <p className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--sand)] sm:gap-3 sm:text-[0.7rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 bg-[var(--accent-soft)]" />
            <span className="truncate">01 — Choose your theme</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--night-line)]" />
            <span className="hidden shrink-0 sm:inline">Fig. 00 — The reader</span>
          </p>

          <div className="mt-5 grid items-start gap-6 lg:mt-7 lg:grid-cols-12 lg:gap-10">
            {/* Left — character banner on mobile, portrait on desktop */}
            <figure className="border-2 border-[var(--cream)]/80 bg-[var(--night-soft)] lg:col-span-5">
              <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8] lg:aspect-[4/4.4]">
                <Image
                  src="/images/intro-charater.jpg"
                  alt="Karakter anime pilihan tema portfolio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className={`object-cover object-top transition-[filter] duration-300 ${
                    (preview ?? theme) === "mono"
                      ? "grayscale contrast-[1.05]"
                      : "img-duotone"
                  }`}
                />
                <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-black/20" />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t-2 border-[var(--cream)]/80 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--sand)] sm:px-4 sm:py-2.5 sm:text-[0.68rem]">
                <span>Fig. 00 — The character</span>
                <span className="text-[var(--accent-soft)]">
                  ● {(preview ?? theme) === "mono" ? "mono" : "default"}
                </span>
              </figcaption>
            </figure>

            {/* Right — headline + theme cards */}
            <div className="lg:col-span-7">
              <h2
                tabIndex={-1}
                data-autofocus
                className="display-section text-[clamp(1.7rem,8.5vw,3.9rem)] outline-none"
              >
                How do you want to read this story?
              </h2>
              <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-[var(--cream-dim)] lg:mt-4 lg:text-[0.98rem]">
                Same story, two lights.{" "}
                <span className="text-[var(--cream)]">Default</span> is warm paper with a
                red accent — <span className="text-[var(--cream)]">Mono</span> strips
                colour away for pure focus.{" "}
                <span className="sm:hidden">Tap a theme to enter.</span>
                <span className="hidden sm:inline">Hover to preview, click (or press{" "}
                <kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">1</kbd>{" / "}
                <kbd className="border border-[var(--night-faint)] px-1.5 py-0.5 font-mono text-[0.7rem]">2</kbd>) to enter.</span>
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-7 lg:gap-4" role="group" aria-label="Theme options">
                {CARDS.map((card) => {
                  const isSaved = theme === card.id;
                  const isActive = (preview ?? theme) === card.id || leavingTheme === card.id;
                  const isMono = card.id === "mono";
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => choose(card.id)}
                      onMouseEnter={() => setHovered(card.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(card.id)}
                      onBlur={() => setHovered(null)}
                      aria-pressed={leavingTheme === card.id}
                      data-active={isActive}
                      className="theme-card group border-2 border-[var(--night-faint)] bg-[var(--night-soft)] p-4 text-left hover:border-[var(--accent-soft)] sm:p-5"
                    >
                      <span className="flex items-center justify-between gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--sand)] sm:text-[0.68rem]">
                        <span>
                          {card.no} —{" "}
                          <span className="sm:hidden">Tap to enter</span>
                          <span className="hidden sm:inline">{card.id === "default" ? "Press 1" : "Press 2"}</span>
                        </span>
                        {isSaved && (
                          <span className="shrink-0 border border-[var(--accent-soft)] px-2 py-0.5 text-[var(--accent-soft)]">
                            Saved
                          </span>
                        )}
                      </span>

                      <span className="mt-2.5 block text-[1.35rem] font-bold leading-none tracking-tight text-[var(--cream)] sm:mt-3 sm:text-[1.55rem]">
                        {card.title}
                      </span>
                      <span className="mt-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--sand)] sm:text-[0.68rem]">
                        {card.desc}
                      </span>

                      {/* Mini editorial mock — shows the real difference */}
                      <span
                        aria-hidden="true"
                        className={`mt-3 block border p-2.5 transition-colors sm:mt-4 sm:p-3 ${
                          isMono
                            ? "border-[#3a3a3a] bg-[#ececec]"
                            : "border-[#141310] bg-[#f4f1ea]"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <i className={`h-3 w-8 not-italic ${isMono ? "bg-[#1a1a1a]" : "bg-[#141310]"}`} />
                          <i className={`h-3 w-5 not-italic ${isMono ? "bg-[#555]" : "bg-[#b3271a]"}`} />
                        </span>
                        <span className={`mock-bar mt-2 block w-11/12 ${isMono ? "bg-[#8c8c8c]" : "bg-[#d4cec0]"}`} />
                        <span className={`mock-bar mt-1.5 block w-3/4 ${isMono ? "bg-[#b5b5b5]" : "bg-[#ebe6da]"}`} />
                        <span className={`mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.14em] ${isMono ? "text-[#555]" : "text-[#b3271a]"}`}>
                          Aa — {card.meta}
                        </span>
                      </span>

                      <span className="mt-3 flex gap-1.5" aria-hidden="true">
                        {card.swatches.map((s) => (
                          <i key={s} className="h-4 w-8 border border-black/30 not-italic" style={{ background: s }} />
                        ))}
                      </span>

                      <span className="mt-3 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--cream-dim)] transition-colors group-hover:text-[var(--accent-soft)] sm:mt-4 sm:text-[0.7rem]">
                        Enter with {card.title.toLowerCase()} →
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-1.5 border-t border-[var(--night-line)] pt-3.5 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-[var(--sand)] sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-4 sm:text-[0.68rem]">
                <p>♪ bye × into you — hakiraadityaa · plays after you enter</p>
                <p className="text-[var(--cream-dim)]">Changeable later in header</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
