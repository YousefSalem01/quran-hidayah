/**
 * Hero Section API
 * Fetch hero section content from Strapi CMS
 */

import { fetchStrapi, getStrapiMediaUrl } from '../strapi';

export interface HeroHighlight {
  id: number;
  text: string;
}

export interface HeroImage {
  id: number;
  name: string;
  alternativeText: string | null;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface HeroData {
  id: number;
  documentId: string;
  welcomeText: string;
  academyName: string;
  subHeading: string | null;
  description: string | null;
  primaryCtaLabel: string | null;
  primaryCtaIcon: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaIcon: string | null;
  highlights: HeroHighlight[];
  heroImage: HeroImage | null;
  heroImageAlt: string | null;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroSectionProps {
  welcomeText: string;
  academyName: string;
  subHeading?: string;
  description?: string;
  primaryCta: {
    label: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    icon: string;
  };
  highlights: string[];
  heroImage: {
    url: string;
    alt: string;
  } | null;
}

/**
 * Fetch Hero Section data from Strapi
 */
export async function getHeroSection(locale: 'ar' | 'en' = 'ar'): Promise<HeroSectionProps | null> {
  const data = await fetchStrapi<HeroData>('/hero', {
    locale,
    populate: '*', // Populate all fields including media and components
    cache: 'no-store', // For development - change to 'force-cache' in production
  });
  if (!data) {
    console.warn(`Hero section data not found for locale: ${locale}`);
    return null;
  }
  
  // Transform Strapi data to component props
  return {
    welcomeText: data.welcomeText || '',
    academyName: data.academyName || '',
    subHeading: data.subHeading || undefined,
    description: data.description || undefined,
    primaryCta: {
      label: data.primaryCtaLabel || 'احجز الآن',
      icon: data.primaryCtaIcon || '📅',
    },
    secondaryCta: {
      label: data.secondaryCtaLabel || 'تواصل معنا',
      icon: data.secondaryCtaIcon || '💬',
    },
    highlights: data.highlights?.map(h => h.text) || [],
    heroImage: data.heroImage ? {
      url: getStrapiMediaUrl(data.heroImage.url) || '',
      alt: data.heroImageAlt || data.heroImage.alternativeText || 'Hero Image',
    } : null,
  };
}

/**
 * Fetch Hero Section for both locales (useful for preloading)
 */
export async function getHeroSectionBothLocales(): Promise<{
  ar: HeroSectionProps | null;
  en: HeroSectionProps | null;
}> {
  const [ar, en] = await Promise.all([
    getHeroSection('ar'),
    getHeroSection('en'),
  ]);
  
  return { ar, en };
}

