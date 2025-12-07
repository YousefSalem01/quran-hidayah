"use client";

import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";

const iconMap: Record<string, string> = {
  star_check: "⭐",
  schedule: "⏰",
  shield_check: "🛡️",
  chart_bar: "📊",
  book_open: "📖",
  globe: "🌍",
};

export function WhyChooseUsSection() {
  const { t } = useI18n();
  const whyChooseUsSection = quranConfig.sections.find((s) => s.id === "why_choose_us");
  const items = whyChooseUsSection && "props" in whyChooseUsSection ? (whyChooseUsSection.props as any).items || [] : [];

  return (
    <section
      id="why-choose-us"
      className="space-y-8 rounded-3xl bg-background px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
      aria-labelledby="why-heading"
    >
      {/* Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          id="why-heading"
          className="text-3xl font-bold text-(--qa-primary-main) md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("whyChooseUs.title")}
        </motion.h2>
        
        <motion.p
          className="mt-3 text-base text-(--qa-neutral-dark) md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("whyChooseUs.subtitle")}
        </motion.p>
        
        <motion.p
          className="mt-2 text-sm text-(--qa-neutral-dark) md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("whyChooseUs.description")}
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: { icon: string; iconBgColor: string }, index: number) => {
          let key: string = "";
          if (item.icon === "star_check") key = "teachers";
          else if (item.icon === "schedule") key = "flexibleTime";
          else if (item.icon === "shield_check") key = "safeEnvironment";
          else if (item.icon === "chart_bar") key = "progressTracking";
          else if (item.icon === "book_open") key = "curricula";
          else if (item.icon === "globe") key = "globalReach";

          return (
            <motion.article
              key={item.icon}
              className="group flex flex-col gap-3 rounded-2xl bg-white p-5 text-right shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div
                className="inline-flex h-12 w-12 items-center justify-center self-end rounded-2xl text-xl shadow-md transition group-hover:scale-110"
                style={{ backgroundColor: item.iconBgColor }}
              >
                <span aria-hidden="true">{iconMap[item.icon] || "★"}</span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-(--qa-primary-main) md:text-lg">
                  {t(`whyChooseUs.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-(--qa-neutral-dark)">
                  {t(`whyChooseUs.items.${key}.description`)}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}