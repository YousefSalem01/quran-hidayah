"use client";

import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import { useTestimonials } from "../../hooks/useTestimonials";

export function TestimonialsSection() {
  const { t } = useI18n();
  const testimonialsSection = quranConfig.sections.find((s) => s.id === "testimonials");
  const testimonials = testimonialsSection && "props" in testimonialsSection ? (testimonialsSection.props as any).testimonials || [] : [];
  const statsSection = testimonialsSection && "props" in testimonialsSection ? (testimonialsSection.props as any).statsSection || { show: false, stats: [] } : { show: false, stats: [] };
  
  const {
    currentTestimonialIndex,
    setCurrentTestimonialIndex,
    isTestimonialsFading,
    visibleTestimonials,
  } = useTestimonials(testimonials);

  return (
    <section
      id="testimonials"
      className="space-y-8 rounded-3xl bg-white px-3 py-6 shadow-sm sm:px-4 sm:py-8 lg:px-6 lg:py-10"
      aria-labelledby="testimonials-heading"
    >
      <div className="space-y-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold text-(--qa-primary-main) md:text-3xl"
          >
            {t("testimonials.title")}
          </h2>
          <p className="mt-2 text-sm text-(--qa-neutral-dark) md:text-base">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {statsSection.show && (
          <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl bg-(--qa-primary-main) px-4 py-4 text-white shadow-md sm:flex-row sm:px-6">
            {statsSection.stats.map((stat: { icon: string; label: string; number: number }) => {
              const key =
                stat.icon === "users"
                  ? "activeStudents"
                  : stat.icon === "globe"
                    ? "countries"
                    : "satisfaction";
              return (
                <div
                  key={stat.label}
                  className="flex flex-1 flex-col items-center gap-1 text-center"
                >
                  <span className="text-2xl font-bold">
                    {stat.number}+
                  </span>
                  <span className="text-xs">
                    {t(`testimonials.stats.${key}`)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div
          className={`grid gap-4 md:grid-cols-3 transition-opacity duration-300 ease-in-out ${
            isTestimonialsFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {visibleTestimonials.map((testimonial: { id: string; highlight: boolean; rating: number }) => (
            <article
              key={testimonial.id}
              className={`flex h-full flex-col justify-between rounded-2xl border p-4 text-right shadow-sm transition ${
                testimonial.highlight
                  ? "border-transparent bg-(--qa-secondary-lighter)"
                  : "border-(--qa-neutral-gray) bg-white"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-(--qa-primary-main)">
                      {t(`testimonials.items.${testimonial.id}.name`)}
                    </h3>
                    <p className="text-xs text-(--qa-neutral-dark)">
                      {t(`testimonials.items.${testimonial.id}.role`)}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-(--qa-accent-main)">
                    {Array.from({ length: testimonial.rating }).map(
                      (_: unknown, idx: number) => (
                        <span key={idx} aria-hidden="true">
                          ★
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-(--qa-neutral-dark) md:text-sm">
                  {t(`testimonials.items.${testimonial.id}.text`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {testimonials.map((testimonial: { id: string }, index: number) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrentTestimonialIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === currentTestimonialIndex
                  ? "w-6 bg-(--qa-primary-main)"
                  : "w-2.5 bg-(--qa-neutral-gray) hover:bg-(--qa-primary-light)"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

