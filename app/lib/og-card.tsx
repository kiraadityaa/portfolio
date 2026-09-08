import { SITE_URL } from "./site";

// Shared Open Graph / Twitter card artwork — paper & ink editorial concept.
// Satori (next/og) only: flexbox + inline styles, no grid, no webfonts
// (kept runtime-safe for Cloudflare Workers edge deployment).

const PAPER = "#F4F1EA";
const INK = "#141310";
const MUTED = "#656056";
const FAINT = "#8A8478";
const ACCENT = "#B3271A";
const CREAM = "#ECE7DB";
const SAND = "#8F897C";
const NIGHT_LINE = "#2E2B25";

const SANS = "Arial, Helvetica, sans-serif";
const MONO = "'Courier New', Courier, monospace";

const host = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return SITE_URL;
  }
})();

export function OgCard({ height }: { height: 630 | 600 }) {
  const s = height / 630;
  const pad = Math.round(56 * s);

  return (
    <div
      style={{
        width: 1200,
        height,
        display: "flex",
        background: PAPER,
        color: INK,
        fontFamily: SANS,
      }}
    >
      {/* red spine */}
      <div style={{ width: Math.round(16 * s), background: ACCENT }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: `${Math.round(40 * s)}px ${pad}px ${Math.round(32 * s)}px`,
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: MONO,
            fontSize: Math.round(25 * s),
            letterSpacing: 3,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: Math.round(15 * s),
                height: Math.round(15 * s),
                background: ACCENT,
                marginRight: Math.round(14 * s),
              }}
            />
            STUDENT / TKJ / LINUX / PYTHON
          </div>
          <div style={{ color: FAINT }}>PORTFOLIO — 2026</div>
        </div>

        {/* middle: name + terminal */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: Math.round(56 * s),
            marginTop: Math.round(10 * s),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.94,
              fontWeight: 900,
              letterSpacing: -4,
              fontSize: Math.round(128 * s),
            }}
          >
            <div>FA’AL</div>
            <div>ADITYA</div>
            <div style={{ color: ACCENT }}>PURNAMA.</div>
          </div>

          {/* terminal panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: Math.round(400 * s),
              background: INK,
              color: CREAM,
              padding: `${Math.round(22 * s)}px ${Math.round(24 * s)}px`,
              fontFamily: MONO,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: Math.round(20 * s),
                letterSpacing: 2,
                color: SAND,
                borderBottom: `1px solid ${NIGHT_LINE}`,
                paddingBottom: Math.round(14 * s),
                marginBottom: Math.round(16 * s),
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    gap: Math.round(8 * s),
                    marginRight: Math.round(14 * s),
                  }}
                >
                  <div
                    style={{
                      width: Math.round(13 * s),
                      height: Math.round(13 * s),
                      borderRadius: 999,
                      background: NIGHT_LINE,
                    }}
                  />
                  <div
                    style={{
                      width: Math.round(13 * s),
                      height: Math.round(13 * s),
                      borderRadius: 999,
                      background: NIGHT_LINE,
                    }}
                  />
                  <div
                    style={{
                      width: Math.round(13 * s),
                      height: Math.round(13 * s),
                      borderRadius: 999,
                      background: ACCENT,
                    }}
                  />
                </div>
                faal@linux
              </div>
              <div>bash</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: Math.round(23 * s),
                lineHeight: 1.7,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ color: "#E0684F" }}>$&nbsp;</span>
                <span>whoami</span>
              </div>
              <div style={{ color: SAND }}>student · tinkerer · tkj-12</div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ color: "#E0684F" }}>$&nbsp;</span>
                <span>cat focus.txt</span>
              </div>
              <div style={{ color: SAND }}>linux · python · network</div>
              <div
                style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              >
                <span style={{ color: "#E0684F" }}>$&nbsp;</span>
                <div
                  style={{
                    width: Math.round(14 * s),
                    height: Math.round(24 * s),
                    background: "#E0684F",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* bottom meta strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: Math.round(20 * s),
            fontFamily: MONO,
            fontSize: Math.round(24 * s),
            letterSpacing: 2,
          }}
        >
          <div style={{ color: MUTED }}>SMKN 1 KEMLAGI — GRADE 12</div>
          <div style={{ color: ACCENT }}>{host}</div>
        </div>
      </div>
    </div>
  );
}
