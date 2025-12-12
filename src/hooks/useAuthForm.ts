// =============================================================================
// USE AUTH FORM HOOK
// Reusable form state management for authentication forms
// =============================================================================

import { useState, useCallback, FormEvent } from "react";
import type {
  AuthFormState,
  AuthFormOptions,
  LoginFormData,
  RegisterFormData,
} from "@/types/auth.types";
import {
  AUTH_VALIDATION,
  LOGIN_INITIAL_DATA,
  REGISTER_INITIAL_DATA,
} from "@/constants/auth.constants";

// -----------------------------------------------------------------------------
// Generic Auth Form Hook
// -----------------------------------------------------------------------------

export function useAuthForm<T extends object>(
  options: AuthFormOptions<T>
) {
  const { initialData, onSubmit, validate } = options;

  const [state, setState] = useState<AuthFormState<T>>({
    data: initialData,
    isLoading: false,
    isSuccess: false,
    errors: {},
    generalError: null,
  });

  // Update a single field
  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined },
      generalError: null,
    }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      isSuccess: false,
      errors: {},
      generalError: null,
    });
  }, [initialData]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Run validation if provided
      if (validate) {
        const validationErrors = validate(state.data);
        if (Object.keys(validationErrors).length > 0) {
          setState((prev) => ({ ...prev, errors: validationErrors }));
          return;
        }
      }

      setState((prev) => ({ ...prev, isLoading: true, generalError: null }));

      try {
        await onSubmit(state.data);
        setState((prev) => ({ ...prev, isLoading: false, isSuccess: true }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          generalError: message,
        }));
      }
    },
    [state.data, onSubmit, validate]
  );

  return {
    ...state,
    updateField,
    resetForm,
    handleSubmit,
  };
}

// -----------------------------------------------------------------------------
// Validation Functions
// -----------------------------------------------------------------------------

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return AUTH_VALIDATION.email.required;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return AUTH_VALIDATION.email.invalid;
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return AUTH_VALIDATION.password.required;
  }
  if (password.length < 8) {
    return AUTH_VALIDATION.password.minLength;
  }
  return undefined;
}

export function validateFullName(name: string): string | undefined {
  if (!name.trim()) {
    return AUTH_VALIDATION.fullName.required;
  }
  if (name.trim().length < 2) {
    return AUTH_VALIDATION.fullName.minLength;
  }
  return undefined;
}

// -----------------------------------------------------------------------------
// Pre-configured Hooks
// -----------------------------------------------------------------------------

export function useLoginForm(onSubmit: (data: LoginFormData) => Promise<void>) {
  return useAuthForm<LoginFormData>({
    initialData: LOGIN_INITIAL_DATA,
    onSubmit,
    validate: (data) => {
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      const emailError = validateEmail(data.email);
      const passwordError = validatePassword(data.password);
      if (emailError) errors.email = emailError;
      if (passwordError) errors.password = passwordError;
      return errors;
    },
  });
}

export function useRegisterForm(onSubmit: (data: RegisterFormData) => Promise<void>) {
  return useAuthForm<RegisterFormData>({
    initialData: REGISTER_INITIAL_DATA,
    onSubmit,
    validate: (data) => {
      const errors: Partial<Record<keyof RegisterFormData, string>> = {};
      const nameError = validateFullName(data.fullName);
      const emailError = validateEmail(data.email);
      const passwordError = validatePassword(data.password);
      if (nameError) errors.fullName = nameError;
      if (emailError) errors.email = emailError;
      if (passwordError) errors.password = passwordError;
      return errors;
    },
  });
}
