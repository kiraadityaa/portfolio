import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  {
    n: "A",
    title: "Linux",
    body: "Eksplorasi sistem operasi Linux, command line, tools, environment, dan open-source ecosystem.",
    meta: "OS / CLI / OPEN-SOURCE",
    span: true,
  },
  {
    n: "B",
    title: "Programming",
    body: "Ketertarikan terhadap logika pemrograman, problem solving, dan bagaimana software bekerja.",
    meta: "LOGIC / SYSTEMS",
    span: false,
  },
  {
    n: "C",
    title: "Python",
    body: "Bahasa pemrograman yang sedang dipelajari dan dieksplorasi — baris demi baris.",
    meta: "LEARNING NOW",
    span: false,
  },
  {
    n: "D",
    title: "Computer Networking",
    body: "Bidang yang berkaitan dengan pendidikan TKJ dan ketertarikan terhadap komputer serta jaringan.",
    meta: "TKJ / NETWORK",
    span: false,
  },
];

export default function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeading
          index="02"
          eyebrow="Interests"
          title="What pulls my attention"
          note="4 FIELDS / 1 CURIOSITY"
        />
        <h3 id="interests-title" className="sr-only">
          Interests
        </h3>

        <ol className="mt-10 border-t-2 border-[var(--foreground)]">
          {ITEMS.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={Math.min(i * 60, 180)}>
                <article
                  className={`group grid gap-4 border-b border-[var(--border)] py-7 transition-colors hover:bg-[var(--paper-deep)]/60 sm:py-8 lg:grid-cols-12 lg:items-baseline lg:gap-6 ${
                    item.span ? "lg:py-10" : ""
                  }`}
                >
                  <p aria-hidden="true" className="label-mono text-[var(--faint)] lg:col-span-1">
                    ({item.n})
                  </p>
                  <h4
                    className={`font-bold uppercase tracking-[-0.02em] lg:col-span-4 ${
                      item.span
                        ? "text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95]"
                        : "text-[clamp(1.6rem,3.6vw,2.6rem)] leading-none"
                    }`}
                  >
                    <span className="transition-colors group-hover:text-[var(--accent)]">
                      {item.title}
                    </span>
                  </h4>
                  <p className="max-w-xl text-[0.98rem] leading-relaxed text-[var(--ink-soft)] lg:col-span-5">
                    {item.body}
                  </p>
                  <p className="label-mono text-[var(--muted)] lg:col-span-2 lg:text-right">
                    {item.meta}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
