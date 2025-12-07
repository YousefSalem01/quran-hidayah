import type {
  HeroSection,
  FreeTrialSection,
  WhatsAppWidgetSection,
  WhyChooseUsSection,
  ProgrammesSection,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  CtaFooterSection,
} from "../types";

// Using dynamic import to avoid build-time type issues
function getSection<T>(id: string): T {
  const quranConfigData = require("../quran-academy-config.json");
  return quranConfigData.sections.find(
    (section: any) => section.id === id
  ) as T;
}

export const heroSection: HeroSection = getSection<HeroSection>("hero");
export const freeTrialSection: FreeTrialSection = getSection<FreeTrialSection>("free_trial");
export const whatsappWidgetSection: WhatsAppWidgetSection = getSection<WhatsAppWidgetSection>("whatsapp_widget");
export const whyChooseUsSection: WhyChooseUsSection = getSection<WhyChooseUsSection>("why_choose_us");
export const programmesSection: ProgrammesSection = getSection<ProgrammesSection>("programmes");
export const pricingSection: PricingSection = getSection<PricingSection>("pricing");
export const testimonialsSection: TestimonialsSection = getSection<TestimonialsSection>("testimonials");
export const faqSection: FaqSection = getSection<FaqSection>("faq");
export const ctaFooterSection: CtaFooterSection = getSection<CtaFooterSection>("cta_footer");

const quranConfigData = require("../quran-academy-config.json");
export const navbarConfig = quranConfigData.config.navbar;
export const footerConfig = quranConfigData.config.footer;
export const quranConfig = quranConfigData;

