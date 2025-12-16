"use client";

// =============================================================================
// GUIDES SEARCH FORM COMPONENT
// =============================================================================

import { MapPin, UserRound, CalendarDays } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { useGuidesSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface GuidesSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function GuidesSearchForm({ onSearch }: GuidesSearchFormProps) {
  const { formData, isLoading, submitForm } = useGuidesSearch();

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

      {/* Row 2: Travelers, Date, Search */}
      <div
        className="form-row form-row-2"
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "stretch",
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

        <SearchButton onClick={handleSubmit} isLoading={isLoading} variant="wide" />
      </div>
    </div>
  );
}

export default GuidesSearchForm;
