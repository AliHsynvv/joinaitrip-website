// =============================================================================
// AUTH CONSTANTS
// =============================================================================

import type { AuthPageContent, AuthField, LoginFormData, RegisterFormData } from "@/types/auth.types";

// -----------------------------------------------------------------------------
// Login Page Content
// -----------------------------------------------------------------------------

export const LOGIN_CONTENT: AuthPageContent = {
  title: "Don't wait, adventure is\ncalling you!",
  subtitle: "Get started absolutely free",
  buttonText: "Log In",
  alternateText: "Don't have an account yet?",
  alternateLinkText: "Sign up",
  alternateLinkHref: "/register",
  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
  imageAlt: "Adventure calling",
} as const;

export const LOGIN_FIELDS: AuthField[] = [
  {
    name: "email",
    type: "email",
    placeholder: "E-mail",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "current-password",
  },
];

export const LOGIN_INITIAL_DATA: LoginFormData = {
  email: "",
  password: "",
};

// -----------------------------------------------------------------------------
// Register Page Content
// -----------------------------------------------------------------------------

export const REGISTER_CONTENT: AuthPageContent = {
  title: "Don't wait, adventure is\ncalling you!",
  subtitle: "Get started absolutely free",
  buttonText: "Sign Up",
  alternateText: "Already have an account?",
  alternateLinkText: "Log in",
  alternateLinkHref: "/login",
  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
  imageAlt: "Adventure calling",
} as const;

export const REGISTER_FIELDS: AuthField[] = [
  {
    name: "fullName",
    type: "text",
    placeholder: "Full name",
    autoComplete: "name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "E-mail",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
  },
];

export const REGISTER_INITIAL_DATA: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
};

// -----------------------------------------------------------------------------
// Terms & Policy
// -----------------------------------------------------------------------------

export const TERMS_TEXT = {
  prefix: "By clicking the create account button, you confirm that you agree to the",
  termsLink: "Terms of Service",
  termsHref: "/terms",
  and: "and",
  privacyLink: "Privacy Policy",
  privacyHref: "/privacy",
} as const;

// -----------------------------------------------------------------------------
// Validation Messages
// -----------------------------------------------------------------------------

export const AUTH_VALIDATION = {
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
  },
  fullName: {
    required: "Full name is required",
    minLength: "Name must be at least 2 characters",
  },
} as const;
