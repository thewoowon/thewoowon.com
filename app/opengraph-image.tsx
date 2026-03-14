import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e0e0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* 상단 handle */}
        <span
          style={{
            fontSize: 14,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#525252",
          }}
        >
          {siteConfig.handle}
        </span>

        {/* 메인 카피 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 52,
              fontWeight: 600,
              color: "#fafafa",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.name}
          </span>
          <span
            style={{
              fontSize: 20,
              color: "#737373",
              lineHeight: 1.5,
              maxWidth: 640,
            }}
          >
            AI · 금융 · 연구 · 제품 · 엔지니어링이 교차하는 고밀도 개인 연구소
          </span>
        </div>

        {/* 하단 URL */}
        <span style={{ fontSize: 14, color: "#525252" }}>
          {siteConfig.url.replace("https://", "")}
        </span>
      </div>
    ),
    { ...size }
  );
}
