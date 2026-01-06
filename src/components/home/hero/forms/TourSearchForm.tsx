"use client";

// =============================================================================
// TOUR SEARCH FORM COMPONENT
// =============================================================================

import { MapPin, UserRound, CalendarDays } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { AdvancedSearchButton } from "@/components/ui/AdvancedSearchButton";
import { useTourSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS, DEFAULT_PRICE_RANGE } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TourSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TourSearchForm({ onSearch }: TourSearchFormProps) {
  const { formData, isLoading, submitForm } = useTourSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      {/* Row 1: Country, Where to */}
      <div
        className="form-row form-row-1"
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={MapPin}
          placeholder={FORM_LABELS.country}
          variant="white"
          iconColor="#374151"
          showChevron
          onClick={() => {
            console.log("Open country selector");
          }}
        />

        <FormField
          icon={MapPin}
          placeholder={FORM_LABELS.whereTo}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open destination picker");
          }}
        />
      </div>

      {/* Row 2: Travelers, Date, Price Range */}
      <div
        className="form-row form-row-2 tour-form-row-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          alignItems: "stretch",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={UserRound}
          placeholder={FORM_LABELS.travelers}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open travelers selector");
          }}
        />

        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.date}
          sublabel={FORM_LABELS.selectDate}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open date picker");
          }}
        />

        <FormField
          icon={MapPin}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open price range selector");
          }}
        >
          <span style={{ fontSize: "15px", color: "#374151" }}>{FORM_LABELS.price}</span>
          <span style={{ fontSize: "15px", color: "#9ca3af" }}>{FORM_LABELS.priceRange}</span>
        </FormField>
      </div>

      {/* Advanced Search */}
      <div style={{ marginBottom: "16px" }}>
        <AdvancedSearchButton
          onClick={() => {
            console.log("Open advanced search");
          }}
        />
      </div>

      {/* Search Button - Full Width */}
      <SearchButton onClick={handleSubmit} isLoading={isLoading} style={{ width: "100%" }} />
    </div>
  );
}

export default TourSearchForm;
