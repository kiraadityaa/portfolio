"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type SiteTheme = "default" | "mono";

type ThemeAudioState = {
  theme: SiteTheme;
  preview: SiteTheme | null;
  setPreview: (t: SiteTheme | null) => void;
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
  // Default "default" di server + first paint; inline script di layout
  // sudah set data-theme sebelum hydrate, lalu effect di bawah
  // menyinkronkan state React tanpa hydration mismatch.
  const [theme, setTheme] = useState<SiteTheme>("default");
  const [preview, setPreview] = useState<SiteTheme | null>(null);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef<boolean>(false);

  // Sinkronisasi sekali setelah mount: stored theme + stored muted.
  // Sync localStorage -> state ini legitimate (external system), bukan derived state.
  useEffect(() => {
    const storedTheme = readStoredTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(storedTheme);
    document.documentElement.dataset.theme = storedTheme;
    const storedMuted = readStoredMuted();
    setMuted(storedMuted);
    mutedRef.current = storedMuted;
  }, []);

  // Preview sementara (hover di picker): ubah data-theme tanpa persist,
  // restore ke theme tersimpan saat preview selesai.
  useEffect(() => {
    if (!preview) return;
    document.documentElement.dataset.theme = preview;
    return () => {
      document.documentElement.dataset.theme = theme;
    };
  }, [preview, theme]);

  const setThemeChoice = useCallback((choice: SiteTheme) => {
    setTheme(choice);
    setPreview(null);
    const apply = () => applyTheme(choice);
    // View Transition untuk pergantian tema yang halus, fallback ke CSS transition.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (typeof doc.startViewTransition === "function") {
      try {
        doc.startViewTransition(apply);
        return;
      } catch {
        /* fallback di bawah */
      }
    }
    apply();
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
      value={{ theme, preview, setPreview, entered, muted, needsManualPlay, enter, setThemeChoice, toggleMute, playManual }}
    >
      {children}
      {/* preload="none" — musik di-fetch saat enter() memanggil play(),
          bukan saat gate dibuka, agar entry di mobile tetap ringan. */}
      <audio ref={audioRef} loop preload="none" src="/audio/background-music.mp3" />
    </ThemeAudioContext.Provider>
  );
}

export function useThemeAudio() {
  const ctx = useContext(ThemeAudioContext);
  if (!ctx) throw new Error("useThemeAudio must be used within ThemeAudioProvider");
  return ctx;
}
