"use client";

// =============================================================================
// TRANSFER SEARCH FORM COMPONENT
// =============================================================================

import {
  MapPin,
  ArrowRightLeft,
  UserRound,
  Luggage,
  CalendarDays,
  Clock,
} from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { AdvancedSearchButton } from "@/components/ui/AdvancedSearchButton";
import { useTransferSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";
import { colors } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TransferSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TransferSearchForm({ onSearch }: TransferSearchFormProps) {
  const { formData, isLoading, submitForm } = useTransferSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      {/* Row 1: From (Airport) <-> To (Hotel) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={MapPin}
          value={FORM_LABELS.airport}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open airport picker");
          }}
        />

        {/* Swap Button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: `2px solid ${colors.borderPrimary}`,
            backgroundColor: "#ffffff",
            color: "#374151",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => {
            // TODO: Swap from/to
            console.log("Swap locations");
          }}
        >
          <ArrowRightLeft style={{ width: "18px", height: "18px" }} />
        </button>

        <FormField
          icon={MapPin}
          value={FORM_LABELS.hotel}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            console.log("Open hotel picker");
          }}
        />
      </div>

      {/* Row 2: Travelers, Luggage, Date, Time */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "stretch",
          marginBottom: "24px",
        }}
      >
        <FormField
          icon={UserRound}
          placeholder={FORM_LABELS.travelers}
          variant="white"
          iconColor="#6b7280"
          onClick={() => {
            console.log("Open travelers selector");
          }}
        />

        <FormField
          icon={Luggage}
          placeholder={FORM_LABELS.luggage}
          variant="white"
          iconColor="#6b7280"
          showChevron
          onClick={() => {
            console.log("Open luggage selector");
          }}
        />

        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.date}
          sublabel={FORM_LABELS.selectDate}
          variant="white"
          iconColor="#6b7280"
          onClick={() => {
            console.log("Open date picker");
          }}
        />

        <FormField
          icon={Clock}
          label={FORM_LABELS.time}
          sublabel={FORM_LABELS.selectTime}
          variant="white"
          iconColor="#6b7280"
          onClick={() => {
            console.log("Open time picker");
          }}
        />
      </div>

      {/* Row 3: Advanced Search & Search Button */}
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

export default TransferSearchForm;
