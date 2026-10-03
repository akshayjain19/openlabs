"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeMotion(onStoreChange: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = window.matchMedia("(pointer: coarse)");
  reduced.addEventListener("change", onStoreChange);
  coarse.addEventListener("change", onStoreChange);
  return () => {
    reduced.removeEventListener("change", onStoreChange);
    coarse.removeEventListener("change", onStoreChange);
  };
}

function canParallax() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const parallax = useSyncExternalStore(subscribeMotion, canParallax, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parallax) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 8;
      const ny = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate(${nx}px, ${ny}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax]);

  return (
    <h1
      ref={ref}
      className="mt-8 max-w-[1200px] text-[clamp(2.75rem,11vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] transition-transform duration-75 will-change-transform"
    >
      WE BUILD
      <br />
      WHAT&apos;S NEXT.
    </h1>
  );
}
