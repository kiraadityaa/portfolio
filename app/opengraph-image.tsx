import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F4F1EA",
          color: "#141310",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ width: 14, background: "#B3271A" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              color: "#656056",
            }}
          >
            STUDENT / TKJ / LINUX / PYTHON
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>FA&rsquo;AL ADITYA</div>
            <div>PURNAMA</div>
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 3,
              color: "#B3271A",
              marginTop: 28,
            }}
          >
            SMKN 1 KEMLAGI — GRADE 12
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
