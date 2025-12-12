// =============================================================================
// CONTACT PAGE STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const contactColors = {
  primary: "#22d3ee", // cyan-400
  accent: "#f97316", // orange-500
  accentHover: "#ea580c",

  textPrimary: "#1f2937",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  textLight: "#9ca3af",

  bgWhite: "#ffffff",
  bgGray: "#f9fafb",
  border: "#e5e7eb",
  borderLight: "#f3f4f6",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const contactTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontFamilySerif: "var(--font-playfair), serif",
} as const;

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const contactHeroStyle: CSSProperties = {
  position: "relative",
  height: "500px",
};

export const contactHeroOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
};

export const contactHeroContentStyle: CSSProperties = {
  position: "relative",
  zIndex: 10,
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 24px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const contactHeroTitleStyle: CSSProperties = {
  fontSize: "64px",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "24px",
  fontFamily: contactTypography.fontFamily,
  letterSpacing: "-0.02em",
};

export const contactHeroDividerStyle: CSSProperties = {
  width: "600px",
  height: "1px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  marginBottom: "24px",
};

export const contactHeroSubtitleStyle: CSSProperties = {
  fontSize: "18px",
  color: "rgba(255, 255, 255, 0.95)",
  maxWidth: "800px",
  lineHeight: 1.6,
  fontFamily: contactTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Contact Form Section
// -----------------------------------------------------------------------------

export const contactSectionStyle: CSSProperties = {
  padding: "80px 24px",
  backgroundColor: contactColors.bgWhite,
};

export const contactContainerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

export const contactGridStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "64px",
  flexWrap: "wrap",
  justifyContent: "space-between",
};

export const contactTitleStyle: CSSProperties = {
  fontSize: "48px",
  fontWeight: 500,
  color: contactColors.textPrimary,
  marginBottom: "8px",
  fontFamily: contactTypography.fontFamilySerif,
  fontStyle: "italic",
  lineHeight: 1.2,
};

export const contactSubtitleStyle: CSSProperties = {
  fontSize: "16px",
  color: contactColors.textMuted,
  marginTop: "24px",
  marginBottom: "48px",
  lineHeight: 1.6,
  fontFamily: contactTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Contact Info Item
// -----------------------------------------------------------------------------

export const contactInfoItemStyle: CSSProperties = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
};

export const contactInfoIconStyle: CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: contactColors.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const contactInfoTitleStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: contactColors.textPrimary,
  marginBottom: "4px",
  fontFamily: contactTypography.fontFamily,
};

export const contactInfoValueStyle: CSSProperties = {
  fontSize: "15px",
  color: contactColors.textMuted,
  fontFamily: contactTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Form Styles
// -----------------------------------------------------------------------------

export const formContainerStyle: CSSProperties = {
  flex: 1,
  minWidth: "300px",
  backgroundColor: contactColors.bgGray,
  borderRadius: "24px",
  padding: "40px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export const formLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "15px",
  color: contactColors.textSecondary,
  marginBottom: "8px",
  fontFamily: contactTypography.fontFamily,
};

export const formInputStyle: CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "8px",
  border: `1px solid ${contactColors.border}`,
  fontSize: "15px",
  color: contactColors.textSecondary,
  outline: "none",
  fontFamily: contactTypography.fontFamily,
  backgroundColor: contactColors.bgWhite,
};

export const formTextareaStyle: CSSProperties = {
  ...formInputStyle,
  resize: "vertical",
};

export const formButtonStyle: CSSProperties = {
  backgroundColor: contactColors.accent,
  color: "#ffffff",
  fontWeight: 600,
  padding: "16px 48px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.2s",
  fontFamily: contactTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Trusted Partner Section
// -----------------------------------------------------------------------------

export const trustedSectionStyle: CSSProperties = {
  padding: "80px 24px",
  backgroundColor: contactColors.bgGray,
};

export const trustedGridStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "64px",
  alignItems: "center",
  marginBottom: "120px",
  flexWrap: "wrap",
};

export const trustedImageStyle: CSSProperties = {
  flex: 1,
  minWidth: "300px",
  height: "400px",
  position: "relative",
  borderRadius: "32px",
  overflow: "hidden",
};

export const trustedTitleStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 600,
  color: contactColors.textPrimary,
  marginBottom: "16px",
  fontFamily: contactTypography.fontFamily,
  lineHeight: 1.2,
};

export const statValueStyle: CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: contactColors.textSecondary,
  fontFamily: contactTypography.fontFamily,
  fontStyle: "italic",
};

export const statLabelStyle: CSSProperties = {
  fontSize: "14px",
  color: contactColors.textMuted,
  fontFamily: contactTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// FAQ Section
// -----------------------------------------------------------------------------

export const faqGridStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "64px",
  alignItems: "flex-start",
  flexWrap: "wrap-reverse",
};

export const faqItemStyle: CSSProperties = {
  backgroundColor: contactColors.bgWhite,
  borderRadius: "32px",
  padding: "20px 24px",
  cursor: "pointer",
  transition: "all 0.3s",
};

export const faqQuestionStyle: CSSProperties = {
  fontSize: "16px",
  color: contactColors.textSecondary,
  fontWeight: 500,
  fontFamily: contactTypography.fontFamily,
};

export const faqAnswerStyle: CSSProperties = {
  marginTop: "16px",
  fontSize: "15px",
  color: contactColors.textMuted,
  lineHeight: 1.6,
  fontFamily: contactTypography.fontFamily,
  paddingTop: "16px",
  borderTop: `1px solid ${contactColors.borderLight}`,
};
