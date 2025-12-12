// =============================================================================
// AUTH STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const authColors = {
  primary: "#22d3ee", // cyan-400
  primaryHover: "#06b6d4", // cyan-500
  link: "#06b6d4",

  textPrimary: "#1f2937",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  textLight: "#9ca3af",

  bgWhite: "#ffffff",
  border: "#e5e7eb",

  error: "#ef4444",
  success: "#22c55e",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const authTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
} as const;

// -----------------------------------------------------------------------------
// Layout Styles
// -----------------------------------------------------------------------------

export const authSectionStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 24px",
  backgroundColor: authColors.bgWhite,
};

export const authContainerStyle: CSSProperties = {
  maxWidth: "1200px",
  width: "100%",
  display: "flex",
  gap: "80px",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
};

export const authImageBoxStyle: CSSProperties = {
  flex: 1,
  minWidth: "300px",
  maxWidth: "500px",
  height: "600px",
  position: "relative",
  borderRadius: "32px",
  overflow: "hidden",
};

export const authFormBoxStyle: CSSProperties = {
  flex: 1,
  minWidth: "300px",
  maxWidth: "480px",
};

// -----------------------------------------------------------------------------
// Form Styles
// -----------------------------------------------------------------------------

export const authTitleStyle: CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: authColors.textPrimary,
  marginBottom: "12px",
  fontFamily: authTypography.fontFamily,
  lineHeight: 1.3,
  textAlign: "center",
};

export const authSubtitleStyle: CSSProperties = {
  fontSize: "15px",
  color: authColors.textLight,
  fontFamily: authTypography.fontFamily,
  textAlign: "center",
};

export const authFormStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

export const authInputStyle: CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: `1px solid ${authColors.border}`,
  fontSize: "15px",
  color: authColors.textSecondary,
  outline: "none",
  fontFamily: authTypography.fontFamily,
};

export const authInputErrorStyle: CSSProperties = {
  ...authInputStyle,
  borderColor: authColors.error,
};

export const authButtonStyle: CSSProperties = {
  backgroundColor: authColors.primary,
  color: "#ffffff",
  fontWeight: 600,
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "8px",
  fontFamily: authTypography.fontFamily,
  transition: "background-color 0.2s",
  width: "100%",
};

export const authButtonDisabledStyle: CSSProperties = {
  ...authButtonStyle,
  opacity: 0.7,
  cursor: "not-allowed",
};

// -----------------------------------------------------------------------------
// Password Toggle Button
// -----------------------------------------------------------------------------

export const passwordToggleStyle: CSSProperties = {
  position: "absolute",
  right: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: authColors.textLight,
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// -----------------------------------------------------------------------------
// Links & Text
// -----------------------------------------------------------------------------

export const authAlternateTextStyle: CSSProperties = {
  fontSize: "14px",
  color: authColors.textMuted,
  fontFamily: authTypography.fontFamily,
  textAlign: "center",
};

export const authLinkStyle: CSSProperties = {
  color: authColors.link,
  textDecoration: "underline",
  fontWeight: 500,
};

export const termsTextStyle: CSSProperties = {
  fontSize: "12px",
  color: authColors.textLight,
  textAlign: "center",
  lineHeight: 1.5,
  fontFamily: authTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Error Message
// -----------------------------------------------------------------------------

export const errorMessageStyle: CSSProperties = {
  fontSize: "13px",
  color: authColors.error,
  marginTop: "4px",
  fontFamily: authTypography.fontFamily,
};

export const generalErrorStyle: CSSProperties = {
  backgroundColor: "#fef2f2",
  border: `1px solid ${authColors.error}`,
  borderRadius: "8px",
  padding: "12px 16px",
  color: authColors.error,
  fontSize: "14px",
  fontFamily: authTypography.fontFamily,
  textAlign: "center",
};
