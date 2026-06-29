"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const chatVariants = [
  {
    user: "Can I buy a car?",
    ai: "I can help evaluate that purchase. A few purchase details are required before I can evaluate affordability.",
    opening: "How much do you currently have in savings or liquid cash?",
    inputTitle: "Tell me about the car",
    inputSub: "Share the price and financing details to run affordability analysis.",
    fieldLabel: "Car price",
    inputValue: "15,00,000",
  },
  {
    user: "Can I afford a Bali trip?",
    ai: "Let me check that against your savings goals and emergency fund.",
    opening: null as string | null,
    inputTitle: "Tell me about the trip",
    inputSub: "Share the total trip cost and timing to run affordability analysis.",
    fieldLabel: "Trip budget",
    inputValue: "2,50,000",
  },
];

const verdictVariants = [
  {
    title: "Wait Before Purchasing a Vehicle",
    risk: "Medium Risk · 74% confidence",
    copy: "Wait before proceeding with this vehicle purchase; the data shows trade-offs that should be improved first.",
    insight: "Emergency fund covers 0.8 months",
    banner: "Estimated EMI is approximately ₹28,500 / month",
  },
  {
    title: "Review Before Booking Bali",
    risk: "Worth reviewing · 68% confidence",
    copy: "This trip fits your goals, but it would reduce your emergency buffer more than recommended right now.",
    insight: "Emergency fund covers 0.8 months",
    banner: "Trip would use ~3 months of savings",
  },
];

type Screen = "chat" | "verdict";

interface NarrativeStep {
  screen: Screen;
  chatIndex: number;
  verdictIndex: number;
  hold: number;
  typing?: boolean;
  toast?: { title: string; text: string };
  revealAfterToast?: number;
}

const narrativeSteps: NarrativeStep[] = [
  { screen: "chat", chatIndex: 0, verdictIndex: 0, hold: 2600 },
  { screen: "chat", chatIndex: 0, verdictIndex: 0, hold: 2000, typing: true, toast: { title: "Arivo", text: "Pulling your financial profile…" } },
  { screen: "chat", chatIndex: 0, verdictIndex: 0, hold: 1800, toast: { title: "Arivo", text: "Analyzing vehicle affordability…" } },
  { screen: "verdict", chatIndex: 0, verdictIndex: 0, hold: 4200, toast: { title: "Decision ready", text: "Vehicle purchase · Medium risk" }, revealAfterToast: 850 },
  { screen: "verdict", chatIndex: 0, verdictIndex: 0, hold: 2200 },
  { screen: "chat", chatIndex: 1, verdictIndex: 1, hold: 3200, toast: { title: "New message", text: "Can I afford a Bali trip?" }, revealAfterToast: 900 },
  { screen: "chat", chatIndex: 1, verdictIndex: 1, hold: 2000, typing: true, toast: { title: "Arivo", text: "Evaluating trip budget…" } },
  { screen: "chat", chatIndex: 1, verdictIndex: 1, hold: 1600, toast: { title: "Arivo", text: "Analyzing travel budget…" } },
  { screen: "verdict", chatIndex: 1, verdictIndex: 1, hold: 4500, toast: { title: "Decision ready", text: "Travel expense · Worth reviewing" }, revealAfterToast: 850 },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ChatScreen({
  variantIndex,
  typing,
}: {
  variantIndex: number;
  typing: boolean;
}) {
  const variant = chatVariants[variantIndex];

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden rounded-[28px] bg-[#0D0F0E] p-3 pb-2 text-white">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-display text-sm font-bold">Arivo</div>
        <div className="flex gap-2 text-xs opacity-50" aria-hidden="true">
          <span>◷</span>
          <span>＋</span>
        </div>
      </div>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-arivo-accent" />
        Connected Financial Profile
      </div>
      <p className="mb-2 text-[10px] text-white/40">20 decisions remaining</p>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden text-[11px]">
        {variant.opening && (
          <p className="rounded-xl bg-white/8 px-3 py-2 text-white/80">{variant.opening}</p>
        )}
        <div className="flex items-end justify-end gap-1.5">
          <div className="rounded-2xl rounded-br-sm bg-arivo-primary px-3 py-2 text-[11px] font-medium">
            {variant.user}
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">
            HU
          </span>
        </div>
        <p className="rounded-xl bg-white/8 px-3 py-2 text-white/80">{variant.ai}</p>
        {typing && (
          <div className="flex gap-1 px-2 py-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
          </div>
        )}
        {!typing && (
          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="mb-0.5 font-display text-xs font-bold">{variant.inputTitle}</p>
            <p className="mb-2 text-[10px] text-white/50">{variant.inputSub}</p>
            <label className="mb-1 block text-[10px] text-white/40">{variant.fieldLabel}</label>
            <div className="mb-2 rounded-lg border border-arivo-accent/40 bg-arivo-accent/10 px-3 py-2 text-sm font-semibold">
              ₹ {variant.inputValue}
            </div>
            <button type="button" className="w-full rounded-lg bg-arivo-accent py-2 text-xs font-bold text-arivo-bg">
              Continue Evaluation
            </button>
          </div>
        )}
      </div>
      <nav className="mt-2 flex justify-around border-t border-white/10 pt-2 text-[9px] text-white/40" aria-hidden="true">
        <span>Life</span>
        <span className="font-bold text-arivo-accent">Arivo</span>
        <span>Journey</span>
        <span>Vault</span>
      </nav>
    </div>
  );
}

function VerdictScreen({ variantIndex }: { variantIndex: number }) {
  const variant = verdictVariants[variantIndex];

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden rounded-[28px] bg-[#0D0F0E] p-3 pb-2 text-white">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-display text-sm font-bold">Arivo</div>
        <div className="flex gap-2 text-xs opacity-50" aria-hidden="true">
          <span>◷</span>
          <span>＋</span>
        </div>
      </div>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-arivo-accent" />
        Connected Financial Profile
      </div>
      <p className="mb-2 text-[10px] text-white/40">20 decisions remaining</p>
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2.5">
        <span className="mb-2 inline-block w-fit rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold">
          Arivo Assistant
        </span>
        <h3 className="mb-1 font-display text-sm font-bold leading-tight">{variant.title}</h3>
        <p className="mb-1.5 text-[10px] text-arivo-warning">{variant.risk}</p>
        <p className="mb-2 line-clamp-2 text-[10px] text-white/70">{variant.copy}</p>
        <ul className="mb-2">
          <li className="relative pl-3 text-[10px] text-white/60 before:absolute before:left-0 before:top-[0.4em] before:h-1 before:w-1 before:rounded-full before:bg-arivo-warning">
            {variant.insight}
          </li>
        </ul>
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-white/40">
          Financial Metrics
        </p>
        <div className="mb-2 grid grid-cols-2 gap-1 text-[9px]">
          {[
            ["Monthly income", "₹75,000"],
            ["Monthly expenses", "₹25,000"],
            ["Savings rate", "66.7%"],
            ["Emergency fund", "0.8 months"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md bg-white/5 px-1.5 py-1">
              <span className="block text-white/40">{label}</span>
              <strong className="text-white/90">{value}</strong>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between rounded-lg bg-arivo-primary/20 px-2 py-1.5 text-[9px] font-medium">
          <span>{variant.banner}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
      <nav className="mt-2 flex justify-around border-t border-white/10 pt-2 text-[9px] text-white/40" aria-hidden="true">
        <span>Life</span>
        <span className="font-bold text-arivo-accent">Arivo</span>
        <span>Journey</span>
        <span>Vault</span>
      </nav>
    </div>
  );
}

interface AppCarouselProps {
  className?: string;
  dualPhones?: boolean;
}

export function AppCarousel({ className, dualPhones = true }: AppCarouselProps) {
  const [activeScreen, setActiveScreen] = useState<Screen>("chat");
  const [chatIndex, setChatIndex] = useState(0);
  const [verdictIndex, setVerdictIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState<{ title: string; text: string } | null>(null);
  const [switching, setSwitching] = useState(false);
  const [showBackPhone, setShowBackPhone] = useState(true);
  const stepIndexRef = useRef(0);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    async function runStep() {
      const step = narrativeSteps[stepIndexRef.current];
      if (!step) {
        stepIndexRef.current = 0;
        return runStep();
      }

      setChatIndex(step.chatIndex);
      setVerdictIndex(step.verdictIndex);

      const needsSwitch = activeScreen !== step.screen;

      if (step.toast && needsSwitch && step.revealAfterToast) {
        setTyping(false);
        setToast(step.toast);
        await sleep(step.revealAfterToast);
        busyRef.current = true;
        setSwitching(true);
        await sleep(300);
        setActiveScreen(step.screen);
        setShowBackPhone(step.screen === "chat");
        setSwitching(false);
        busyRef.current = false;
      } else {
        if (needsSwitch) {
          busyRef.current = true;
          setSwitching(true);
          await sleep(300);
          setActiveScreen(step.screen);
          setShowBackPhone(step.screen === "chat");
          setSwitching(false);
          busyRef.current = false;
        }
        setTyping(!!step.typing);
        if (step.toast) {
          setTimeout(() => setToast(step.toast!), step.typing ? 400 : 200);
        } else {
          setToast(null);
        }
      }

      timerRef.current = setTimeout(() => {
        stepIndexRef.current = (stepIndexRef.current + 1) % narrativeSteps.length;
        runStep();
      }, step.hold);
    }

    runStep();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (busyRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    stepIndexRef.current = (stepIndexRef.current + 1) % narrativeSteps.length;
    const step = narrativeSteps[stepIndexRef.current];
    setChatIndex(step.chatIndex);
    setVerdictIndex(step.verdictIndex);
    setActiveScreen(step.screen);
    setShowBackPhone(step.screen === "chat");
    setTyping(!!step.typing);
    setToast(step.toast ?? null);
    timerRef.current = setTimeout(() => {
      stepIndexRef.current = (stepIndexRef.current + 1) % narrativeSteps.length;
    }, step.hold);
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-arivo-accent/15 blur-3xl" />
      <div
        className="relative min-h-[540px] cursor-pointer px-0 pb-7 pt-3 lg:pl-12"
        role="group"
        aria-label="Arivo app preview — chat and decision screens"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        {dualPhones && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-7 left-[-10px] z-[1] w-[54%] -rotate-[7deg] opacity-45 saturate-[0.7] blur-[0.8px] transition-opacity duration-350",
              !showBackPhone && "invisible opacity-0"
            )}
            aria-hidden="true"
          >
            <div className="overflow-hidden rounded-[24px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl">
              <VerdictScreen variantIndex={verdictIndex} />
            </div>
          </div>
        )}

        <div className="relative z-[2] mx-auto w-full">
          {toast && (
            <div
              className="absolute left-1/2 top-2 z-10 flex w-[90%] -translate-x-1/2 items-center gap-2 rounded-xl border border-white/10 bg-[#1a1a1a]/95 px-3 py-2 shadow-lg backdrop-blur-sm"
              aria-live="polite"
            >
              <Image src="/assets/logo-mark.svg" alt="" width={18} height={18} />
              <span className="text-[11px] text-white">
                <strong className="mr-1 font-bold">{toast.title}</strong>
                {toast.text}
              </span>
            </div>
          )}

          <div
            className={cn(
              "relative h-[540px] overflow-hidden rounded-[32px] border-[4px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_24px_60px_rgba(0,0,0,0.25)] transition-all duration-220",
              switching && "scale-[0.985] opacity-55"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                activeScreen === "chat" ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <ChatScreen variantIndex={chatIndex} typing={typing} />
            </div>
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                activeScreen === "verdict" ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <VerdictScreen variantIndex={verdictIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
