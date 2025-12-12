// =============================================================================
// CONTACT PAGE TYPES
// =============================================================================

import { LucideIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Contact Form Types
// -----------------------------------------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState extends ContactFormData {
  isLoading: boolean;
  isSuccess: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
  generalError: string | null;
}

// -----------------------------------------------------------------------------
// Contact Info Types
// -----------------------------------------------------------------------------

export interface ContactInfo {
  id: string;
  icon: LucideIcon;
  title: string;
  value: string;
}

// -----------------------------------------------------------------------------
// Statistics Types
// -----------------------------------------------------------------------------

export interface Stat {
  id: string;
  value: string;
  label: string;
}

// -----------------------------------------------------------------------------
// FAQ Types
// -----------------------------------------------------------------------------

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// -----------------------------------------------------------------------------
// Content Types
// -----------------------------------------------------------------------------

export interface ContactHeroContent {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
  };
}

export interface TrustedPartnerContent {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface FAQContent {
  title: string;
  image: string;
  imageAlt: string;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
