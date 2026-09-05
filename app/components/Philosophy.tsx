import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section aria-label="Personal philosophy" className="border-y-2 border-[var(--foreground)] bg-[var(--paper-deep)]/50">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <p className="label-mono text-center text-[var(--muted)]">A note I actually live by</p>
          <blockquote className="mx-auto mt-6 max-w-4xl text-center">
            <p className="text-[clamp(1.9rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              &ldquo;Stay curious. Keep learning.{" "}
              <span className="text-[var(--accent)]">Understand how things work.</span>&rdquo;
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
