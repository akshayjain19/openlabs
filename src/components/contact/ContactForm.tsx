"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { whatsAppLink } from "@/lib/utils";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const building = String(data.get("building") || "");
    const budget = String(data.get("budget") || "");
    const contact = String(data.get("contact") || "");

    const message = [
      "Hi OpenLabs,",
      "",
      `Name: ${name}`,
      company ? `Company: ${company}` : "",
      `Building: ${building}`,
      budget ? `Budget: ${budget}` : "",
      `Contact: ${contact}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsAppLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <p className="border border-white/10 p-6 text-sm text-zinc-400">
        WhatsApp should be open with your message. If not, message us at {site.whatsapp.display}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 border border-white/10 p-6 md:p-8">
      <label className="grid gap-2 text-xs tracking-[0.15em] text-zinc-500">
        NAME
        <input
          required
          name="name"
          className="border border-white/15 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="grid gap-2 text-xs tracking-[0.15em] text-zinc-500">
        COMPANY
        <input
          name="company"
          className="border border-white/15 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="grid gap-2 text-xs tracking-[0.15em] text-zinc-500">
        WHAT ARE YOU BUILDING?
        <textarea
          required
          name="building"
          rows={4}
          className="resize-y border border-white/15 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="grid gap-2 text-xs tracking-[0.15em] text-zinc-500">
        BUDGET (OPTIONAL)
        <input
          name="budget"
          className="border border-white/15 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <label className="grid gap-2 text-xs tracking-[0.15em] text-zinc-500">
        EMAIL / WHATSAPP
        <input
          required
          name="contact"
          className="border border-white/15 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-white/40"
        />
      </label>
      <button
        type="submit"
        data-magnetic
        className="mt-2 border border-white px-6 py-3 text-xs font-medium tracking-[0.2em] text-white hover:bg-white hover:text-black"
      >
        START A CONVERSATION →
      </button>
    </form>
  );
}
