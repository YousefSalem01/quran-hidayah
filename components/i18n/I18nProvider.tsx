"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import enMessages from "../../locales/en.json";
import arMessages from "../../locales/ar.json";
import type { Locale, Messages, I18nContextValue, I18nProviderProps } from "../../types";

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function getMessage(messages: Messages, key: string): string {
  return key.split(".").reduce<any>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return "";
  }, messages) as string;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("qa-locale") as Locale | null;
    if (stored === "en" || stored === "ar") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("qa-locale", locale);
    const dir = locale === "ar" ? "rtl" : "ltr";
    const lang = locale === "ar" ? "ar" : "en";
    if (document?.documentElement) {
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", lang);
    }
  }, [locale]);

  const messages = useMemo<Messages>(
    () => (locale === "ar" ? (arMessages as Messages) : enMessages),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      t: (key: string) => getMessage(messages, key) ?? "",
      toggleLocale: () => {
        setLocale((prev) => (prev === "en" ? "ar" : "en"));
      },
    }),
    [locale, messages],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}


