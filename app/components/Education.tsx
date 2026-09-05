import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ROWS = [
  { year: "2023", title: "Entered SMKN 1 Kemlagi", body: "Started the TKJ track — Teknik Komputer dan Jaringan." },
  { year: "2024", title: "Networks + systems", body: "Classroom foundations in computers and networking; first serious time spent inside Linux." },
  { year: "2025", title: "Python, deliberately", body: "Learning programming properly — logic, problem solving, reading code, writing small things to understand big ideas." },
  { year: "2026", title: "Grade 12 — now", body: "Final year as a student. Still exploring, still asking how things work." },
];

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeading
          index="05"
          eyebrow="Education"
          title="SMKN 1 Kemlagi"
          note="TKJ / Grade 12 / Student"
        />
        <h3 id="education-title" className="sr-only">
          Education
        </h3>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="space-y-5 border-l-2 border-[var(--accent)] pl-5">
              <div>
                <dt className="label-mono text-[var(--muted)]">Program</dt>
                <dd className="mt-1 font-semibold">Teknik Komputer dan Jaringan</dd>
              </div>
              <div>
                <dt className="label-mono text-[var(--muted)]">Level</dt>
                <dd className="mt-1 font-semibold">Grade 12</dd>
              </div>
              <div>
                <dt className="label-mono text-[var(--muted)]">Status</dt>
                <dd className="mt-1 font-semibold">Student</dd>
              </div>
            </dl>
          </Reveal>
          <ol className="lg:col-span-8">
            {ROWS.map((r, i) => (
              <li key={r.year}>
                <Reveal delay={Math.min(i * 60, 180)}>
                  <article className="grid gap-2 border-t border-[var(--border)] py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
                    <p className="font-mono text-sm font-medium text-[var(--accent)]">{r.year}</p>
                    <div>
                      <h4 className="text-lg font-bold tracking-tight">{r.title}</h4>
                      <p className="mt-1 max-w-xl text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                        {r.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
            <li aria-hidden="true" className="border-t border-[var(--border)]" />
          </ol>
        </div>
      </div>
    </section>
  );
}
