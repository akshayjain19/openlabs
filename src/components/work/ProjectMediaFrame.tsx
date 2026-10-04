"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  variant?: "desktop" | "mobile";
  className?: string;
};

export function ProjectMediaPlaceholder({ label, variant = "desktop", className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-white/15 bg-[#0a0a0a] text-center",
        variant === "mobile" ? "aspect-[9/19] w-full max-w-[140px]" : "aspect-[16/10] w-full",
        className,
      )}
      role="img"
      aria-label={`${label} — media placeholder`}
    >
      <p className="text-[9px] tracking-[0.35em] text-zinc-600 uppercase">Project image coming soon</p>
      <p className="mt-2 max-w-[80%] text-[10px] leading-snug text-zinc-500">{label}</p>
    </div>
  );
}

type MediaProps = {
  src?: string;
  alt: string;
  fallbackLabel: string;
  variant?: "desktop" | "mobile";
  className?: string;
  priority?: boolean;
};

export function ProjectMediaFrame({
  src,
  alt,
  fallbackLabel,
  variant = "desktop",
  className,
  priority,
}: MediaProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ProjectMediaPlaceholder label={fallbackLabel} variant={variant} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={variant === "mobile" ? 390 : 1600}
      height={variant === "mobile" ? 844 : 1000}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn(
        "h-auto w-full object-cover object-top",
        variant === "mobile" && "rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
        className,
      )}
      sizes={variant === "mobile" ? "22vw" : "(max-width: 768px) 100vw, 75vw"}
    />
  );
}
