import { FlowShowcase } from "@/components/sections/FlowShowcase";

export function EverythingConnected() {
  return (
    <FlowShowcase
      id="everything-connected"
      label="Everything Connected"
      title="A Financial Decision Engine That Adapts to You."
      body="Income, spending, savings goals, and decisions — connected into a single view. No more switching apps or guessing how one choice affects the rest."
      screen="goals"
      reverse
      tone="dark"
    />
  );
}
