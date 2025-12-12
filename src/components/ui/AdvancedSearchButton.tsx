"use client";

// =============================================================================
// ADVANCED SEARCH BUTTON COMPONENT
// Secondary action button for advanced search options
// =============================================================================

import { SlidersHorizontal } from "lucide-react";
import { advancedSearchButtonStyle } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface AdvancedSearchButtonProps {
  onClick?: () => void;
  label?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AdvancedSearchButton({
  onClick,
  label = "Advanced Search",
}: AdvancedSearchButtonProps) {
  return (
    <button onClick={onClick} style={advancedSearchButtonStyle}>
      <SlidersHorizontal style={{ width: "16px", height: "16px" }} />
      <span>{label}</span>
    </button>
  );
}

export default AdvancedSearchButton;
