import { progress } from "../../_styles/ui";

type ProgressBarProps = {
  value: number;
  caption?: string;
};

export function ProgressBar({ value, caption }: ProgressBarProps) {
  return (
    <div>
      <div className={progress.track}>
        <div className={progress.fill} style={{ width: `${value}%` }} />
      </div>
      {caption && <div className={progress.caption}>{caption}</div>}
    </div>
  );
}
