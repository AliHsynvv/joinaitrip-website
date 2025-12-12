"use client";

// =============================================================================
// AUTH INPUT - Styled input for auth forms
// =============================================================================

import {
  authInputStyle,
  authInputErrorStyle,
  errorMessageStyle,
} from "@/styles/auth.styles";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface AuthInputProps {
  type: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AuthInput({
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  disabled = false,
}: AuthInputProps) {
  const inputStyle = error ? authInputErrorStyle : authInputStyle;

  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        style={inputStyle}
      />
      {error && <p style={errorMessageStyle}>{error}</p>}
    </div>
  );
}

export default AuthInput;
