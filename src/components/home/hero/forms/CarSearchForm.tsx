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
      {/* Row 1: Pick-up, Drop-off, Dates, Times */}
      <div
        className="form-row form-row-1"
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
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

      {/* Row 2: Advanced Search & Search Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AdvancedSearchButton
          onClick={() => {
            console.log("Open advanced search");
          }}
        />

        <SearchButton
          onClick={handleSubmit}
          isLoading={isLoading}
          style={{ padding: "14px 48px" }}
        />
      </div>
    </div>
  );
}

export default CarSearchForm;
