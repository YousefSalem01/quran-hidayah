"use client";

import quranConfig from "../../quran-academy-config.json";
import type { WhatsAppWidgetProps } from "../../types";

export function WhatsAppWidget({ whatsappHref }: WhatsAppWidgetProps) {
  const section = quranConfig.sections.find(
    (s) => s.id === "whatsapp_widget"
  );
  const tooltip = section && "props" in section ? (section.props as any).tooltip || "" : "";
  const label = section && "props" in section ? (section.props as any).label || "" : "";

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-4 left-4 z-999 flex items-center gap-3"
      aria-label={tooltip}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl transition group-hover:scale-105 group-hover:shadow-2xl motion-safe:animate-bounce">
        💬
      </div>
      <div className="hidden rounded-full bg-black/80 px-3 py-1 text-xs text-white shadow-lg group-hover:inline-block">
        {label} • {tooltip}
      </div>
    </a>
  );
}

