/**
 * Strapi API Client
 * Base configuration and utilities for fetching data from Strapi CMS
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  locale?: 'ar' | 'en';
  populate?: string | string[];
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Build Strapi API URL with query parameters
 */
export function buildStrapiUrl(path: string, options: StrapiRequestOptions = {}): string {
  const url = new URL(`/api${path}`, STRAPI_URL);
  
  if (options.locale) {
    url.searchParams.set('locale', options.locale);
  }
  
  if (options.populate) {
    const populateValue = Array.isArray(options.populate) 
      ? options.populate.join(',') 
      : options.populate;
    url.searchParams.set('populate', populateValue);
  }
  
  return url.toString();
}

/**
 * Fetch data from Strapi API
 */
export async function fetchStrapi<T>(
  path: string, 
  options: StrapiRequestOptions = {}
): Promise<T | null> {
  const url = buildStrapiUrl(path, options);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  try {
    const response = await fetch(url, {
      headers,
      cache: options.cache || 'no-store',
      next: options.next,
    });
    
    if (!response.ok) {
      console.error(`Strapi API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const json = await response.json();
    return json.data || null;
  } catch (error) {
    console.error('Failed to fetch from Strapi:', error);
    return null;
  }
}

/**
 * Get Strapi media URL
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

