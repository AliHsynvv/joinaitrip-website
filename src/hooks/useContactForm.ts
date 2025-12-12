// =============================================================================
// USE CONTACT FORM HOOK
// Form state management with API integration ready
// =============================================================================

import { useState, useCallback } from "react";
import type { HomeContactFormData, HomeContactFormState, HomeContactApiResponse } from "@/types/sections.types";

// -----------------------------------------------------------------------------
// Initial State
// -----------------------------------------------------------------------------

const initialFormData: HomeContactFormData = {
  fullName: "",
  email: "",
  message: "",
};

const initialFormState: HomeContactFormState = {
  ...initialFormData,
  isLoading: false,
  isSuccess: false,
  error: null,
};

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

interface UseContactFormReturn {
  formState: HomeContactFormState;
  handleChange: (field: keyof HomeContactFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useContactForm(
  onSubmit?: (data: HomeContactFormData) => Promise<HomeContactApiResponse>
): UseContactFormReturn {
  const [formState, setFormState] = useState<HomeContactFormState>(initialFormState);

  // Handle input change
  const handleChange = useCallback((field: keyof HomeContactFormData, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      error: null, // Clear error on change
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formState.fullName.trim()) {
      setFormState((prev) => ({ ...prev, error: "Please enter your name" }));
      return;
    }
    if (!formState.email.trim() || !formState.email.includes("@")) {
      setFormState((prev) => ({ ...prev, error: "Please enter a valid email" }));
      return;
    }
    if (!formState.message.trim()) {
      setFormState((prev) => ({ ...prev, error: "Please enter a message" }));
      return;
    }

    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const formData: HomeContactFormData = {
        fullName: formState.fullName,
        email: formState.email,
        message: formState.message,
      };

      if (onSubmit) {
        const response = await onSubmit(formData);
        if (response.success) {
          setFormState({
            ...initialFormState,
            isSuccess: true,
          });
        } else {
          setFormState((prev) => ({
            ...prev,
            isLoading: false,
            error: response.error || "Something went wrong",
          }));
        }
      } else {
        // Default behavior: simulate API call
        console.log("Contact form submitted:", formData);
        // TODO: Replace with actual API call
        // Example:
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
        
        // Simulate success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFormState({
          ...initialFormState,
          isSuccess: true,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to send message. Please try again.",
      }));
    }
  }, [formState, onSubmit]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  return {
    formState,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useContactForm;
