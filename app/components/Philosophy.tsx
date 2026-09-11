import Image from "next/image";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section aria-label="Personal philosophy" className="relative overflow-hidden border-y-2 border-[var(--foreground)] bg-[var(--paper-deep)]/50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/anime-evening.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="img-duotone object-cover opacity-[0.14] grayscale"
        />
        <div className="absolute inset-0 bg-[var(--paper-deep)]/60" />
      </div>
      <div className="relative mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 lg:py-24">
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
