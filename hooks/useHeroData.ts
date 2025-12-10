/**
 * Hook to fetch Hero Section data from Strapi
 */

import { useState, useEffect } from 'react';
import type { HeroSectionProps } from '@/lib/api/hero';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function useHeroData(locale: 'ar' | 'en' = 'ar') {
  const [data, setData] = useState<HeroSectionProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        setIsLoading(true);
        setError(null);

        const url = `${STRAPI_URL}/api/hero?locale=${locale}&populate=*`;
        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch hero data: ${response.statusText}`);
        }

        const json = await response.json();
        const strapiData = json.data;

        if (!strapiData) {
          setData(null);
          return;
        }

        // Transform Strapi response to component props
        const transformedData: HeroSectionProps = {
          welcomeText: strapiData.welcomeText || '',
          academyName: strapiData.academyName || '',
          subHeading: strapiData.subHeading || undefined,
          description: strapiData.description || undefined,
          primaryCta: {
            label: strapiData.primaryCtaLabel || 'احجز الآن',
            icon: strapiData.primaryCtaIcon || '📅',
          },
          secondaryCta: {
            label: strapiData.secondaryCtaLabel || 'تواصل معنا',
            icon: strapiData.secondaryCtaIcon || '💬',
          },
          highlights: strapiData.highlights?.map((h: any) => h.text) || [],
          heroImage: strapiData.heroImage ? {
            url: strapiData.heroImage.url.startsWith('http')
              ? strapiData.heroImage.url
              : `${STRAPI_URL}${strapiData.heroImage.url}`,
            alt: strapiData.heroImageAlt || strapiData.heroImage.alternativeText || 'Hero Image',
          } : null,
        };

        setData(transformedData);
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHeroData();
  }, [locale]);

  return { data, isLoading, error };
}

