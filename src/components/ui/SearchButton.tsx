"use client";

// =============================================================================
// SEARCH BUTTON COMPONENT
// Primary action button for search forms
// =============================================================================

import { CSSProperties, ReactNode } from "react";
import { searchButtonStyle, colors, borderRadius, typography } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SearchButtonProps {
  children?: ReactNode;
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "wide" | "full";
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SearchButton({
  children,
  label = "Search",
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className,
  style,
}: SearchButtonProps) {
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      minWidth: "160px",
      padding: "0 48px",
    },
    wide: {
      flex: 1.5,
      padding: "0 48px",
    },
    full: {
      width: "100%",
      padding: "16px 48px",
    },
  };

  return (
    <button
      className={`search-submit-btn ${className || ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        ...searchButtonStyle,
        ...variantStyles[variant],
        opacity: disabled || isLoading ? 0.7 : 1,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {isLoading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ animation: "spin 1s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Loading...
        </span>
      ) : (
        children || label
      )}
    </button>
  );
}

export default SearchButton;
