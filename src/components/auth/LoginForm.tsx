"use client";

// =============================================================================
// LOGIN FORM - User login page
// =============================================================================

import { AuthLayout } from "./AuthLayout";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";
import { useLoginForm } from "@/hooks/useAuthForm";
import { LOGIN_CONTENT } from "@/constants/auth.constants";
import {
  authFormStyle,
  authButtonStyle,
  authButtonDisabledStyle,
  generalErrorStyle,
} from "@/styles/auth.styles";
import type { LoginFormData } from "@/types/auth.types";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function LoginForm() {
  // Form state management
  const {
    data,
    errors,
    isLoading,
    generalError,
    updateField,
    handleSubmit,
  } = useLoginForm(handleLogin);

  // Login API call
  async function handleLogin(formData: LoginFormData): Promise<void> {
    // TODO: Replace with actual API call
    console.log("Login attempt:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example API integration:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Login failed');
    // }
    //
    // const { token, user } = await response.json();
    // // Store token and redirect
  }

  return (
    <AuthLayout content={LOGIN_CONTENT}>
      <form onSubmit={handleSubmit} style={authFormStyle}>
        {/* General Error */}
        {generalError && <div style={generalErrorStyle}>{generalError}</div>}

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
          autoComplete="current-password"
          error={errors.password}
          disabled={isLoading}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={isLoading ? authButtonDisabledStyle : authButtonStyle}
        >
          {isLoading ? "Logging in..." : LOGIN_CONTENT.buttonText}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginForm;
