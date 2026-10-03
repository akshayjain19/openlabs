import { site } from "@/content/site";

export function whatsAppLink(message?: string) {
  const base = site.whatsapp.href;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
