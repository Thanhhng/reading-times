import { bookCardSkeleton as s } from "@/app/classes/library";

export function BookCardSkeleton() {
  return (
    <div className={s.root}>
      <div className={s.cover} />
      <div className={s.body}>
        <div className={s.titleBar} />
        <div className={s.titleBar2} />
        <div className={s.authorBar} />
        <div className={s.chips}>
          <span className={s.chip} />
          <span className={s.chip} />
          <span className={s.chip} />
        </div>
      </div>
    </div>
  );
}
