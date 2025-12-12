"use client";

// =============================================================================
// FORM FIELD COMPONENT
// Reusable input field for search forms
// =============================================================================

import { CSSProperties, ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import {
  inputFieldStyle,
  whiteInputFieldStyle,
  smallIconStyle,
  iconStyle,
  labelStyle,
  primaryLabelStyle,
  secondaryLabelStyle,
  colors,
} from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FormFieldProps {
  icon: LucideIcon;
  label?: string;
  sublabel?: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  variant?: "glass" | "white";
  iconColor?: string;
  iconSize?: "sm" | "md";
  flex?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  showChevron?: boolean;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function FormField({
  icon: Icon,
  label,
  sublabel,
  value,
  placeholder,
  onClick,
  variant = "glass",
  iconColor,
  iconSize = "md",
  flex = 1,
  className,
  style,
  children,
  showChevron = false,
}: FormFieldProps) {
  const baseStyle = variant === "glass" ? inputFieldStyle : whiteInputFieldStyle;
  const computedIconColor = iconColor || (variant === "glass" ? colors.iconBlue : colors.iconGray);
  const iconSizeStyle = iconSize === "sm" ? smallIconStyle(computedIconColor) : iconStyle(computedIconColor);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...baseStyle,
        flex,
        justifyContent: showChevron ? "space-between" : undefined,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon style={iconSizeStyle} />
        {children ? (
          children
        ) : label || sublabel ? (
          <div>
            {label && <p style={primaryLabelStyle}>{label}</p>}
            {sublabel && <p style={secondaryLabelStyle}>{sublabel}</p>}
          </div>
        ) : value ? (
          <span style={{ ...labelStyle, color: colors.textPrimary }}>{value}</span>
        ) : placeholder ? (
          <span style={labelStyle}>{placeholder}</span>
        ) : null}
      </div>
      {showChevron && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.textSecondary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </div>
  );
}

export default FormField;
