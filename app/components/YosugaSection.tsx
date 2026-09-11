import Image from "next/image";
import Reveal from "./Reveal";

const FACTS: [string, string][] = [
  ["Studio", "feel."],
  ["Episodes", "12"],
  ["Aired", "Fall 2010"],
  ["Source", "Visual novel (Sphere)"],
  ["Favorite", "Sora Kasugano"],
];

export default function YosugaSection() {
  return (
    <section aria-labelledby="yosuga-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <Reveal>
          <div className="border-t-2 border-[var(--foreground)] pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="index-num text-[var(--accent)]">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-[var(--accent)]" />{" "}
                Off-screen — what I watch
              </p>
              <p className="label-mono hidden text-[var(--faint)] sm:block">
                Anime / Autumn 2010
              </p>
            </div>
            <h2 id="yosuga-title" className="display-section mt-5 text-[clamp(2rem,5.5vw,4.2rem)]">
              Yosuga no Sora
            </h2>
            <p className="label-mono mt-3 text-[var(--muted)]">
              In solitude, where we are least alone
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-2xl text-[clamp(1.15rem,2.4vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.01em]">
              Anime 12 episode tentang si kembar Haruka dan Sora Kasugano yang
              kembali ke desa masa kecil mereka setelah kehilangan kedua orang
              tua — dan perlahan mengingat kembali semuanya.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)]">
              Saya suka sisi tenangnya: desa pegunungan yang sunyi, musim panas
              yang lambat, dan musik latar yang lembut. Di tengah semua itu ada{" "}
              <span className="font-semibold text-[var(--foreground)]">Sora Kasugano</span>{" "}
              — karakter favorit saya, yang fotonya juga saya pajang di{" "}
              <a href="#about" className="u-link">
                bagian About
              </a>
              .
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px border-2 border-[var(--foreground)] bg-[var(--border)] sm:grid-cols-3">
              {FACTS.map(([k, v]) => (
                <div key={k} className="bg-[var(--background)] px-4 py-3">
                  <dt className="label-mono text-[var(--faint)]">{k}</dt>
                  <dd className="mt-1 text-[0.95rem] font-semibold tracking-tight">{v}</dd>
                </div>
              ))}
              <div className="bg-[var(--background)] px-4 py-3">
                <dt className="label-mono text-[var(--faint)]">More</dt>
                <dd className="mt-1 text-[0.95rem] font-semibold tracking-tight">
                  <a
                    href="https://myanimelist.net/anime/8861/Yosuga_no_Sora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link"
                  >
                    MyAnimeList ↗
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="border-2 border-[var(--foreground)] bg-[var(--paper-deep)]/40">
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Image
                  src="/images/yosuga-no-sora-poster.jpg"
                  alt="Poster anime Yosuga no Sora (2010)"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  loading="lazy"
                  className="img-duotone object-cover object-top"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                <span>Fig. — Key visual</span>
                <span className="text-[var(--faint)]">Poster via TMDB</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
