"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import type { ProgrammesSectionProps } from "../../types";

export function ProgrammesSection({ onOpenFreeTrial }: ProgrammesSectionProps) {
  const { t } = useI18n();
  const programmesSection = quranConfig.sections.find((s) => s.id === "programmes");
  const items = programmesSection && "props" in programmesSection ? (programmesSection.props as any).items || [] : [];

  return (
    <section
      id="programmes"
      className="space-y-8 rounded-3xl bg-white px-3 py-6 shadow-sm sm:px-4 sm:py-8 lg:px-6 lg:py-10"
      aria-labelledby="programmes-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="programmes-heading"
          className="text-2xl font-bold text-(--qa-primary-main) md:text-3xl"
        >
          {t("programmes.title")}
        </h2>
        <p className="mt-2 text-sm text-(--qa-neutral-dark) md:text-base">
          {t("programmes.subtitle")}
        </p>
        <p className="mt-3 text-xs text-(--qa-neutral-dark) md:text-sm">
          {t("programmes.description")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((program: { id: string; iconBgColor: string; highlights: unknown[] }) => {
          const tKey = `programmes.items.${program.id}` as const;
          return (
            <article
              key={program.id}
              className="group flex flex-col justify-between rounded-2xl border border-(--qa-neutral-gray) bg-white p-4 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="h-10 w-10 rounded-2xl text-center text-xl leading-10 text-white shadow"
                    style={{ backgroundColor: program.iconBgColor }}
                  >
                    <span aria-hidden="true">📖</span>
                  </div>
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-(--qa-primary-main)">
                    {t(`${tKey}.level`)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-(--qa-primary-main) md:text-base">
                  {t(`${tKey}.name`)}
                </h3>
                <p className="text-xs font-medium text-(--qa-neutral-dark)">
                  {t(`${tKey}.duration`)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-(--qa-neutral-dark) md:text-sm">
                  {t(`${tKey}.shortDescription`)}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-(--qa-neutral-dark)">
                  {program.highlights.slice(0, 3).map((_: unknown, index: number) => (
                    <li key={index} className="flex items-center gap-1">
                      <span
                        aria-hidden="true"
                        className="text-(--qa-success)"
                      >
                        ✓
                      </span>
                      <span>{t(`${tKey}.highlights.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={onOpenFreeTrial}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-(--qa-primary-main) px-4 py-2 text-xs font-semibold text-(--qa-primary-main) transition group-hover:bg-(--qa-primary-main) group-hover:text-white"
              >
                {t(`${tKey}.ctaLabel`)}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

