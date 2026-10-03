"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type CursorMode = "default" | "view" | "talk" | "play";

function subscribeCursorEnabled(onStoreChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onStoreChange);
  reduced.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    reduced.removeEventListener("change", onStoreChange);
  };
}

function getCursorEnabled() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function resolveMode(target: HTMLElement | null): CursorMode {
  if (!target) return "default";
  if (target.closest('[data-cursor="play"]')) return "play";
  if (target.closest('[data-cursor="project"]')) return "view";
  if (target.closest("[data-magnetic]")) return "talk";
  return "default";
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeCursorEnabled, getCursorEnabled, () => false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor-active");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const mode = resolveMode(target);
      if (ring.current) {
        ring.current.dataset.mode = mode;
      }
      if (label.current) {
        const text =
          mode === "view" ? "VIEW" : mode === "talk" ? "TALK" : mode === "play" ? "PLAY" : "";
        label.current.textContent = text;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" data-mode="default" aria-hidden>
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}
