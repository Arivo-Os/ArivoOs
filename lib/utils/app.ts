import { cn } from "@/lib/utils";

const format = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number) {
  return format.format(value);
}

export function riskColor(risk: "low" | "medium" | "high") {
  if (risk === "low") return "text-app-success";
  if (risk === "high") return "text-app-danger";
  return "text-app-warning";
}

export function cnApp(...inputs: Parameters<typeof cn>) {
  return cn(inputs);
}
