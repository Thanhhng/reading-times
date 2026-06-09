import { toggleSwitch } from "@/app/classes/settings";

export function Switch({ checked }: { checked?: boolean }) {
  return (
    <span data-checked={checked ? "" : undefined} className={toggleSwitch.root}>
      <span className={toggleSwitch.knob} />
    </span>
  );
}
