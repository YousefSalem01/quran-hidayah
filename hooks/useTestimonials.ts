import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "../types";

export function useTestimonials(testimonials: Testimonial[]) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialsFading, setIsTestimonialsFading] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    setIsTestimonialsFading(true);
    const timeout = window.setTimeout(() => {
      setIsTestimonialsFading(false);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [currentTestimonialIndex]);

  const visibleTestimonials = useMemo(() => {
    const visibleCount = Math.min(3, testimonials.length);
    return Array.from({ length: visibleCount }).map((_, idx) => {
      const index = (currentTestimonialIndex + idx) % testimonials.length;
      return testimonials[index];
    });
  }, [currentTestimonialIndex, testimonials]);

  return {
    currentTestimonialIndex,
    setCurrentTestimonialIndex,
    isTestimonialsFading,
    visibleTestimonials,
  };
}

