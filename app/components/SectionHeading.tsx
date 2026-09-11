import Reveal from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  note?: string;
};

export default function SectionHeading({ index, eyebrow, title, note }: Props) {
  return (
    <Reveal>
      <div className="border-t-2 border-[var(--foreground)] pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="index-num text-[var(--accent)]">
            {index} <span aria-hidden="true">—</span> {eyebrow}
          </p>
          {note ? (
            <p className="label-mono hidden text-[var(--faint)] sm:block">{note}</p>
          ) : null}
        </div>
        <h2 className="display-section mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h2>
      </div>
    </Reveal>
  );
}
