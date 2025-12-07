"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import type { PricingSectionProps } from "../../types";

export function PricingSection({ onOpenFreeTrial }: PricingSectionProps) {
  const { t, messages } = useI18n();
  const pricingSection = quranConfig.sections.find((s) => s.id === "pricing");
  const plans = pricingSection && "props" in pricingSection ? (pricingSection.props as any).plans || [] : [];
  const currency = pricingSection && "props" in pricingSection ? (pricingSection.props as any).currency || "" : "";

  return (
    <section
      id="pricing"
      className="space-y-8 rounded-3xl bg-background px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="pricing-heading"
          className="text-2xl font-bold text-(--qa-primary-main) md:text-3xl"
        >
          {t("pricing.title")}
        </h2>
        <p className="mt-2 text-sm text-(--qa-neutral-dark) md:text-base">
          {t("pricing.subtitle")}
        </p>
        <p className="mt-3 text-xs text-(--qa-neutral-dark) md:text-sm">
          {t("pricing.description")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan: { id: string; highlight: boolean; badge?: string; badgeBgColor?: string; price: string; originalPrice?: string; features: { text: string }[] }) => {
          const isHighlight = plan.highlight;
          const key =
            plan.id === "plan_starter"
              ? "starter"
              : plan.id === "plan_standard"
              ? "standard"
              : "intensive";
          return (
            <article
              key={plan.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                isHighlight
                  ? "border-transparent bg-(--qa-primary-main) text-white"
                  : "border-(--qa-neutral-gray) bg-white"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">
                    {t(`pricing.plans.${key}.name`)}
                  </h3>
                  {plan.badge && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold text-black"
                      style={{ backgroundColor: plan.badgeBgColor }}
                    >
                      {t(`pricing.plans.${key}.badge`)}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs ${
                    isHighlight
                      ? "text-(--qa-secondary-lighter)"
                      : "text-(--qa-neutral-dark)"
                  }`}
                >
                  {t(`pricing.plans.${key}.description`)}
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-xs">
                    {t("pricing.currency")}/{t("pricing.billingPeriod")}
                  </span>
                </div>
                {plan.originalPrice && (
                  <p className="text-xs text-(--qa-secondary-light) line-through">
                    {plan.originalPrice} {currency}
                  </p>
                )}
                <p className="text-xs">
                  {t(`pricing.plans.${key}.tagline`)}
                </p>
                <ul className="mt-3 space-y-1 text-xs">
                  {(
                    (messages.pricing?.plans as any)?.[key]?.features ??
                    plan.features.map((feature: { text: string }) => feature.text)
                  ).map((featureText: string) => (
                    <li
                      key={featureText}
                      className="flex items-center gap-1"
                    >
                      <span
                        aria-hidden="true"
                        className="text-(--qa-success)"
                      >
                        ✓
                      </span>
                      <span>{featureText}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={onOpenFreeTrial}
                className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isHighlight
                      ? "bg-(--qa-accent-main) text-black hover:bg-(--qa-accent-light)"
                      : "border border-(--qa-primary-main) text-(--qa-primary-main) hover:bg-(--qa-primary-main) hover:text-white"
                  }`}
              >
                {t(`pricing.plans.${key}.cta`)}
              </button>
            </article>
          );
        })}
      </div>
      <p className="mt-2 text-center text-xs text-(--qa-neutral-dark)">
        {t("pricing.billingNote")}
      </p>
    </section>
  );
}

