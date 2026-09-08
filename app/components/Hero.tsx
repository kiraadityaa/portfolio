import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]" />
      <div className="relative mx-auto w-full max-w-[76rem] px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-20">
        <Reveal>
          <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[var(--muted)]">
            <span className="inline-block h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
            <span>16 years old</span>
            <span aria-hidden="true">/</span>
            <span>SMKN 1 Kemlagi</span>
            <span aria-hidden="true">/</span>
            <span>TKJ — Grade 12</span>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1
            id="hero-title"
            className="display-hero mt-6 text-[clamp(3.2rem,11.5vw,10.5rem)]"
          >
            Fa&rsquo;al
            <br />
            Aditya
            <br />
            <span className="text-[var(--accent)]">Purnama</span>
            <span aria-hidden="true" className="text-[var(--accent)]">
              .
            </span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 border-t-2 border-[var(--foreground)] pt-6 lg:grid-cols-12">
          <Reveal delay={140} className="lg:col-span-5">
            <p className="label-mono text-[var(--accent)]">Positioning</p>
            <p className="mt-3 text-[clamp(1.25rem,2.6vw,1.7rem)] font-semibold leading-snug tracking-tight">
              Student. Linux enthusiast.
              <br />
              Python learner.
            </p>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-4">
            <p className="label-mono text-[var(--muted)]">In short</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
              A 16-year-old vocational student exploring Linux, programming, Python,
              networking, and the world of technology.
            </p>
          </Reveal>
          <Reveal delay={260} className="lg:col-span-3">
            <p className="label-mono text-[var(--muted)]">Index</p>
            <ol className="mt-3 space-y-2 font-mono text-[0.8rem]">
              <li>
                <a href="#about" className="u-link">
                  01 — About
                </a>
              </li>
              <li>
                <a href="#interests" className="u-link">
                  02 — Interests
                </a>
              </li>
              <li>
                <a href="#linux" className="u-link">
                  03 — Linux
                </a>
              </li>
              <li>
                <a href="#programming" className="u-link">
                  04 — Programming
                </a>
              </li>
              <li>
                <a href="#education" className="u-link">
                  05 — Education
                </a>
              </li>
              <li>
                <a href="#now" className="u-link">
                  ∗ — Now, sedang dipelajari
                </a>
              </li>
              <li>
                <a href="#contact" className="u-link">
                  06 — Contact
                </a>
              </li>
            </ol>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <figure className="mt-10 border-2 border-[var(--foreground)] bg-[var(--paper-deep)]/40">
            <div className="relative aspect-[16/7] w-full overflow-hidden">
              <Image
                src="/images/anime-hero.jpg"
                alt="Ilustrasi anime lo-fi seorang pelajar begadang belajar di meja dengan lampu hangat"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="img-duotone object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-[var(--foreground)] px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              <span>Fig. 01 — Night shift / lo-fi</span>
              <span className="text-[var(--faint)]">StockCake royalty-free</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
