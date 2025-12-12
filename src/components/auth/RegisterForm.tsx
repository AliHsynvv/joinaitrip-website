"use client";

// =============================================================================
// REGISTER FORM - User registration page
// =============================================================================

import Link from "next/link";
import { AuthLayout } from "./AuthLayout";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";
import { useRegisterForm } from "@/hooks/useAuthForm";
import { REGISTER_CONTENT, TERMS_TEXT } from "@/constants/auth.constants";
import {
  authFormStyle,
  authButtonStyle,
  authButtonDisabledStyle,
  generalErrorStyle,
  termsTextStyle,
  authLinkStyle,
} from "@/styles/auth.styles";
import type { RegisterFormData } from "@/types/auth.types";

// -----------------------------------------------------------------------------
// Terms Footer Component
// -----------------------------------------------------------------------------

function TermsFooter() {
  return (
    <p style={termsTextStyle}>
      {TERMS_TEXT.prefix}{" "}
      <Link href={TERMS_TEXT.termsHref} style={authLinkStyle}>
        {TERMS_TEXT.termsLink}
      </Link>{" "}
      {TERMS_TEXT.and}{" "}
      <Link href={TERMS_TEXT.privacyHref} style={authLinkStyle}>
        {TERMS_TEXT.privacyLink}
      </Link>
      .
    </p>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function RegisterForm() {
  // Form state management
  const {
    data,
    errors,
    isLoading,
    generalError,
    updateField,
    handleSubmit,
  } = useRegisterForm(handleRegister);

  // Register API call
  async function handleRegister(formData: RegisterFormData): Promise<void> {
    // TODO: Replace with actual API call
    console.log("Register attempt:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example API integration:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Registration failed');
    // }
    //
    // const { token, user } = await response.json();
    // // Store token and redirect to onboarding or home
  }

  return (
    <AuthLayout content={REGISTER_CONTENT} footer={<TermsFooter />}>
      <form onSubmit={handleSubmit} style={authFormStyle}>
        {/* General Error */}
        {generalError && <div style={generalErrorStyle}>{generalError}</div>}

        {/* Full Name Input */}
        <AuthInput
          type="text"
          value={data.fullName}
          onChange={(value) => updateField("fullName", value)}
          placeholder="Full name"
          autoComplete="name"
          error={errors.fullName}
          disabled={isLoading}
        />

        {/* Email Input */}
        <AuthInput
          type="email"
          value={data.email}
          onChange={(value) => updateField("email", value)}
          placeholder="E-mail"
          autoComplete="email"
          error={errors.email}
          disabled={isLoading}
        />

        {/* Password Input */}
        <PasswordInput
          value={data.password}
          onChange={(value) => updateField("password", value)}
          placeholder="Password"
          autoComplete="new-password"
          error={errors.password}
          disabled={isLoading}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={isLoading ? authButtonDisabledStyle : authButtonStyle}
        >
          {isLoading ? "Creating account..." : REGISTER_CONTENT.buttonText}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterForm;
