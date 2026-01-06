"use client";

// =============================================================================
// CAR RENTAL SEARCH FORM COMPONENT
// =============================================================================

import { MapPin, CalendarDays, Clock } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { AdvancedSearchButton } from "@/components/ui/AdvancedSearchButton";
import { useCarSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CarSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function CarSearchForm({ onSearch }: CarSearchFormProps) {
  const { formData, isLoading, submitForm } = useCarSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      {/* Row 1: Pick-up, Drop-off - 2 columns on desktop */}
      <div
        className="form-row car-row-1"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <FormField
          icon={MapPin}
          placeholder={FORM_LABELS.pickup}
          variant="white"
          iconColor="#374151"
          style={{ padding: "14px 16px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open pickup location picker");
          }}
        />

        <FormField
          icon={MapPin}
          variant="white"
          iconColor="#374151"
          style={{ padding: "14px 16px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open dropoff location picker");
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0, lineHeight: 1.2 }}>
              {FORM_LABELS.dropoff}
            </p>
            <p style={{ fontSize: "15px", color: "#374151", margin: 0 }}>
              {FORM_LABELS.sameAsPickup}
            </p>
          </div>
        </FormField>
      </div>

      {/* Row 2: Dates - full width on desktop */}
      <div
        className="form-row car-row-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={CalendarDays}
          placeholder={FORM_LABELS.dates}
          variant="white"
          iconColor="#374151"
          style={{ padding: "14px 16px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open date picker");
          }}
        />
      </div>

      {/* Row 3: Pick-up time, Drop-off time - 2 columns on desktop */}
      <div
        className="form-row car-row-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <FormField
          icon={Clock}
          placeholder={FORM_LABELS.pickupTime}
          variant="white"
          iconColor="#374151"
          style={{ padding: "14px 16px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open pickup time picker");
          }}
        />

        <FormField
          icon={Clock}
          placeholder={FORM_LABELS.dropoffTime}
          variant="white"
          iconColor="#374151"
          style={{ padding: "14px 16px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open dropoff time picker");
          }}
        />
      </div>

      {/* Advanced Search */}
      <div style={{ marginBottom: "16px" }}>
        <AdvancedSearchButton
          onClick={() => {
            console.log("Open advanced search");
          }}
        />
      </div>

      <SearchButton
        onClick={handleSubmit}
        isLoading={isLoading}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default CarSearchForm;
