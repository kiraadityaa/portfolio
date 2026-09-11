"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useThemeAudio } from "./ThemeAudioProvider";

export default function Footer() {
  const { muted, needsManualPlay, toggleMute, playManual } = useThemeAudio();
  const isMuted = muted || needsManualPlay;
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 border-t-2 border-[var(--paper)] pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">FA&rsquo;AL ADITYA PURNAMA</p>
            <p className="label-mono mt-2 text-[#8f897c]">Student / TKJ / Linux / Python</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.78rem]">
              <li>
                <a href="#about" className="underline-offset-4 hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#interests" className="underline-offset-4 hover:underline">
                  Interests
                </a>
              </li>
              <li>
                <a href="#education" className="underline-offset-4 hover:underline">
                  Education
                </a>
              </li>
              <li>
                <a href="#now" className="underline-offset-4 hover:underline">
                  Now
                </a>
              </li>
              <li>
                <a href="#contact" className="underline-offset-4 hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#top" className="underline-offset-4 hover:underline">
                  Back to top ↑
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-[#2c2a24] pt-5 font-mono text-[0.72rem] tracking-[0.1em] text-[#8f897c] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Fa&rsquo;al Aditya Purnama</p>
          <button
            type="button"
            onClick={isMuted ? playManual : toggleMute}
            aria-pressed={!isMuted}
            aria-label={isMuted ? "Play background music" : "Mute background music"}
            className="flex min-h-11 w-fit items-center gap-2 border border-[#3a372f] px-3.5 py-2 text-[#d8d2c4] transition-colors hover:border-[#e0684f] hover:text-[#e0684f]"
          >
            {isMuted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
            <span>
              {isMuted ? "Music off" : "Music on"} — bye x into you · hakiraadityaa
            </span>
          </button>
          <p>
            Built with curiosity<span aria-hidden="true" className="text-[#e0684f]">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
