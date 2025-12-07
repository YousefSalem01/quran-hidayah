"use client";

import { useI18n } from "../i18n/I18nProvider";
import type { FinalCtaSectionProps } from "../../types";

export function FinalCtaSection({ onOpenFreeTrial, whatsappHref }: FinalCtaSectionProps) {
  const { t } = useI18n();

  return (
    <section
      id="final-cta"
      className="overflow-hidden rounded-3xl bg-linear-to-br from-(--qa-primary-dark) to-(--qa-primary-main) px-4 py-8 text-white shadow-xl lg:px-8 lg:py-10"
      aria-labelledby="final-cta-heading"
    >
      <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-right">
        <div className="space-y-3 lg:max-w-xl">
          <h2
            id="final-cta-heading"
            className="text-2xl font-bold md:text-3xl"
          >
            {t("finalCta.title")}
          </h2>
          <p className="text-sm text-(--qa-secondary-lighter) md:text-base">
            {t("finalCta.subtitle")}
          </p>
          <p className="text-xs text-background md:text-sm">
            {t("finalCta.description")}
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenFreeTrial}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-(--qa-accent-main) px-6 py-2.5 text-sm font-semibold text-black shadow-md transition hover:bg-(--qa-accent-light)"
          >
            <span aria-hidden="true">📅</span>
            <span>{t("finalCta.primaryCta")}</span>
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <span aria-hidden="true">💬</span>
            <span>{t("finalCta.secondaryCta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

