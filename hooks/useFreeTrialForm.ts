import { useState } from "react";
import { useI18n } from "../components/i18n/I18nProvider";
import type { FreeTrialFormState, FreeTrialFormErrors } from "../types";

export function useFreeTrialForm(fields: any[]) {
  const { t } = useI18n();
  const initialFormState: FreeTrialFormState = Object.fromEntries(
    fields.map((field: any) => [field.name, ""])
  ) as FreeTrialFormState;

  const [formState, setFormState] = useState<FreeTrialFormState>(
    initialFormState,
  );
  const [formErrors, setFormErrors] = useState<FreeTrialFormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFieldChange = (name: keyof FreeTrialFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = (): boolean => {
    const errors: FreeTrialFormErrors = {};
    fields.forEach((field: any) => {
      const value = formState[field.name]?.trim();
      if (field.required && !value) {
        errors[field.name] = t("freeTrial.errors.required");
        return;
      }

      if (field.name === "email" && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors.email = t("freeTrial.errors.email");
        }
      }

      if (field.name === "whatsapp" && value) {
        const digits = value.replace(/[^\d]/g, "");
        if (digits.length < 9) {
          errors.whatsapp = t("freeTrial.errors.whatsapp");
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormErrors({});
  };

  return {
    formState,
    formErrors,
    formSubmitted,
    handleFieldChange,
    handleSubmit,
    resetForm,
  };
}

