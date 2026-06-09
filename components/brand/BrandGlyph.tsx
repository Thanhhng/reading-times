import type { SVGProps } from "react";

export function BrandGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M12 6.6C10.4 5.2 7.6 4.5 4 5.1v13.2c3.6-.6 6.4 0 8 1.6 1.6-1.6 4.4-2.2 8-1.6V5.1c-3.6-.6-6.4.1-8 1.5Z"
        fill="currentColor"
        fillOpacity={0.12}
      />
      <path d="M12 6.6v13.3" />
      <path d="M7 9.2c1.4-.3 2.6-.2 3.4.3" />
      <path d="M17 9.2c-1.4-.3-2.6-.2-3.4.3" />
    </svg>
  );
}
