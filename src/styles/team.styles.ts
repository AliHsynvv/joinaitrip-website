// =============================================================================
// TEAM PAGE STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const teamColors = {
  primary: "#f97316", // orange-500
  
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  textWhite: "#ffffff",
  textWhiteMuted: "rgba(255, 255, 255, 0.9)",
  
  bgWhite: "#ffffff",
  bgCard: "#f3f4f6",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const teamTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
} as const;

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const teamHeroSectionStyle: CSSProperties = {
  position: "relative",
  height: "500px",
};

export const teamHeroOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
};

// -----------------------------------------------------------------------------
// Grid Section
// -----------------------------------------------------------------------------

export const teamGridSectionStyle: CSSProperties = {
  padding: "0 24px 80px 24px",
  backgroundColor: teamColors.bgWhite,
};

export const teamGridContainerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

export const teamGridHeaderStyle: CSSProperties = {
  marginTop: "-140px",
  marginBottom: "64px",
  position: "relative",
  zIndex: 20,
};

export const teamTitleStyle: CSSProperties = {
  fontSize: "96px",
  fontWeight: 800,
  color: teamColors.primary,
  marginBottom: "24px",
  fontFamily: teamTypography.fontFamily,
  letterSpacing: "-0.02em",
  lineHeight: 0.9,
  textShadow: "0 4px 8px rgba(0,0,0,0.2)",
  whiteSpace: "pre-line",
};

export const teamSubtitleStyle: CSSProperties = {
  fontSize: "16px",
  color: teamColors.textSecondary,
  maxWidth: "800px",
  lineHeight: 1.6,
  fontFamily: teamTypography.fontFamily,
  marginTop: "32px",
};

export const teamGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
};

// -----------------------------------------------------------------------------
// Member Card
// -----------------------------------------------------------------------------

export const memberCardStyle: CSSProperties = {
  position: "relative",
  height: "400px",
  borderRadius: "24px",
  overflow: "hidden",
  backgroundColor: teamColors.bgCard,
};

export const memberCardOverlayStyle: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "24px",
  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "50%",
};

export const memberNameStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: teamColors.textWhite,
  marginBottom: "4px",
  fontFamily: teamTypography.fontFamily,
};

export const memberRoleStyle: CSSProperties = {
  fontSize: "14px",
  color: teamColors.textWhiteMuted,
  fontFamily: teamTypography.fontFamily,
};
