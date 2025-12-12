// =============================================================================
// USE CONTACT PAGE FORM HOOK
// Form state management for contact page
// =============================================================================

import { useState, useCallback, FormEvent } from "react";
import {
  CONTACT_FORM_INITIAL,
  CONTACT_VALIDATION,
} from "@/constants/contact.constants";
import type { ContactFormData, ContactFormState } from "@/types/contact.types";

// -----------------------------------------------------------------------------
// Validation Functions
// -----------------------------------------------------------------------------

function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return CONTACT_VALIDATION.email.required;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return CONTACT_VALIDATION.email.invalid;
  }
  return undefined;
}

function validateName(name: string): string | undefined {
  if (!name.trim()) {
    return CONTACT_VALIDATION.name.required;
  }
  if (name.trim().length < 2) {
    return CONTACT_VALIDATION.name.minLength;
  }
  return undefined;
}

function validateMessage(message: string): string | undefined {
  if (!message.trim()) {
    return CONTACT_VALIDATION.message.required;
  }
  if (message.trim().length < 10) {
    return CONTACT_VALIDATION.message.minLength;
  }
  return undefined;
}

function validateForm(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  
  const nameError = validateName(data.name);
  const emailError = validateEmail(data.email);
  const messageError = validateMessage(data.message);
  
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;
  
  return errors;
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useContactPageForm(
  onSubmit: (data: ContactFormData) => Promise<void>
) {
  const [state, setState] = useState<ContactFormState>({
    ...CONTACT_FORM_INITIAL,
    isLoading: false,
    isSuccess: false,
    errors: {},
    generalError: null,
  });

  const updateField = useCallback(<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: undefined },
      generalError: null,
      isSuccess: false,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState({
      ...CONTACT_FORM_INITIAL,
      isLoading: false,
      isSuccess: false,
      errors: {},
      generalError: null,
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const formData: ContactFormData = {
        name: state.name,
        email: state.email,
        message: state.message,
      };

      // Validate
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setState((prev) => ({ ...prev, errors: validationErrors }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, generalError: null }));

      try {
        await onSubmit(formData);
        setState((prev) => ({
          ...prev,
          ...CONTACT_FORM_INITIAL,
          isLoading: false,
          isSuccess: true,
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          generalError: message,
        }));
      }
    },
    [state.name, state.email, state.message, onSubmit]
  );

  return {
    data: {
      name: state.name,
      email: state.email,
      message: state.message,
    },
    errors: state.errors,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    generalError: state.generalError,
    updateField,
    resetForm,
    handleSubmit,
  };
}

// -----------------------------------------------------------------------------
// FAQ Toggle Hook
// -----------------------------------------------------------------------------

export function useFaqToggle() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const isOpen = useCallback((id: string) => openId === id, [openId]);

  return { openId, toggle, isOpen };
}
