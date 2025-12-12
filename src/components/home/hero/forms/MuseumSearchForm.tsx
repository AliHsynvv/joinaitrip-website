"use client";

// =============================================================================
// MUSEUM SEARCH FORM COMPONENT
// =============================================================================

import { MapPin, CalendarDays } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { useMuseumSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface MuseumSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function MuseumSearchForm({ onSearch }: MuseumSearchFormProps) {
  const { formData, isLoading, submitForm } = useMuseumSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          paddingTop: "8px",
        }}
      >
        <FormField
          icon={MapPin}
          placeholder={FORM_LABELS.goingTo}
          variant="white"
          iconColor="#374151"
          flex={1.5}
          style={{ padding: "16px 20px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open location picker");
          }}
        />

        <FormField
          icon={CalendarDays}
          variant="white"
          iconColor="#374151"
          style={{ padding: "16px 20px", borderRadius: "8px" }}
          onClick={() => {
            console.log("Open date picker");
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{FORM_LABELS.dates}</p>
            <p style={{ fontSize: "15px", color: "#374151", margin: 0 }}>Aug 20, 2025</p>
          </div>
        </FormField>

        <SearchButton
          onClick={handleSubmit}
          isLoading={isLoading}
          style={{ padding: "16px 48px" }}
        />
      </div>
    </div>
  );
}

export default MuseumSearchForm;
