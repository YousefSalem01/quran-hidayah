import type quranConfig from "../quran-academy-config.json";
import type enMessages from "../locales/en.json";

// ========================================
// Config Types
// ========================================

export type QuranConfig = typeof quranConfig;

export type Section = QuranConfig["sections"][number];

// ========================================
// Section Types (extracted from config)
// ========================================

export type HeroSection = Extract<Section, { id: "hero" }>;
export type FreeTrialSection = Extract<Section, { id: "free_trial" }>;
export type WhatsAppWidgetSection = Extract<Section, { id: "whatsapp_widget" }>;
export type WhyChooseUsSection = Extract<Section, { id: "why_choose_us" }>;
export type ProgrammesSection = Extract<Section, { id: "programmes" }>;
export type PricingSection = Extract<Section, { id: "pricing" }>;
export type TestimonialsSection = Extract<Section, { id: "testimonials" }>;
export type FaqSection = Extract<Section, { id: "faq" }>;
export type CtaFooterSection = Extract<Section, { id: "cta_footer" }>;

// ========================================
// Component Props Types
// ========================================

export interface HeroSectionProps {
  onOpenFreeTrial: () => void;
  whatsappHref: string;
}

export interface PricingSectionProps {
  onOpenFreeTrial: () => void;
}

export interface ProgrammesSectionProps {
  onOpenFreeTrial: () => void;
}

export interface FinalCtaSectionProps {
  onOpenFreeTrial: () => void;
  whatsappHref: string;
}

export interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WhatsAppWidgetProps {
  whatsappHref: string;
}

export interface FooterProps {
  whatsappHref: string;
}

export interface HeaderProps {
  onOpenFreeTrial: () => void;
}

// ========================================
// I18n Types
// ========================================

export type Locale = "en" | "ar";

export type Messages = typeof enMessages;

export interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  t: (key: string) => string;
  toggleLocale: () => void;
}

export interface I18nProviderProps {
  children: React.ReactNode;
}

// ========================================
// Form Types
// ========================================

export type FreeTrialFormState = Record<string, string>;

export type FreeTrialFormErrors = Partial<Record<keyof FreeTrialFormState, string | null>>;

// ========================================
// Data Types
// ========================================

export interface Testimonial {
  id: string;
  highlight: boolean;
  rating: number;
}

