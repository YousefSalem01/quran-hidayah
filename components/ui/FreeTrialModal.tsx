"use client";

import { useEffect } from "react";
import { useI18n } from "../i18n/I18nProvider";
import quranConfig from "../../quran-academy-config.json";
import { useFreeTrialForm } from "../../hooks/useFreeTrialForm";
import type { FreeTrialModalProps } from "../../types";

export function FreeTrialModal({ isOpen, onClose }: FreeTrialModalProps) {
  const { t, messages } = useI18n();
  const freeTrialSection = quranConfig.sections.find((s) => s.id === "free_trial");
  const fields = freeTrialSection && "props" in freeTrialSection ? (freeTrialSection.props as any).fields || [] : [];
  const {
    formState,
    formErrors,
    formSubmitted,
    handleFieldChange,
    handleSubmit,
    resetForm,
  } = useFreeTrialForm(fields);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleOpen = () => {
    resetForm();
  };

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-3xl bg-(--qa-secondary-lighter) shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 border-b border-(--qa-neutral-gray) px-5 py-3">
          <div className="text-right">
            <h2 className="text-base font-semibold text-(--qa-primary-main)">
              {t("freeTrial.title")}
            </h2>
            <p className="mt-1 text-xs text-(--qa-neutral-dark)">
              {t("freeTrial.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-(--qa-neutral-dark) shadow-sm hover:bg-background"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form
          className="space-y-3 overflow-y-auto px-5 py-4 text-right"
          onSubmit={handleSubmit}
        >
          <p className="text-xs text-(--qa-neutral-dark)">
            {t("freeTrial.description")}
          </p>

          {fields.map((field: any) => (
            <div key={field.name} className="space-y-1">
              <label
                htmlFor={field.name}
                className="block text-xs font-semibold text-foreground"
              >
                {t(`freeTrial.fields.${field.name}.label`)}
                {field.required && <span className="text-(--qa-error)"> *</span>}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formState[field.name as keyof typeof formState] ?? ""}
                  onChange={(event) =>
                    handleFieldChange(
                      field.name as keyof typeof formState,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-(--qa-neutral-gray) bg-white px-3 py-2 text-xs text-(--qa-neutral-dark) shadow-sm outline-none focus:border-(--qa-primary-main) focus:ring-2 focus:ring-(--qa-primary-light)/20"
                >
                  <option value="">
                    {t(`freeTrial.fields.${field.name}.placeholder`)}
                  </option>
                  {field.options?.map((option: { value: string; label: string }) => (
                    <option key={option.value} value={option.value}>
                      {(messages.freeTrial.fields[
                        field.name as keyof typeof messages.freeTrial.fields
                      ] as any)?.options?.[option.value] ?? option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formState[field.name as keyof typeof formState] ?? ""}
                  onChange={(event) =>
                    handleFieldChange(
                      field.name as keyof typeof formState,
                      event.target.value,
                    )
                  }
                  placeholder={t(`freeTrial.fields.${field.name}.placeholder`)}
                  className="w-full rounded-xl border border-(--qa-neutral-gray) bg-white px-3 py-2 text-xs text-(--qa-neutral-dark) shadow-sm outline-none focus:border-(--qa-primary-main) focus:ring-2 focus:ring-(--qa-primary-light)/20"
                />
              )}
              {formErrors[field.name as keyof typeof formState] && (
                <p className="text-[10px] text-(--qa-error)">
                  {formErrors[field.name as keyof typeof formState]}
                </p>
              )}
            </div>
          ))}

          {formSubmitted && (
            <div className="flex items-start gap-2 rounded-2xl bg-(--qa-success)/10 px-3 py-2 text-xs text-(--qa-primary-main)">
              <span aria-hidden="true">✅</span>
              <p>{t("freeTrial.successMessage")}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-(--qa-primary-main) px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-(--qa-primary-light)"
          >
            {t("freeTrial.submitLabel")}
          </button>
        </form>
      </div>
    </div>
  );
}

