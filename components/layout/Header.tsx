"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import type { HeaderProps } from "../../types";

const navbarConfig = quranConfig.config.navbar;

export function Header({ onOpenFreeTrial }: HeaderProps) {
  const { t, locale, toggleLocale } = useI18n();

  return (
    <header className="sticky top-0 z-30 border-b border-(--qa-neutral-gray) bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--qa-primary-main) text-white shadow-md">
            <span className="text-lg font-semibold">Q</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-(--qa-primary-main)">
              {t("navbar.logoText")}
            </span>
            <span className="text-xs text-(--qa-neutral-dark)">
              {t("navbar.projectName")}
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-(--qa-neutral-dark) md:flex">
          <a href="#hero" className="hover:text-(--qa-primary-main)">
            {t("navbar.links.home")}
          </a>
          <a href="#programmes" className="hover:text-(--qa-primary-main)">
            {t("navbar.links.programmes")}
          </a>
          <a href="#pricing" className="hover:text-(--qa-primary-main)">
            {t("navbar.links.pricing")}
          </a>
          <a href="#testimonials" className="hover:text-(--qa-primary-main)">
            {t("navbar.links.testimonials")}
          </a>
          <a href="#faq" className="hover:text-(--qa-primary-main)">
            {t("navbar.links.faq")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {navbarConfig.showLanguageToggle && (
            <button
              type="button"
              onClick={toggleLocale}
              className="hidden rounded-full border border-(--qa-neutral-gray) px-3 py-1 text-xs font-medium text-(--qa-neutral-dark) hover:border-(--qa-primary-main) hover:text-(--qa-primary-main) md:inline-flex"
              aria-label="Toggle language"
            >
              {locale === "en" ? "العربية" : "English"} / {t("navbar.languageToggle")}
            </button>
          )}
          <button
            type="button"
            onClick={onOpenFreeTrial}
            className="rounded-full bg-(--qa-accent-main) px-4 py-2 text-xs font-semibold text-black shadow-md transition hover:bg-(--qa-accent-light)"
          >
            {t("navbar.cta")}
          </button>
        </div>
      </div>
    </header>
  );
}

