// =============================================================================
// LAYOUT STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const layoutColors = {
  primary: "#06b6d4", // cyan-500
  primaryLight: "#22d3ee", // cyan-400

  textWhite: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#374151",
  textMuted: "#6b7280",

  bgHeader: "rgba(0, 0, 0, 0.2)",
  bgMobileMenu: "rgba(0, 0, 0, 0.9)",
  bgFooter: "#f3f4f6",
  bgWeather: "#f3f4f6",

  borderWhite: "rgba(255, 255, 255, 0.1)",
  borderWhiteLight: "rgba(255, 255, 255, 0.3)",

  toggleBg: "#e5e7eb",
  toggleSun: "#eab308",
  toggleMoon: "#3b82f6",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const layoutTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
} as const;

// -----------------------------------------------------------------------------
// Header Styles
// -----------------------------------------------------------------------------

export const headerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  backgroundColor: layoutColors.bgHeader,
  backdropFilter: "blur(8px)",
  borderBottom: `1px solid ${layoutColors.borderWhite}`,
};

export const headerContainerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 24px",
};

export const headerInnerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "72px",
};

export const logoStyle: CSSProperties = {
  color: layoutColors.textWhite,
  fontWeight: 600,
  fontSize: "22px",
  letterSpacing: "-0.01em",
  fontFamily: layoutTypography.fontFamily,
};

export const navLinkStyle: CSSProperties = {
  color: layoutColors.textWhite,
  fontSize: "15px",
  fontWeight: 400,
  textDecoration: "none",
  transition: "opacity 0.2s",
  fontFamily: layoutTypography.fontFamily,
};

export const languageSelectorStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: layoutColors.textWhite,
  fontSize: "14px",
  fontWeight: 400,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: layoutTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Dark Mode Toggle
// -----------------------------------------------------------------------------

export const darkModeToggleStyle = (isDark: boolean): CSSProperties => ({
  width: "48px",
  height: "26px",
  borderRadius: "9999px",
  backgroundColor: layoutColors.toggleBg,
  display: "flex",
  alignItems: "center",
  padding: "3px",
  border: "none",
  cursor: "pointer",
  position: "relative",
});

export const darkModeToggleKnobStyle = (isDark: boolean): CSSProperties => ({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: isDark ? layoutColors.toggleMoon : layoutColors.toggleSun,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s, background-color 0.3s",
  transform: isDark ? "translateX(22px)" : "translateX(0)",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
});

// -----------------------------------------------------------------------------
// Weather Widget
// -----------------------------------------------------------------------------

export const weatherWidgetStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: layoutColors.bgWeather,
  borderRadius: "6px",
  padding: "4px 12px",
  height: "36px",
};

export const weatherTextStyle: CSSProperties = {
  color: layoutColors.textSecondary,
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: layoutTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Login Button
// -----------------------------------------------------------------------------

export const loginButtonStyle: CSSProperties = {
  backgroundColor: layoutColors.primary,
  color: layoutColors.textWhite,
  fontWeight: 500,
  fontSize: "14px",
  padding: "8px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  transition: "background-color 0.2s",
  fontFamily: layoutTypography.fontFamily,
  height: "36px",
  display: "flex",
  alignItems: "center",
};

// -----------------------------------------------------------------------------
// Mobile Menu
// -----------------------------------------------------------------------------

export const mobileMenuButtonStyle: CSSProperties = {
  padding: "8px",
  color: layoutColors.textWhite,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const mobileMenuOverlayStyle: CSSProperties = {
  backgroundColor: layoutColors.bgMobileMenu,
  backdropFilter: "blur(16px)",
  position: "fixed",
  top: "72px",
  left: 0,
  right: 0,
  padding: "24px",
  height: "calc(100vh - 72px)",
};

export const mobileNavLinkStyle: CSSProperties = {
  color: layoutColors.textWhite,
  fontSize: "18px",
  textDecoration: "none",
  fontWeight: 500,
};

export const mobileDividerStyle: CSSProperties = {
  borderTop: `1px solid ${layoutColors.borderWhite}`,
  margin: "10px 0",
};

export const mobileLoginButtonStyle: CSSProperties = {
  backgroundColor: layoutColors.primary,
  color: layoutColors.textWhite,
  fontWeight: 600,
  textAlign: "center",
  padding: "12px",
  borderRadius: "8px",
  textDecoration: "none",
  marginTop: "10px",
};

// -----------------------------------------------------------------------------
// Footer Styles
// -----------------------------------------------------------------------------

export const footerStyle: CSSProperties = {
  backgroundColor: layoutColors.bgFooter,
  padding: "64px 24px",
};

export const footerContainerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

export const footerTopStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "48px",
  flexWrap: "wrap",
  gap: "24px",
};

export const footerLogoStyle: CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: layoutColors.primaryLight,
  fontFamily: layoutTypography.fontFamily,
};

export const socialIconsStyle: CSSProperties = {
  display: "flex",
  gap: "24px",
};

export const socialIconLinkStyle: CSSProperties = {
  color: layoutColors.textPrimary,
  transition: "color 0.2s",
};

export const footerGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "40px",
};

export const footerColumnTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: layoutColors.textPrimary,
  marginBottom: "24px",
  fontFamily: layoutTypography.fontFamily,
};

export const footerLinkStyle: CSSProperties = {
  color: layoutColors.textMuted,
  textDecoration: "none",
  fontSize: "15px",
};
