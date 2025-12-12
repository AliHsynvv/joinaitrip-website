"use client";

// =============================================================================
// PASSWORD INPUT - Input with toggle visibility
// =============================================================================

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  authInputStyle,
  authInputErrorStyle,
  passwordToggleStyle,
  errorMessageStyle,
} from "@/styles/auth.styles";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface PasswordInputProps {
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

export function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  autoComplete = "current-password",
  error,
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = error ? authInputErrorStyle : authInputStyle;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          style={{ ...inputStyle, paddingRight: "48px" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={passwordToggleStyle}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p style={errorMessageStyle}>{error}</p>}
    </div>
  );
}

export default PasswordInput;
