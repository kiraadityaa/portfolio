"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#interests", label: "Interests" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
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
          <a
            href="#contact"
            className="label-mono border border-[var(--foreground)] px-4 py-2.5 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          >
            Say hello
          </a>
        </nav>

        <button
          type="button"
          className="label-mono flex min-h-11 min-w-11 items-center justify-center gap-2 border border-[var(--foreground)] px-4 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="inline-flex flex-col gap-1">
            <span className={`block h-[2px] w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--border)] bg-[var(--background)] md:hidden"
        >
          <ul className="mx-auto w-full max-w-[76rem] px-5 py-2 sm:px-8">
            {LINKS.map((l, i) => (
              <li key={l.href} className={i > 0 ? "border-t border-[var(--border)]" : ""}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between py-3 text-xl font-semibold tracking-tight"
                >
                  {l.label}
                  <span aria-hidden="true" className="font-mono text-xs text-[var(--faint)]">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
