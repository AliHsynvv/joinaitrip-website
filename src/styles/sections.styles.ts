// =============================================================================
// SECTIONS STYLES - Common styles for home page sections
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Color Palette
// -----------------------------------------------------------------------------

export const sectionColors = {
  // Background
  bgWhite: "#ffffff",
  bgGray: "#f9fafb",
  
  // Text
  textPrimary: "#1f2937",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  
  // Borders
  borderLight: "#e5e7eb",
  
  // Brand
  orange: "#f97316",
  orangeHover: "#ea580c",
  green: "#059669",
  red: "#dc2626",
  trustpilotGreen: "#00b67a",
  
  // Overlay
  overlayGradient: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const sectionTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  
  heading: {
    fontSize: "32px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: sectionColors.textPrimary,
  },
  
  subheading: {
    fontSize: "16px",
    fontWeight: 400,
    color: sectionColors.textMuted,
  },
  
  body: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: sectionColors.textSecondary,
  },
} as const;

// -----------------------------------------------------------------------------
// Section Container
// -----------------------------------------------------------------------------

export const sectionContainerStyle: CSSProperties = {
  padding: "0 24px 80px 24px",
  backgroundColor: sectionColors.bgWhite,
};

export const sectionInnerStyle: CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

// -----------------------------------------------------------------------------
// Section Header
// -----------------------------------------------------------------------------

export const sectionHeaderStyle = (alignment: "left" | "center" | "right" = "left"): CSSProperties => ({
  textAlign: alignment,
  marginBottom: alignment === "center" ? "48px" : "32px",
});

export const sectionTitleStyle: CSSProperties = {
  fontSize: sectionTypography.heading.fontSize,
  fontWeight: sectionTypography.heading.fontWeight,
  color: sectionTypography.heading.color,
  fontFamily: sectionTypography.fontFamily,
  letterSpacing: sectionTypography.heading.letterSpacing,
  marginBottom: "12px",
};

export const sectionSubtitleStyle: CSSProperties = {
  fontSize: sectionTypography.subheading.fontSize,
  color: sectionTypography.subheading.color,
  fontFamily: sectionTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Navigation Buttons (for carousels)
// -----------------------------------------------------------------------------

export const navButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: `1px solid ${sectionColors.borderLight}`,
  backgroundColor: sectionColors.bgWhite,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
  color: sectionColors.textSecondary,
};

// -----------------------------------------------------------------------------
// Card Styles
// -----------------------------------------------------------------------------

export const imageCardStyle: CSSProperties = {
  minWidth: "280px",
  height: "360px",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  flexShrink: 0,
};

export const cardOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: sectionColors.overlayGradient,
};

export const cardTitleStyle: CSSProperties = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: 600,
  fontFamily: sectionTypography.fontFamily,
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

// -----------------------------------------------------------------------------
// Form Styles
// -----------------------------------------------------------------------------

export const inputStyle: CSSProperties = {
  padding: "16px 20px",
  borderRadius: "8px",
  border: `1px solid ${sectionColors.borderLight}`,
  fontSize: "15px",
  color: sectionColors.textSecondary,
  outline: "none",
  fontFamily: sectionTypography.fontFamily,
};

export const textareaStyle: CSSProperties = {
  ...inputStyle,
  width: "100%",
  resize: "vertical",
};

export const submitButtonStyle: CSSProperties = {
  backgroundColor: sectionColors.orange,
  color: "#ffffff",
  fontWeight: 600,
  padding: "14px 48px",
  borderRadius: "32px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.2s",
  fontFamily: sectionTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Review Card Styles
// -----------------------------------------------------------------------------

export const reviewCardStyle: CSSProperties = {
  border: `1px solid ${sectionColors.borderLight}`,
  borderRadius: "16px",
  padding: "24px",
  backgroundColor: sectionColors.bgWhite,
};

export const avatarStyle: CSSProperties = {
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  overflow: "hidden",
  flexShrink: 0,
};

export const reactionButtonStyle = (color: string): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color,
  fontSize: "14px",
  fontWeight: 500,
});

// -----------------------------------------------------------------------------
// Feature Card Styles
// -----------------------------------------------------------------------------

export const featureIconContainerStyle = (bgColor: string): CSSProperties => ({
  width: "64px",
  height: "64px",
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  transform: "rotate(-10deg)",
  borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
});

export const featureIconStyle = (color: string): CSSProperties => ({
  width: "32px",
  height: "32px",
  color,
  transform: "rotate(10deg)",
});

export const featureTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: sectionColors.textPrimary,
  marginBottom: "8px",
  fontFamily: sectionTypography.fontFamily,
};

export const featureDescriptionStyle: CSSProperties = {
  fontSize: "15px",
  color: sectionColors.textMuted,
  maxWidth: "280px",
  lineHeight: 1.5,
  fontFamily: sectionTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Place Card Styles (Popular Section)
// -----------------------------------------------------------------------------

export const placeCardStyle: CSSProperties = {
  minWidth: "280px",
  maxWidth: "280px",
  flexShrink: 0,
  border: `1px solid ${sectionColors.borderLight}`,
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: sectionColors.bgWhite,
};

export const placeCardImageStyle: CSSProperties = {
  position: "relative",
  height: "180px",
};

export const placeCardTitleStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: sectionColors.textPrimary,
  marginBottom: "4px",
  fontFamily: sectionTypography.fontFamily,
};

export const priceStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: sectionColors.textPrimary,
};

export const priceNoteStyle: CSSProperties = {
  fontSize: "12px",
  color: sectionColors.textMuted,
};

// -----------------------------------------------------------------------------
// Hotel Card Styles (Recommended Section)
// -----------------------------------------------------------------------------

export const hotelCardStyle: CSSProperties = {
  minWidth: "280px",
  maxWidth: "280px",
  flexShrink: 0,
  border: `1px solid ${sectionColors.borderLight}`,
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: sectionColors.bgWhite,
};

export const hotelCardImageStyle: CSSProperties = {
  position: "relative",
  height: "200px",
};

export const favoriteButtonStyle: CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  backdropFilter: "blur(4px)",
};

export const ratingBadgeStyle: CSSProperties = {
  backgroundColor: "#06b6d4",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 600,
  padding: "4px 6px",
  borderRadius: "4px",
};

export const originalPriceStyle: CSSProperties = {
  fontSize: "13px",
  color: "#ef4444",
  textDecoration: "line-through",
  marginRight: "8px",
  fontWeight: 500,
};

export const currentPriceStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: sectionColors.textPrimary,
};

// -----------------------------------------------------------------------------
// Promo Banner Styles
// -----------------------------------------------------------------------------

export const promoBannerContainerStyle: CSSProperties = {
  position: "relative",
  height: "500px",
  borderRadius: "32px",
  overflow: "hidden",
};

export const promoGlassCardStyle: CSSProperties = {
  position: "absolute",
  bottom: "40px",
  right: "40px",
  width: "480px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  padding: "40px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

export const promoButtonStyle: CSSProperties = {
  backgroundColor: "#22d3ee",
  color: "#ffffff",
  fontWeight: 600,
  padding: "12px 32px",
  borderRadius: "24px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  transition: "background-color 0.2s",
};

// -----------------------------------------------------------------------------
// Trending Card Styles
// -----------------------------------------------------------------------------

export const trendingCardStyle: CSSProperties = {
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: "#f3f4f6",
};

export const trendingCardOverlayStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "140px",
  background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
  pointerEvents: "none",
};

export const trendingCardTitleStyle = (isLarge: boolean): CSSProperties => ({
  color: "#ffffff",
  fontSize: isLarge ? "20px" : "18px",
  fontWeight: 600,
  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
});
