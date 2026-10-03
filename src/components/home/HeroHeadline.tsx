"use client";

import { useEffect, useRef } from "react";

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 6;
      const ny = (e.clientY / window.innerHeight - 0.5) * 4;
      el.style.transform = `translate(${nx}px, ${ny}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <h1
      ref={ref}
      className="mt-10 max-w-[1200px] text-[clamp(3.25rem,13vw,9rem)] font-semibold leading-[0.84] tracking-[-0.05em] transition-transform duration-75 will-change-transform md:mt-14"
    >
      WE BUILD
      <br />
      WHAT&apos;S NEXT.
    </h1>
  );
}
