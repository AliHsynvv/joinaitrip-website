"use client";

// =============================================================================
// FLIGHT SEARCH FORM COMPONENT
// =============================================================================

import {
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
  UserRound,
} from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { TripTypeSelector } from "../TripTypeSelector";
import { useFlightSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";
import type { TripType } from "@/types/search.types";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FlightSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const { formData, isLoading, updateField, submitForm } = useFlightSearch();

  const handleTripTypeChange = (type: TripType) => {
    updateField("tripType", type);
  };

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <>
      {/* Trip Type Selector */}
      <TripTypeSelector
        activeType={formData.tripType}
        onTypeChange={handleTripTypeChange}
      />

      {/* Search Form */}
      <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
        {/* Row 1: From & To */}
        <div
          className="flight-form-row-1"
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <FormField
            icon={PlaneTakeoff}
            placeholder={FORM_LABELS.from}
            variant="glass"
            onClick={() => {
              // TODO: Open location picker modal
              console.log("Open FROM location picker");
            }}
          />

          <FormField
            icon={PlaneLanding}
            placeholder={FORM_LABELS.to}
            variant="glass"
            onClick={() => {
              // TODO: Open location picker modal
              console.log("Open TO location picker");
            }}
          />
        </div>

        {/* Row 2: Dates, Passengers, Search */}
        <div
          className="flight-form-row-2"
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          <FormField
            icon={CalendarDays}
            label={FORM_LABELS.checkIn}
            sublabel={FORM_LABELS.selectDate}
            variant="glass"
            onClick={() => {
              // TODO: Open date picker
              console.log("Open check-in date picker");
            }}
          />

          <FormField
            icon={CalendarDays}
            label={FORM_LABELS.checkOut}
            sublabel={FORM_LABELS.selectDate}
            variant="glass"
            onClick={() => {
              // TODO: Open date picker
              console.log("Open check-out date picker");
            }}
          />

          <FormField
            icon={UserRound}
            value={FORM_LABELS.passengersDefault}
            variant="glass"
            flex={1.2}
            onClick={() => {
              // TODO: Open passengers/cabin class selector
              console.log("Open passengers selector");
            }}
          />

          <SearchButton
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default FlightSearchForm;
