// =============================================================================
// HERO SECTION STYLES
// Centralized style definitions for consistency and maintainability
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Color Palette
// -----------------------------------------------------------------------------

export const colors = {
  // Primary colors
  primary: "#06b6d4",         // Cyan - search buttons
  primaryHover: "#0891b2",
  accent: "#f97316",          // Orange - active tabs
  accentLight: "rgba(249, 115, 22, 0.9)",
  
  // Text colors
  textPrimary: "#374151",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  textWhite: "#ffffff",
  
  // Border colors
  borderPrimary: "rgba(30, 64, 175, 0.8)",
  borderLight: "rgba(255, 255, 255, 0.5)",
  borderAccent: "rgba(249, 115, 22, 0.5)",
  
  // Background colors
  bgWhite: "#ffffff",
  bgTransparent: "transparent",
  bgGlass: "rgba(255, 255, 255, 0.05)",
  bgGlassInner: "rgba(255, 255, 255, 0.7)",
  bgInputField: "rgba(255, 255, 255, 0.4)",
  bgTabInactive: "rgba(255, 255, 255, 0.15)",
  
  // Icon colors
  iconBlue: "#3b82f6",
  iconGray: "#374151",
} as const;

// -----------------------------------------------------------------------------
// Spacing
// -----------------------------------------------------------------------------

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px",
  xxxxl: "40px",
} as const;

// -----------------------------------------------------------------------------
// Border Radius
// -----------------------------------------------------------------------------

export const borderRadius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "40px",
  full: "50%",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const typography = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  
  sizes: {
    xs: "11px",
    sm: "12px",
    md: "13px",
    base: "14px",
    lg: "15px",
    xl: "16px",
    xxl: "18px",
    headline: "56px",
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
} as const;

// -----------------------------------------------------------------------------
// Shadows
// -----------------------------------------------------------------------------

export const shadows = {
  glass: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
  activeTab: "0 4px 12px rgba(249, 115, 22, 0.3)",
  chatButton: "0 4px 12px rgba(0, 0, 0, 0.25)",
} as const;

// -----------------------------------------------------------------------------
// Transitions
// -----------------------------------------------------------------------------

export const transitions = {
  fast: "0.2s",
  normal: "0.3s",
  slow: "0.5s ease-in-out",
} as const;

// -----------------------------------------------------------------------------
// Component Styles
// -----------------------------------------------------------------------------

// Hero Section Container
export const heroSectionStyle = (isPackageExpanded: boolean): CSSProperties => ({
  position: "relative",
  minHeight: isPackageExpanded ? "1400px" : "900px",
  transition: `min-height ${transitions.normal}`,
});

// Background Overlay
export const backgroundOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
};

// Content Container
export const contentContainerStyle: CSSProperties = {
  position: "relative",
  zIndex: 10,
  maxWidth: "1700px",
  margin: "0 auto",
  paddingLeft: spacing.xxxl,
  paddingRight: spacing.xxxl,
};

// Headline Styles
export const headlineStyle: CSSProperties = {
  fontFamily: typography.fontFamily,
  color: colors.textWhite,
  lineHeight: 1.2,
  marginBottom: spacing.lg,
  fontWeight: typography.weights.semibold,
  fontSize: typography.sizes.headline,
  letterSpacing: "-0.02em",
};

export const subheadlineStyle: CSSProperties = {
  color: "rgba(255,255,255,0.95)",
  fontSize: typography.sizes.xxl,
  fontWeight: typography.weights.normal,
  fontFamily: typography.fontFamily,
};

// Glass Container (Outer)
export const glassContainerStyle: CSSProperties = {
  backgroundColor: colors.bgGlass,
  backdropFilter: "blur(20px)",
  borderRadius: borderRadius.xxl,
  padding: spacing.xxxl,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: shadows.glass,
};

// Inner White Box
export const innerBoxStyle: CSSProperties = {
  backgroundColor: colors.bgGlassInner,
  borderRadius: borderRadius.xl,
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

// Service Tab Button
export const serviceTabStyle = (isActive: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,
  padding: `${spacing.md} ${spacing.xl}`,
  borderRadius: borderRadius.lg,
  fontSize: typography.sizes.lg,
  fontWeight: typography.weights.semibold,
  whiteSpace: "nowrap",
  border: `1px solid ${isActive ? colors.borderAccent : colors.borderLight}`,
  cursor: "pointer",
  transition: `all ${transitions.normal} ease`,
  backgroundColor: isActive ? colors.accentLight : colors.bgTabInactive,
  color: isActive ? colors.textWhite : colors.textPrimary,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: isActive ? shadows.activeTab : "none",
});

// Trip Type Button
export const tripTypeStyle = (isActive: boolean): CSSProperties => ({
  fontSize: typography.sizes.base,
  paddingBottom: spacing.xs,
  border: "none",
  background: colors.bgTransparent,
  cursor: "pointer",
  transition: `color ${transitions.fast}`,
  color: isActive ? colors.primary : colors.textMuted,
  fontWeight: isActive ? typography.weights.medium : typography.weights.normal,
  borderBottom: `2px solid ${isActive ? colors.primary : "transparent"}`,
});

// Form Input Field
export const inputFieldStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing.md,
  padding: spacing.lg,
  border: `2px solid ${colors.borderPrimary}`,
  borderRadius: borderRadius.lg,
  cursor: "pointer",
  backgroundColor: colors.bgInputField,
  backdropFilter: "blur(4px)",
};

// Compact Input Field (for smaller fields)
export const compactInputFieldStyle: CSSProperties = {
  ...inputFieldStyle,
  padding: `${spacing.md} ${spacing.lg}`,
};

// White Input Field (for non-flight forms)
export const whiteInputFieldStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing.md,
  padding: spacing.lg,
  border: `2px solid ${colors.borderPrimary}`,
  borderRadius: borderRadius.sm,
  cursor: "pointer",
  backgroundColor: colors.bgWhite,
};

// Search Button
export const searchButtonStyle: CSSProperties = {
  backgroundColor: colors.primary,
  color: colors.textWhite,
  fontWeight: typography.weights.semibold,
  padding: `0 48px`,
  borderRadius: borderRadius.xl,
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontSize: typography.sizes.xl,
  minWidth: "160px",
};

// Advanced Search Button
export const advancedSearchButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,
  background: colors.bgTransparent,
  border: "none",
  color: colors.primary,
  fontSize: typography.sizes.base,
  fontWeight: typography.weights.medium,
  cursor: "pointer",
};

// Icon Styles
export const iconStyle = (color: string = colors.iconBlue): CSSProperties => ({
  width: "24px",
  height: "24px",
  color,
  flexShrink: 0,
});

export const smallIconStyle = (color: string = colors.iconGray): CSSProperties => ({
  width: "20px",
  height: "20px",
  color,
  flexShrink: 0,
});

// Form Label
export const labelStyle: CSSProperties = {
  fontSize: typography.sizes.lg,
  color: colors.textSecondary,
};

export const primaryLabelStyle: CSSProperties = {
  fontSize: typography.sizes.lg,
  color: colors.textPrimary,
  margin: 0,
  fontWeight: typography.weights.medium,
};

export const secondaryLabelStyle: CSSProperties = {
  fontSize: typography.sizes.sm,
  color: colors.textMuted,
  margin: 0,
};

// Chat Button Container
export const chatButtonContainerStyle: CSSProperties = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing.xs,
};

// Chat Button Avatar
export const chatButtonAvatarStyle: CSSProperties = {
  width: "64px",
  height: "64px",
  borderRadius: borderRadius.full,
  overflow: "hidden",
  border: `3px solid ${colors.textWhite}`,
  boxShadow: shadows.chatButton,
  cursor: "pointer",
  padding: 0,
  background: colors.bgTransparent,
};

// Remove Button (for package builder)
export const removeButtonStyle: CSSProperties = {
  color: colors.primary,
  fontSize: typography.sizes.sm,
  background: "none",
  border: "none",
  cursor: "pointer",
};

// Checkbox Label
export const checkboxLabelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: typography.sizes.md,
  color: colors.textSecondary,
};
