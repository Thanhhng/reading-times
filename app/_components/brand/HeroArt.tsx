import type { SVGProps } from "react";

export function HeroArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 240" fill="none" {...props}>
      <circle cx="248" cy="58" r="22" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2.5" />
      <g stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M248 24v-8" />
        <path d="M281 58h8" />
        <path d="M271 35l6-6" />
        <path d="M225 35l-6-6" />
        <path d="M271 81l6 6" />
      </g>

      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 122h36l-4 34a4 4 0 0 1-4 4H58a4 4 0 0 1-4-4z" fill="var(--surface)" />
        <path d="M86 128a11 11 0 0 1 0 21" />
      </g>
      <g stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M62 112c5-6-5-10 0-17" />
        <path d="M74 112c5-6-5-10 0-17" />
      </g>

      <path
        d="M60 196c40-16 80-16 100 0 20-16 60-16 100 0v24c-40-16-80-16-100 0-20-16-60-16-100 0z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M160 196v24" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="var(--text-faint)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M84 191h54" />
        <path d="M88 199h50" />
        <path d="M182 191h54" />
        <path d="M182 199h50" />
      </g>
    </svg>
  );
}
