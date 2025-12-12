"use client";

// =============================================================================
// TRIP TYPE SELECTOR COMPONENT
// Round-trip, One-way, Multi-city selector for flights
// =============================================================================

import { TRIP_TYPES } from "@/constants/hero.constants";
import { tripTypeStyle } from "@/styles/hero.styles";
import type { TripType } from "@/types/search.types";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TripTypeSelectorProps {
  activeType: TripType;
  onTypeChange: (type: TripType) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TripTypeSelector({ activeType, onTypeChange }: TripTypeSelectorProps) {
  return (
    <div
      className="trip-types-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
        padding: "16px 24px",
      }}
    >
      {TRIP_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          style={tripTypeStyle(activeType === type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}

export default TripTypeSelector;
