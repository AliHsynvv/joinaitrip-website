// =============================================================================
// ABOUT PAGE STYLES
// =============================================================================

import { CSSProperties } from "react";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

export const aboutColors = {
  primary: "#06b6d4",
  primaryDark: "#0891b2",
  primaryLight: "#22d3ee",
  accent: "#f97316",
  accentDark: "#ea580c",
  
  bgWhite: "#ffffff",
  bgLight: "#f8fafc",
  bgDark: "#0f172a",
  
  textPrimary: "#1f2937",
  textSecondary: "#374151",
  textMuted: "#4b5563",
  textLight: "#6b7280",
  textSlate: "#94a3b8",
  
  borderLight: "#e5e7eb",
  borderCyan: "rgba(6, 182, 212, 0.2)",
  borderOrange: "rgba(249, 115, 22, 0.15)",
} as const;

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const aboutTypography = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  
  heroTitle: {
    fontSize: "64px",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  
  sectionTitle: {
    fontSize: "44px",
    fontWeight: 700,
    lineHeight: 1.15,
  },
  
  largeSectionTitle: {
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: 1.15,
  },
} as const;

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const heroSectionStyle: CSSProperties = {
  position: "relative",
  height: "600px",
};

export const heroOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))",
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
  alignItems: "center",
  textAlign: "center",
};

export const heroTitleStyle: CSSProperties = {
  fontSize: aboutTypography.heroTitle.fontSize,
  fontWeight: aboutTypography.heroTitle.fontWeight,
  color: "#ffffff",
  lineHeight: aboutTypography.heroTitle.lineHeight,
  marginBottom: "24px",
  fontFamily: aboutTypography.fontFamily,
  letterSpacing: aboutTypography.heroTitle.letterSpacing,
};

export const heroSubtitleStyle: CSSProperties = {
  fontSize: "20px",
  color: "rgba(255, 255, 255, 0.95)",
  lineHeight: 1.6,
  fontFamily: aboutTypography.fontFamily,
  fontWeight: 400,
};

// -----------------------------------------------------------------------------
// Introduction Section
// -----------------------------------------------------------------------------

export const introSectionStyle: CSSProperties = {
  padding: "100px 24px",
  backgroundColor: aboutColors.bgLight,
};

export const introContainerStyle: CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
};

// -----------------------------------------------------------------------------
// Airen Section
// -----------------------------------------------------------------------------

export const airenSectionStyle: CSSProperties = {
  padding: "120px 24px",
};

export const airenBadgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  backgroundColor: "#ecfeff",
  borderRadius: "32px",
  marginBottom: "24px",
};

export const airenQuoteStyle: CSSProperties = {
  backgroundColor: "#f0f9ff",
  borderLeft: `4px solid ${aboutColors.primary}`,
  padding: "20px 24px",
  borderRadius: "0 12px 12px 0",
};

// -----------------------------------------------------------------------------
// Ecosystem Section
// -----------------------------------------------------------------------------

export const ecosystemSectionStyle: CSSProperties = {
  backgroundColor: aboutColors.bgDark,
  padding: "120px 24px",
  position: "relative",
  overflow: "hidden",
};

export const ecosystemFeatureChipStyle: CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "#e2e8f0",
  padding: "14px 24px",
  borderRadius: "100px",
  fontSize: "15px",
  fontWeight: 500,
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(8px)",
};

// -----------------------------------------------------------------------------
// Mission Section
// -----------------------------------------------------------------------------

export const missionSectionStyle: CSSProperties = {
  padding: "120px 24px",
};

export const missionCardStyle: CSSProperties = {
  backgroundColor: aboutColors.bgLight,
  borderRadius: "32px",
  padding: "48px",
  border: `1px solid #e2e8f0`,
};

export const missionPointStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
  fontSize: "17px",
  color: "#334155",
  fontFamily: aboutTypography.fontFamily,
};

// -----------------------------------------------------------------------------
// Vision Section
// -----------------------------------------------------------------------------

export const visionSectionStyle: CSSProperties = {
  padding: "80px 24px",
  backgroundColor: "#fafafa",
};

export const visionCardStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  padding: "32px 40px",
  backgroundColor: aboutColors.bgWhite,
  borderRadius: "20px",
  border: `1px solid ${aboutColors.borderLight}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
};

// -----------------------------------------------------------------------------
// Unique Features Section
// -----------------------------------------------------------------------------

export const uniqueSectionStyle: CSSProperties = {
  padding: "120px 24px",
};

export const uniqueCardStyle: CSSProperties = {
  padding: "32px",
  borderRadius: "24px",
  border: `1px solid ${aboutColors.borderLight}`,
  backgroundColor: aboutColors.bgWhite,
  transition: "all 0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

export const finalStatementStyle: CSSProperties = {
  textAlign: "center",
  padding: "64px",
  backgroundColor: "#f0f9ff",
  borderRadius: "32px",
  border: "1px solid #cffafe",
};

// -----------------------------------------------------------------------------
// Icon Container Styles
// -----------------------------------------------------------------------------

export const iconContainerStyle = (variant: "cyan" | "orange", size: "sm" | "md" | "lg" = "md"): CSSProperties => {
  const sizes = {
    sm: { width: "28px", height: "28px", borderRadius: "8px" },
    md: { width: "60px", height: "60px", borderRadius: "16px" },
    lg: { width: "72px", height: "72px", borderRadius: "20px" },
  };
  
  const backgrounds = {
    cyan: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
    orange: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
  };
  
  const borders = {
    cyan: aboutColors.borderCyan,
    orange: aboutColors.borderOrange,
  };
  
  return {
    ...sizes[size],
    background: backgrounds[variant],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${borders[variant]}`,
  };
};
