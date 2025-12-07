"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import type { FooterProps } from "../../types";

const footerConfig = quranConfig.config.footer;

export function Footer({ whatsappHref }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="relative mt-16 overflow-hidden bg-[#052E16] text-white">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-linear-to-r from-transparent via-[#D4A574] to-transparent" />
      
      {/* Subtle Islamic pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4 text-right lg:col-span-1">
            <div className="flex items-center justify-end gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#D4A574] to-[#F4A825] shadow-lg">
                <span className="text-xl font-bold text-[#052E16]">Q</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#F7E6C4]">
                  {t("navbar.logoText")}
                </span>
                <span className="text-xs text-[#D4A574]">
                  Quran Academy
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#E8BCA8]">
              {t("footer.about")}
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg text-white shadow-md transition hover:scale-110 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href="mailto:info@quranacademy.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white shadow-md transition hover:scale-110 hover:bg-white/20"
                aria-label="Email"
              >
                ✉️
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white shadow-md transition hover:scale-110 hover:bg-white/20"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white shadow-md transition hover:scale-110 hover:bg-white/20"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="mb-4 text-base font-bold text-[#F4A825]">
              {t("footer.usefulLinksTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerConfig.links.map((link: { href: string; label: string }) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[#E8BCA8] transition hover:translate-x-1 hover:text-[#F4A825]"
                  >
                    <span className="text-xs">◄</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="text-right">
            <h3 className="mb-4 text-base font-bold text-[#F4A825]">
              {t("programmes.title")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#programmes" className="inline-flex items-center gap-2 text-[#E8BCA8] transition hover:translate-x-1 hover:text-[#F4A825]">
                  <span className="text-xs">◄</span>
                  {t("programmes.items.quran_memorization.name")}
                </a>
              </li>
              <li>
                <a href="#programmes" className="inline-flex items-center gap-2 text-[#E8BCA8] transition hover:translate-x-1 hover:text-[#F4A825]">
                  <span className="text-xs">◄</span>
                  {t("programmes.items.tajweed.name")}
                </a>
              </li>
              <li>
                <a href="#programmes" className="inline-flex items-center gap-2 text-[#E8BCA8] transition hover:translate-x-1 hover:text-[#F4A825]">
                  <span className="text-xs">◄</span>
                  {t("programmes.items.arabic.name")}
                </a>
              </li>
              <li>
                <a href="#programmes" className="inline-flex items-center gap-2 text-[#E8BCA8] transition hover:translate-x-1 hover:text-[#F4A825]">
                  <span className="text-xs">◄</span>
                  {t("programmes.items.islamic_studies.name")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="mb-4 text-base font-bold text-[#F4A825]">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-end gap-2">
                <span className="text-[#E8BCA8]">{footerConfig.contactPhone}</span>
                <span className="text-[#F4A825]">📞</span>
              </li>
              <li className="flex items-center justify-end gap-2">
                <span className="text-[#E8BCA8]">{footerConfig.contactEmail}</span>
                <span className="text-[#F4A825]">✉️</span>
              </li>
              <li className="flex items-center justify-end gap-2">
                <span className="text-[#E8BCA8]">24/7</span>
                <span className="text-[#F4A825]">⏰</span>
              </li>
              <li className="flex items-center justify-end gap-2">
                <span className="text-[#E8BCA8]">{t("whyChooseUs.items.globalReach.title")}</span>
                <span className="text-[#F4A825]">🌍</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-[#F4A825]">1200+</div>
              <div className="text-xs text-[#E8BCA8]">{t("testimonials.stats.activeStudents")}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-[#F4A825]">50+</div>
              <div className="text-xs text-[#E8BCA8]">{t("testimonials.stats.countries")}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-[#F4A825]">95%</div>
              <div className="text-xs text-[#E8BCA8]">{t("testimonials.stats.satisfaction")}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-[#F4A825]">10+</div>
              <div className="text-xs text-[#E8BCA8]">{t("whyChooseUs.subtitle")}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-xs text-[#D4A574]">
              © {new Date().getFullYear()} {t("footer.rights")} • {t("navbar.projectName")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#E8BCA8]">
              <a href="#" className="transition hover:text-[#F4A825]">{t("footer.usefulLinksTitle")}</a>
              <span>•</span>
              <a href="#" className="transition hover:text-[#F4A825]">{t("navbar.links.faq")}</a>
              <span>•</span>
              <a href="#" className="transition hover:text-[#F4A825]">{t("finalCta.primaryCta")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

