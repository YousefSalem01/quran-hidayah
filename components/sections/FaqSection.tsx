"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import { useFaq } from "../../hooks/useFaq";

export function FaqSection() {
  const { t } = useI18n();
  const faqSection = quranConfig.sections.find((s) => s.id === "faq");
  const items = faqSection && "props" in faqSection ? (faqSection.props as any).items || [] : [];
  const firstItemId = items[0]?.id ?? null;
  const { activeFaqId, toggleFaq } = useFaq(firstItemId);

  return (
    <section
      id="faq"
      className="space-y-6 rounded-3xl bg-background px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="faq-heading"
          className="text-2xl font-bold text-(--qa-primary-main) md:text-3xl"
        >
          {t("faq.title")}
        </h2>
        <p className="mt-2 text-sm text-(--qa-neutral-dark) md:text-base">
          {t("faq.subtitle")}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((item: { id: string }) => {
          const isActive = activeFaqId === item.id;
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl border bg-white transition ${
                isActive
                  ? "border-(--qa-primary-main) shadow-md"
                  : "border-(--qa-neutral-gray)"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-right"
                aria-expanded={isActive}
              >
                <span className="text-sm font-semibold text-foreground">
                  {t(`faq.items.${item.id}.question`)}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
                    isActive
                      ? "bg-(--qa-primary-main) text-white"
                      : "bg-background text-(--qa-primary-main)"
                  }`}
                >
                  {isActive ? "−" : "+"}
                </span>
              </button>
              {isActive && (
                <div className="px-4 pb-3 text-sm text-(--qa-neutral-dark)">
                  <p>{t(`faq.items.${item.id}.answer`)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

