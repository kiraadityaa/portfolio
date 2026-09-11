import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { NOW_ITEMS, NOW_UPDATED } from "../data/now";

export default function NowSection() {
  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <Reveal>
          <div className="border-t-2 border-[var(--foreground)] pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="index-num flex items-center gap-2 text-[var(--muted)]">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-[var(--accent)]" />
                Status — log bulanan
              </p>
              <p className="label-mono hidden text-[var(--faint)] sm:block">
                Terakhir diupdate — {NOW_UPDATED}
              </p>
            </div>
            <h2 id="now-title" className="display-section mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">
              Sedang dipelajari
            </h2>
          </div>
        </Reveal>

        <ul className="mt-10">
          {NOW_ITEMS.map((item, i) => (
            <li key={item.label}>
              <Reveal delay={Math.min(i * 60, 180)}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 border-t border-[var(--border)] py-6 transition-colors last:border-b hover:bg-[var(--paper-deep)]/60 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-3"
                >
                  <span className="label-mono text-[var(--faint)]">{item.label}</span>
                  <span>
                    <span className="block text-[clamp(1.3rem,3vw,1.9rem)] font-bold tracking-tight group-hover:text-[var(--accent)]">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-[var(--ink-soft)]">
                      {item.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    className="hidden shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)] sm:block"
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="label-mono mt-6 text-[var(--faint)]">
            Log ini diupdate manual tiap bulan — kalau sudah basi, berarti saya lupa update.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
