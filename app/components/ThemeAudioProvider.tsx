"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type SiteTheme = "default" | "mono";

type ThemeAudioState = {
  theme: SiteTheme;
  entered: boolean;
  muted: boolean;
  needsManualPlay: boolean;
  enter: (choice: SiteTheme) => void;
  setThemeChoice: (choice: SiteTheme) => void;
  toggleMute: () => void;
  playManual: () => void;
};

const ThemeAudioContext = createContext<ThemeAudioState | null>(null);

const THEME_KEY = "fap-theme";
const MUTED_KEY = "fap-muted";

function applyTheme(theme: SiteTheme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
}

function readStoredTheme(): SiteTheme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "mono" || t === "default") return t;
  } catch {
    /* storage unavailable */
  }
  return "default";
}

function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function ThemeAudioProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>(() =>
    typeof window === "undefined" ? "default" : readStoredTheme()
  );
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState<boolean>(() =>
    typeof window === "undefined" ? false : readStoredMuted()
  );
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef<boolean>(typeof window !== "undefined" && readStoredMuted());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setThemeChoice = useCallback((choice: SiteTheme) => {
    setTheme(choice);
    applyTheme(choice);
  }, []);

  const enter = useCallback(
    (choice: SiteTheme) => {
      setThemeChoice(choice);
      setEntered(true);
      const audio = audioRef.current;
      if (audio) {
        audio.muted = mutedRef.current;
        if (!mutedRef.current) {
          audio.play().catch(() => setNeedsManualPlay(true));
        }
      }
    },
    [setThemeChoice]
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      try {
        localStorage.setItem(MUTED_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      const audio = audioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) {
          audio.play().catch(() => setNeedsManualPlay(true));
        }
      }
      if (!next) setNeedsManualPlay(false);
      return next;
    });
  }, []);

  const playManual = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      audio.play().then(
        () => {
          setNeedsManualPlay(false);
          setMuted(false);
          mutedRef.current = false;
          try {
            localStorage.setItem(MUTED_KEY, "0");
          } catch {
            /* ignore */
          }
        },
        () => setNeedsManualPlay(true)
      );
    }
  }, []);

  return (
    <ThemeAudioContext.Provider
      value={{ theme, entered, muted, needsManualPlay, enter, setThemeChoice, toggleMute, playManual }}
    >
      {children}
      <audio ref={audioRef} loop preload="auto" src="/audio/background-music.mp3" />
    </ThemeAudioContext.Provider>
  );
}

export function useThemeAudio() {
  const ctx = useContext(ThemeAudioContext);
  if (!ctx) throw new Error("useThemeAudio must be used within ThemeAudioProvider");
  return ctx;
}
