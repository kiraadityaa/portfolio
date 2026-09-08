import Image from "next/image";
import Reveal from "./Reveal";
import Terminal from "./Terminal";

const WORDS = ["Open source", "CLI", "System", "Kernel", "Freedom", "Learning"];

export default function LinuxSection() {
  return (
    <section id="linux" aria-labelledby="linux-title" className="scroll-mt-20 bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8 lg:py-20">
        <Reveal>
          <div className="border-t-2 border-[var(--paper)] pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="index-num text-[#e0684f]">
                03 <span aria-hidden="true">—</span> Linux
              </p>
              <p className="label-mono hidden text-[#8f897c] sm:block">/home/faal — daily driver of curiosity</p>
            </div>
            <h2 id="linux-title" className="display-section mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">
              At home in the terminal
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-[#d8d2c4]">
              Linux is where things stopped being magic. The command line taught me
              to read error messages instead of fearing them — and open source
              showed me that software is something you can take apart, understand,
              and share back.
            </p>
            <ul aria-label="Linux concepts" className="mt-8 flex flex-wrap gap-2">
              {WORDS.map((w) => (
                <li
                  key={w}
                  className="border border-[#3a372f] px-3.5 py-2 font-mono text-[0.72rem] tracking-[0.14em] text-[#d8d2c4] uppercase transition-colors hover:border-[#e0684f] hover:text-[#e0684f]"
                >
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-[#e0684f] pl-4 font-mono text-[0.8rem] leading-relaxed text-[#8f897c]">
              No cyberpunk fantasy. Just a student, a shell,
              <br />
              and man pages.
            </p>
            <figure className="mt-8 flex items-center gap-4 border border-[#2c2a24] bg-[#1c1a16] p-3">
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden border border-[#3a372f]">
                <Image
                  src="/images/tux-lofi.svg"
                  alt="Maskot penguin Linux minimal dengan syal merah"
                  fill
                  sizes="64px"
                  loading="lazy"
                  className="object-cover"
                />
              </span>
              <figcaption className="font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-[#8f897c]">
                Fig. 04 — Tux, daily driver
                <span className="mt-1 block normal-case tracking-normal text-[#d8d2c4]">
                  Custom SVG, no distro was harmed.
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <Terminal />
          </Reveal>
        </div>

        <div aria-hidden="true" className="ticker mt-12 border-y border-[#2c2a24] py-3 font-mono text-[0.72rem] tracking-[0.2em] text-[#8f897c] uppercase">
          <div className="ticker-track">
            {[0, 1].map((half) => (
              <span key={half}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="mx-6">
                    open source · cli · system · kernel · freedom · learning ·
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
