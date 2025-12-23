"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import type { HeroSectionProps } from "../../types";
import images from "../../public/onboarding.jpg";

export function HeroSection({ onOpenFreeTrial, whatsappHref }: HeroSectionProps) {
  const { t } = useI18n();
  const heroSection = quranConfig.sections.find((s) => s.id === "hero");
  const highlights = heroSection && "props" in heroSection ? (heroSection.props as any).highlights || [] : [];

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0F5132] via-[#2D6A4F] to-[#0F5132] px-4 py-12 text-white shadow-2xl lg:px-10 lg:py-16"
      aria-labelledby="hero-heading"
    >
      {/* Islamic Geometric Pattern Background */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2Z" fill="currentColor" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Animated Decorative Elements */}
      <motion.div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-br from-[#D4A574]/20 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-linear-to-tr from-[#F4A825]/20 to-transparent blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-6 text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm font-medium text-[#E8BCA8]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("hero.welcomeText")}
          </motion.p>
          
          <motion.h1
            id="hero-heading"
            className="text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("hero.academyName")}
          </motion.h1>
          
          <motion.p
            className="text-xl font-medium text-[#D4A574] md:text-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("hero.subHeading")}
          </motion.p>
          
          <motion.p
            className="text-base leading-relaxed text-[#F7E6C4] md:text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-end gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={onOpenFreeTrial}
              className="flex items-center gap-2 rounded-full bg-[#F4A825] px-6 py-3 text-sm font-bold text-black shadow-lg transition hover:bg-[#F7B857] hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span aria-hidden="true">📅</span>
              <span>{t("hero.primaryCta")}</span>
            </motion.button>
            
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-[#E8BCA8] px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#F4A825] hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span aria-hidden="true">💬</span>
              <span>{t("hero.secondaryCta")}</span>
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 text-sm md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {highlights.map((item: { icon: string }, index: number) => {
              let labelKey: string = "";
              if (item.icon === "graduation") labelKey = "teachers";
              else if (item.icon === "group") labelKey = "oneToOne";
              else if (item.icon === "schedule") labelKey = "flexibleTime";
              return (
                <motion.div
                  key={item.icon}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-lg backdrop-blur-md transition hover:bg-white/20 hover:shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <p className="font-semibold text-white">
                    {t(`hero.highlights.${labelKey}`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Decorative Islamic Geometric Elements */}
          <motion.div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-2 border-[#D4A574]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full border-2 border-[#F4A825]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Main Image Container with Islamic Frame */}
          <motion.div
            className="relative mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border-4 border-[#D4A574]/30 bg-linear-to-br from-white/5 to-white/10 p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={images}
                  alt={t("hero.heroAlt")}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient for better blending */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0F5132]/20 to-transparent" />
              </div>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-[#F4A825]" />
            <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-[#F4A825]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

