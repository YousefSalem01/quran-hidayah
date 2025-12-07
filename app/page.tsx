"use client";

import { useState, useMemo } from "react";
import { getWhatsAppHref } from "../lib/utils";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppWidget } from "../components/layout/WhatsAppWidget";
import { HeroSection } from "../components/sections/HeroSection";
import { WhyChooseUsSection } from "../components/sections/WhyChooseUsSection";
import { ProgrammesSection } from "../components/sections/ProgrammesSection";
import { PricingSection } from "../components/sections/PricingSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { FaqSection } from "../components/sections/FaqSection";
import { FinalCtaSection } from "../components/sections/FinalCtaSection";
import { FreeTrialModal } from "../components/ui/FreeTrialModal";
import quranConfig from "../quran-academy-config.json";

export default function Home() {
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);

  const whatsappHref = useMemo(() => {
    const whatsappWidget = quranConfig.sections.find(
      (section) => section.id === "whatsapp_widget"
    );
    if (whatsappWidget && "props" in whatsappWidget) {
      const phone = whatsappWidget.props.phone ?? "";
      const message = whatsappWidget.props.preFilledMessage ?? "";
      return getWhatsAppHref(phone, message);
    }
    return "";
  }, []);

  const handleOpenFreeTrial = () => {
    setIsFreeTrialOpen(true);
  };

  const handleCloseFreeTrial = () => {
    setIsFreeTrialOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header onOpenFreeTrial={handleOpenFreeTrial} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-4 py-8 lg:px-6 lg:py-12">
        <HeroSection
          onOpenFreeTrial={handleOpenFreeTrial}
          whatsappHref={whatsappHref}
        />
        <WhyChooseUsSection />
        <ProgrammesSection onOpenFreeTrial={handleOpenFreeTrial} />
        <PricingSection onOpenFreeTrial={handleOpenFreeTrial} />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection
          onOpenFreeTrial={handleOpenFreeTrial}
          whatsappHref={whatsappHref}
        />
      </main>

      <Footer whatsappHref={whatsappHref} />
      <WhatsAppWidget whatsappHref={whatsappHref} />
      <FreeTrialModal
        isOpen={isFreeTrialOpen}
        onClose={handleCloseFreeTrial}
      />
    </div>
  );
}
