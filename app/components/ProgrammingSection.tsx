import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProgrammingSection() {
  return (
    <section id="programming" aria-labelledby="programming-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeading
          index="04"
          eyebrow="Programming"
          title="Python, line by line"
          note="Learning / Exploring / Understanding"
        />
        <h3 id="programming-title" className="sr-only">
          Programming and Python
        </h3>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="border border-[var(--border)] bg-[#faf8f3]">
              <figcaption className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
                <span className="label-mono text-[var(--muted)]">keep_learning.py</span>
                <span className="label-mono text-[var(--faint)]">decorative — not a project</span>
              </figcaption>
              <pre className="overflow-x-auto px-5 py-6 font-mono text-[0.85rem] leading-[1.75] sm:text-[0.92rem]">
                <code>
                  <span className="text-[var(--accent)]">def</span> <span className="font-medium">keep_learning</span>():
                  {"\n"}
                  {"    "}curiosity = <span className="text-[var(--accent)]">True</span>
                  {"\n\n"}
                  {"    "}<span className="text-[var(--accent)]">while</span> curiosity:
                  {"\n"}
                  {"        "}explore()
                  {"\n"}
                  {"        "}learn()
                  {"\n"}
                </code>
              </pre>
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="label-mono text-[var(--accent)]">Python</p>
            <p className="mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">
              Python is the language I reach for first. Its readability makes it a
              good place to practice thinking — breaking problems down, testing
              ideas, and reading other people&rsquo;s code.
            </p>
            <blockquote className="mt-8 border-l-2 border-[var(--foreground)] pl-5">
              <p className="text-[clamp(1.2rem,2.4vw,1.5rem)] font-medium leading-snug tracking-tight">
                &ldquo;Learning programming is less about knowing everything and more
                about continuously understanding how things work.&rdquo;
              </p>
            </blockquote>
            <p className="label-mono mt-6 text-[var(--faint)]">— my working note to self</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
