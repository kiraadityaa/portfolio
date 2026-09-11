"use client";

import { Check, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useThemeAudio, type SiteTheme } from "./ThemeAudioProvider";

const LINKS = [
  { href: "#about", label: "About", meta: "Who I am" },
  { href: "#interests", label: "Interests", meta: "What pulls me" },
  { href: "#education", label: "Education", meta: "SMKN 1 Kemlagi" },
  { href: "#contact", label: "Contact", meta: "Say hello" },
];

const THEMES: {
  id: SiteTheme;
  label: string;
  hint: string;
  desc: string;
}[] = [
  {
    id: "default",
    label: "Paper",
    hint: "Warm · red accent",
    desc: "Warm paper, ink text, red accent for reading.",
  },
  {
    id: "mono",
    label: "Mono",
    hint: "Gray · focus",
    desc: "Full grayscale, no color distraction.",
  },
];

function ThemeMiniMock({ id }: { id: SiteTheme }) {
  const mono = id === "mono";
  return (
    <span
      aria-hidden="true"
      className={`block border-2 p-2 transition-colors ${
        mono ? "border-[#1a1a1a] bg-[#ececec]" : "border-[#141310] bg-[#f4f1ea]"
      }`}
    >
      <span className="flex items-center gap-1.5">
        <i className={`h-2.5 w-7 not-italic ${mono ? "bg-[#1a1a1a]" : "bg-[#141310]"}`} />
        <i className={`h-2.5 w-4 not-italic ${mono ? "bg-[#555]" : "bg-[#b3271a]"}`} />
      </span>
      <span
        className="mt-1.5 block text-[0.8rem] font-bold leading-none tracking-tight"
        style={{ color: mono ? "#1a1a1a" : "#141310" }}
      >
        Aa — {mono ? "Focus" : "Editorial"}
      </span>
      <span className={`mock-bar mt-1.5 block w-11/12 ${mono ? "bg-[#8c8c8c]" : "bg-[#d4cec0]"}`} />
      <span className={`mock-bar mt-1 block w-2/3 ${mono ? "bg-[#b5b5b5]" : "bg-[#ebe6da]"}`} />
    </span>
  );
}

function ThemePopover({
  align = "right",
  placement = "desktop",
  onClose,
}: {
  align?: "right" | "left";
  placement?: "desktop" | "mobile";
  onClose?: () => void;
}) {
  const { theme, preview, setPreview, setThemeChoice } = useThemeAudio();
  const shown = preview ?? theme;
  const isMobile = placement === "mobile";

  return (
    <div
      role="dialog"
      aria-label="Choose theme"
      className={`theme-popover z-[60] border-2 border-[var(--foreground)] bg-[var(--background)] p-2 shadow-[4px_4px_0_var(--foreground)] ${
        isMobile
          ? /* Sheet tetap selebar viewport — mustahil overflow kiri/kanan
               di layar portrait berapa pun. */
            "fixed inset-x-4 top-[4.5rem]"
          : `absolute top-[calc(100%+10px)] w-[19rem] ${
              align === "right" ? "right-0" : "left-0"
            }`
      } max-h-[calc(100dvh-5.5rem)] overflow-y-auto`}
    >
      <p className="flex items-center justify-between px-2 pb-2 pt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        <span>Theme — {shown}</span>
        <span aria-hidden="true">1 / 2</span>
      </p>
      <div role="radiogroup" aria-label="Theme options" className="grid gap-2">
        {THEMES.map((t) => {
          const active = theme === t.id;
          const focused = shown === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setThemeChoice(t.id);
                onClose?.();
              }}
              onMouseEnter={() => setPreview(t.id)}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview(t.id)}
              onBlur={() => setPreview(null)}
              data-active={focused}
              className={`theme-option-light theme-option border-2 p-2.5 text-left ${
                focused
                  ? "border-[var(--accent)]"
                  : "border-[var(--border)] hover:border-[var(--accent)]"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`swatch-split h-4 w-4 ${t.id === "default" ? "swatch-paper" : "swatch-mono"}`}
                  />
                  <span className="text-[0.95rem] font-bold tracking-tight">{t.label}</span>
                </span>
                {active && (
                  <span className="flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                    <Check size={13} aria-hidden="true" /> Active
                  </span>
                )}
              </span>
              <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                {t.hint}
              </span>
              <span className="mt-2 block">
                <ThemeMiniMock id={t.id} />
              </span>
              {/* Deskripsi disembunyikan di sheet mobile agar panel ramping;
                  label + hint + mock sudah cukup menjelaskan. */}
              {!isMobile && (
                <span className="mt-2 block text-[0.8rem] leading-snug text-[var(--ink-soft)]">
                  {t.desc}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="px-2 pb-1 pt-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-[var(--faint)]">
        {isMobile ? "Tap to preview & apply." : "Hover to preview live — click to apply. Saved automatically."}
      </p>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const { theme, setPreview, setThemeChoice } = useThemeAudio();
  const themeWrapRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const indexTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const closeMenu = useCallback(() => {
    // Anti double-tap: abaikan permintaan tutup saat animasi keluar jalan.
    if (closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      // Kembalikan fokus ke tombol pemicu agar pengguna keyboard/screen
      // reader tidak kehilangan posisi setelah overlay tertutup.
      indexTriggerRef.current?.focus({ preventScroll: true });
    }, 300);
  }, [closing]);

  // Bersihkan timer tutup bila komponen unmount di tengah animasi keluar.
  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      firstLinkRef.current?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMenu();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closeMenu ]);

  // Tutup popover saat klik di luar / ESC, dan bersihkan preview.
  useEffect(() => {
    if (!themeOpen) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (themeWrapRef.current?.contains(t)) return;
      setThemeOpen(false);
      setPreview(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setThemeOpen(false);
        setPreview(null);
      }
      if (e.key === "1" || e.key === "2") setThemeOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [themeOpen, setPreview]);

  const currentLabel = theme === "default" ? "Paper" : "Mono";

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b bg-[var(--background)]/95 backdrop-blur-sm ${
        scrolled ? "border-[var(--border)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="group flex min-h-11 flex-col justify-center leading-none">
          <span className="text-[0.95rem] font-bold tracking-[-0.01em]">
            FA&rsquo;AL ADITYA PURNAMA
          </span>
          <span className="label-mono mt-1 text-[var(--muted)]">Student / TKJ</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`label-mono relative py-2 transition-colors ${
                active === l.href ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              {l.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-[var(--accent)] transition-transform ${
                  active === l.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
          <div ref={themeWrapRef} className="relative">
            <button
              type="button"
              onClick={() => setThemeOpen((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={themeOpen}
              aria-label={`Theme: ${currentLabel}. Open theme picker.`}
              title="Choose theme — hover to preview live"
              className={`label-mono flex min-h-9 items-center gap-2 border-2 px-3 py-2 transition-colors ${
                themeOpen
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--foreground)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`swatch-split h-3.5 w-3.5 ${theme === "default" ? "swatch-paper" : "swatch-mono"}`}
              />
              {currentLabel}
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform ${themeOpen ? "rotate-180" : ""}`}
              />
            </button>
            {themeOpen && <ThemePopover align="right" onClose={() => setThemeOpen(false)} />}
          </div>
          <a
            href="#contact"
            className="label-mono border border-[var(--foreground)] px-4 py-2.5 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          >
            Say hello
          </a>
        </nav>

        {/* Mobile: satu tombol Index — menu takeover full-screen,
            tanpa dropdown generik dan tanpa popover absolut. */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            ref={indexTriggerRef}
            className="label-mono flex min-h-11 min-w-11 items-center justify-center gap-2 border-2 border-[var(--foreground)] px-4 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-expanded={open}
            aria-controls="mobile-takeover"
            aria-label={open ? "Close index menu" : "Open index menu"}
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            {open ? "Close ×" : "Index №"}
          </button>
        </div>
      </div>
    </header>

    {/* Broadsheet takeover — overlay full-screen khusus mobile, di luar
        <header> agar fixed benar-benar relatif ke viewport (backdrop-blur
        di header membentuk containing block bagi fixed descendants). */}
    {open && (
      <div
        id="mobile-takeover"
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        className={`fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[var(--night)] text-[var(--cream)] md:hidden ${
          closing ? "takeover-exit pointer-events-none" : ""
        }`}
      >
        <div aria-hidden="true" className="grid-dark pointer-events-none fixed inset-0 opacity-100" />
        {/* Top bar sticky dengan tombol batal — satu-satunya jalan keluar
            tanpa navigasi bagi pengguna touchscreen (tombol Close di header
            tertutup overlay ini). Selalu terlihat walau daftar di-scroll. */}
        <div className="sticky top-0 z-10 border-b border-[var(--night-line)] bg-[var(--night)]">
          <div className="mx-auto flex w-full max-w-[76rem] items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <p className="flex min-w-0 flex-1 items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--sand)]">
              <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 bg-[var(--accent-soft)]" />
              <span className="truncate">Index — the whole paper</span>
            </p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close index menu, back to page"
              className="flex min-h-11 shrink-0 items-center justify-center border-2 border-[var(--cream)]/70 px-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--cream)] transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--accent-soft)]"
            >
              Close ×
            </button>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[76rem] flex-1 flex-col px-5 py-5 sm:px-8">
          <p className="intro-fade flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--sand)]" style={{ ["--d" as string]: "0ms" }}>
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-[var(--accent-soft)]" />
            <span className="truncate">Browse by section</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--night-line)]" />
            <span className="shrink-0">№ 01–04</span>
          </p>

          <nav aria-label="Mobile" className="mt-6 flex-1">
            <ul>
              {LINKS.map((l, i) => (
                <li key={l.href} className={i > 0 ? "border-t border-[var(--night-line)]" : "border-t border-[var(--night-line)]"}>
                  <a
                    href={l.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={closeMenu}
                    aria-current={active === l.href ? "true" : undefined}
                    className="intro-fade group flex min-h-[5.5rem] items-baseline justify-between gap-4 py-4 outline-none"
                    style={{ ["--d" as string]: `${80 + i * 90}ms` }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-mono text-[0.8rem] text-[var(--accent-soft)]">
                        0{i + 1}
                      </span>
                      <span className="display-section text-[clamp(2.2rem,11vw,3.5rem)] transition-colors group-hover:text-[var(--accent-soft)] group-focus-visible:text-[var(--accent-soft)]">
                        {l.label}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--sand)]">
                      {l.meta}
                    </span>
                  </a>
                </li>
              ))}
              <li aria-hidden="true" className="border-t border-[var(--night-line)]" />
            </ul>
          </nav>

          <div className="intro-fade mt-6 border-t border-[var(--night-line)] pt-4" style={{ ["--d" as string]: "460ms" }}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--sand)]">
              Theme — {currentLabel}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Theme">
              {(["default", "mono"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setThemeChoice(t)}
                  aria-pressed={theme === t}
                  className={`flex min-h-12 items-center justify-center gap-2 border-2 px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                    theme === t
                      ? "border-[var(--accent-soft)] text-[var(--accent-soft)]"
                      : "border-[var(--night-faint)] text-[var(--cream-dim)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`swatch-split h-3.5 w-3.5 ${t === "default" ? "swatch-paper" : "swatch-mono"}`}
                  />
                  {t === "default" ? "Paper" : "Mono"}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-3 flex min-h-12 items-center justify-center border border-[var(--night-faint)] px-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--cream)] transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--accent-soft)]"
            >
              Say hello →
            </a>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--sand)]">
              Fig. — Index · Fa&rsquo;al Aditya Purnama
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
