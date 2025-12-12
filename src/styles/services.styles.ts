// =============================================================================
// SERVICES PAGE STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const servicesColors = {
  primary: "#06b6d4",
  primaryDark: "#0891b2",
  
  textPrimary: "#1f2937",
  textSecondary: "#4b5563",
  textMuted: "#6b7280",
  textLight: "#64748b",
  
  bgWhite: "#ffffff",
  bgLight: "#f8fafc",
  bgDark: "#1e293b",
  
  border: "#e2e8f0",
  borderHover: "#cbd5e1",
  
  buttonDark: "#000000",
  buttonLight: "rgba(255, 255, 255, 0.2)",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const servicesTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
} as const;

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const heroSectionStyle: CSSProperties = {
  position: "relative",
  height: "700px",
};

export const heroOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 100%)",
};

export const heroContentStyle: CSSProperties = {
  position: "relative",
  zIndex: 10,
  maxWidth: "1400px",
  margin: "0 auto",
  paddingLeft: "24px",
  paddingRight: "24px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const heroTitleStyle: CSSProperties = {
  fontSize: "64px",
  fontWeight: 700,
  lineHeight: 1.1,
  marginBottom: "24px",
  color: "#ffffff",
  fontFamily: servicesTypography.fontFamily,
  letterSpacing: "-0.02em",
};

export const heroSubtitleStyle: CSSProperties = {
  fontSize: "20px",
  marginBottom: "40px",
  lineHeight: 1.5,
  color: "rgba(255, 255, 255, 0.95)",
  fontFamily: servicesTypography.fontFamily,
  fontWeight: 400,
};

export const primaryButtonStyle: CSSProperties = {
  backgroundColor: servicesColors.buttonDark,
  color: "#ffffff",
  padding: "16px 32px",
  borderRadius: "32px",
  fontWeight: 500,
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  fontFamily: servicesTypography.fontFamily,
};

export const secondaryButtonStyle: CSSProperties = {
  backgroundColor: servicesColors.buttonLight,
  backdropFilter: "blur(8px)",
  border: `1px solid ${servicesColors.buttonDark}`,
  color: servicesColors.buttonDark,
  padding: "16px 32px",
  borderRadius: "32px",
  fontWeight: 500,
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: servicesTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Services List Section
// -----------------------------------------------------------------------------

export const servicesListSectionStyle: CSSProperties = {
  padding: "80px 24px",
  backgroundColor: servicesColors.bgLight,
};

export const servicesContainerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

export const servicesHeaderStyle: CSSProperties = {
  textAlign: "center",
  marginBottom: "64px",
};

export const servicesBadgeStyle: CSSProperties = {
  color: servicesColors.primary,
  fontWeight: 600,
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  display: "block",
  marginBottom: "16px",
};

export const servicesTitleStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  color: servicesColors.textPrimary,
  marginBottom: "24px",
  fontFamily: servicesTypography.fontFamily,
  letterSpacing: "-0.02em",
};

export const servicesSubtitleStyle: CSSProperties = {
  fontSize: "18px",
  color: servicesColors.textMuted,
  maxWidth: "800px",
  margin: "0 auto",
  lineHeight: 1.6,
  fontFamily: servicesTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Service Card Styles
// -----------------------------------------------------------------------------

export const serviceCardStyle = (isHighlighted: boolean): CSSProperties => ({
  backgroundColor: isHighlighted ? undefined : servicesColors.bgWhite,
  background: isHighlighted
    ? `linear-gradient(135deg, ${servicesColors.primaryDark} 0%, ${servicesColors.primary} 100%)`
    : undefined,
  borderRadius: "32px",
  padding: "40px",
  border: isHighlighted ? "none" : `1px solid ${servicesColors.border}`,
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const cardHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
};

export const iconBoxStyle = (bgColor: string): CSSProperties => ({
  width: "64px",
  height: "64px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: bgColor,
});

export const arrowButtonStyle = (isHighlighted: boolean): CSSProperties => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: isHighlighted ? "#ffffff" : "#f1f5f9",
  color: isHighlighted ? servicesColors.primaryDark : servicesColors.bgDark,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
});

export const cardTitleStyle = (isHighlighted: boolean): CSSProperties => ({
  fontSize: "24px",
  fontWeight: 700,
  color: isHighlighted ? "#ffffff" : servicesColors.textPrimary,
  marginBottom: "8px",
  fontFamily: servicesTypography.fontFamily,
});

export const cardSubtitleStyle = (isHighlighted: boolean): CSSProperties => ({
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: isHighlighted ? "#ffffff" : servicesColors.primary,
  marginBottom: "16px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const cardDescriptionStyle = (isHighlighted: boolean): CSSProperties => ({
  fontSize: "15px",
  color: isHighlighted ? "#ffffff" : servicesColors.textSecondary,
  lineHeight: 1.6,
  marginBottom: "24px",
  fontFamily: servicesTypography.fontFamily,
});

export const featureItemStyle = (isHighlighted: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const featureTextStyle = (isHighlighted: boolean): CSSProperties => ({
  fontSize: "14px",
  color: isHighlighted ? "#ecfeff" : servicesColors.textLight,
  fontWeight: 500,
});
