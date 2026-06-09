"use client";

import { segmented } from "@/app/classes/settings";

type SegmentedOption = { value: string; label: string };

type SegmentedProps = {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
};

export function Segmented({ value, onChange, options }: SegmentedProps) {
  return (
    <div className={segmented.root}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-active={value === option.value ? "" : undefined}
          onClick={() => onChange(option.value)}
          className={segmented.button}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
