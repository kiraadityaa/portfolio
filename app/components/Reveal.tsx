"use client";

import { useEffect, useRef } from "react";
import { useThemeAudio } from "./ThemeAudioProvider";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "p" | "blockquote";
  className?: string;
};

export default function Reveal({ children, delay = 0, as = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Wait until the visitor enters the site (picks a theme) so scroll
  // animations don't play out hidden behind the intro overlay.
  const { entered } = useThemeAudio();

  useEffect(() => {
    if (!entered) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [entered]);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
