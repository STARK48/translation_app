import { forwardRef } from "react";

export const GlobeFolderIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
        {...props}
      >
        <path d="M2.5 19.5A2 2 0 0 0 4.5 21h15a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2h-7.5" />
        <path d="M9.5 4h-5a2 2 0 0 0-2 2v4" />
        <circle cx="14" cy="15" r="5" />
        <path d="M14 10v10" />
        <path d="M10 15h8" />
        <path d="M9 6v4" />
        <path d="M4 10h10" />
      </svg>
    );
  }
);

GlobeFolderIcon.displayName = "GlobeFolderIcon";