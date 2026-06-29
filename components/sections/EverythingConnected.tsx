import { FlowShowcase } from "@/components/sections/FlowShowcase";

export function EverythingConnected() {
  return (
    <FlowShowcase
      id="everything-connected"
      label="Everything Connected"
      title="Your finances, finally in one place."
      body="Income, spending, savings goals, and decisions — connected into a single view. No more switching apps or guessing how one choice affects the rest."
      screen="goals"
      reverse
      tone="dark"
    />
  );
}
