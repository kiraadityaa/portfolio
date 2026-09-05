import { ArrowUpRight, Camera, GitBranch, MessageCircle, Music2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CONTACTS = [
  {
    label: "GitHub",
    handle: "kiraadityaa",
    href: "https://github.com/kiraadityaa",
    Icon: GitBranch,
    note: "code & experiments",
  },
  {
    label: "WhatsApp",
    handle: "6281553362795",
    href: "https://wa.me/6281553362795",
    Icon: MessageCircle,
    note: "fastest reply",
  },
  {
    label: "Instagram",
    handle: "@aaaditz_",
    href: "https://instagram.com/aaaditz_",
    Icon: Camera,
    note: "daily bits",
  },
  {
    label: "TikTok",
    handle: "@kiraadityaa",
    href: "https://tiktok.com/@kiraadityaa",
    Icon: Music2,
    note: "short things",
  },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeading
          index="06"
          eyebrow="Let's connect"
          title="Say hello"
          note="REPLIES — WHEN NOT IN CLASS"
        />
        <h3 id="contact-title" className="sr-only">
          Contact
        </h3>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[clamp(1.1rem,2.2vw,1.4rem)] font-medium leading-snug tracking-tight">
              Curious about Linux, programming, or Python?
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--ink-soft)]">
              Want to exchange ideas or simply make a new friend? Feel free to reach
              out — I&rsquo;m usually around after school hours.
            </p>
            <p className="label-mono mt-8 text-[var(--faint)]">Pick whichever you use most ↓</p>
          </Reveal>
          <ul className="lg:col-span-7">
            {CONTACTS.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={Math.min(i * 60, 180)}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[var(--border)] py-5 transition-colors last:border-b hover:bg-[var(--paper-deep)]/60 sm:gap-5 sm:px-3"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center border border-[var(--foreground)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white"
                    >
                      <c.Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="label-mono block text-[var(--muted)]">{c.label} — {c.note}</span>
                      <span className="mt-0.5 block truncate text-lg font-bold tracking-tight group-hover:text-[var(--accent)]">
                        {c.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={20}
                      className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
