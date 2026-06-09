import type { SVGProps } from "react";

export function HeroArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      role="img"
      aria-label="A phone showing a vertical reading feed with a highlighted bilingual sentence, a swipe-up gesture and a morning sun"
      {...props}
    >
      <g stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round">
        <circle cx="402" cy="92" r="19" />
        <path d="M402 56v-12" />
        <path d="M402 140v-12" />
        <path d="M438 92h12" />
        <path d="M354 92h12" />
        <path d="M428 66l8-8" />
        <path d="M368 126l8-8" />
        <path d="M428 118l8 8" />
        <path d="M368 58l8 8" />
      </g>

      <path
        d="M96 70c0 9 3 12 12 12-9 0-12 3-12 12 0-9-3-12-12-12 9 0 12-3 12-12Z"
        fill="var(--accent-2)"
        opacity="0.85"
      />

      <g style={{ fontFamily: "var(--font-ui, sans-serif)" }}>
        <rect x="40" y="150" width="86" height="34" rx="17" fill="var(--accent-soft)" />
        <text
          x="83"
          y="172"
          textAnchor="middle"
          style={{ fontWeight: 600, fontSize: "16px" }}
          fill="var(--accent)"
        >
          Hello
        </text>

        <rect x="60" y="198" width="104" height="34" rx="17" fill="var(--accent-2-soft)" />
        <text
          x="112"
          y="220"
          textAnchor="middle"
          style={{ fontWeight: 600, fontSize: "16px" }}
          fill="var(--accent-2)"
        >
          Xin chào
        </text>
      </g>
      <path
        d="M120 188q8 6 4 14"
        stroke="var(--text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 5"
        opacity="0.4"
      />

      <rect x="218" y="46" width="84" height="20" rx="10" fill="var(--accent-2-soft)" opacity="0.85" />

      <rect
        x="197"
        y="58"
        width="126"
        height="238"
        rx="26"
        fill="var(--surface-2)"
        stroke="currentColor"
        strokeWidth="3.4"
      />
      <rect x="207" y="72" width="106" height="210" rx="15" fill="var(--surface)" />
      <rect x="244" y="78" width="32" height="5" rx="2.5" fill="var(--border-strong)" />

      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity="0.28">
        <path d="M223 100h60" />
        <path d="M223 111h44" />
      </g>

      <rect x="220" y="124" width="80" height="32" rx="8" fill="var(--highlight)" />
      <path d="M229 136h52" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M229 147h40" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" />

      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity="0.28">
        <path d="M223 172h68" />
        <path d="M223 183h56" />
        <path d="M223 194h40" />
      </g>

      <rect x="244" y="268" width="32" height="4" rx="2" fill="currentColor" opacity="0.22" />

      <g
        stroke="var(--accent)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M384 232l8-8 8 8" opacity="0.45" />
        <path d="M384 246l8-8 8 8" opacity="0.75" />
      </g>
      <circle cx="392" cy="266" r="10" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3.2" />
    </svg>
  );
}
