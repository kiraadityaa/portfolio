import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeading index="01" eyebrow="About" title="Who I am" note="ID — FAP / 16 / TKJ" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div id="about-title" className="sr-only">
              Who I am
            </div>
            <p className="max-w-2xl text-[clamp(1.15rem,2.4vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.01em]">
              Fa&rsquo;al Aditya Purnama adalah seorang pelajar berusia 16 tahun yang
              sedang menempuh pendidikan di SMKN 1 Kemlagi, jurusan Teknik Komputer
              dan Jaringan (TKJ), dan saat ini berada di kelas 12.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)]">
              Ia memiliki ketertarikan besar terhadap dunia komputer dan teknologi,
              terutama Linux, programming, dan Python. Sebagian besar waktunya
              dihabiskan untuk mencoba hal baru di depan layar — membaca dokumentasi,
              bereksperimen dengan sistem, dan memahami cara kerja sesuatu sampai
              benar-benar masuk akal.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="border-2 border-[var(--foreground)] bg-[var(--paper-deep)]/40">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about-lofi.svg"
                  alt="Ilustrasi lo-fi meja programmer dengan laptop, lampu, dan kucing tidur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[var(--border)] px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                Fig. 02 — Desk setup / custom SVG
              </figcaption>
            </figure>
            <dl className="mt-8 border-t border-[var(--border)] font-mono text-[0.8rem]">
              {[
                ["Name", "Fa'al Aditya Purnama"],
                ["Age", "16"],
                ["Status", "Student"],
                ["School", "SMKN 1 Kemlagi"],
                ["Major", "TKJ — Komputer & Jaringan"],
                ["Grade", "12"],
                ["Focus", "Linux / Python / Network"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[7rem_1fr] gap-3 py-3 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
                >
                  <dt className="uppercase tracking-[0.12em] text-[var(--faint)]">{k}</dt>
                  <dd className="text-[var(--foreground)]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
