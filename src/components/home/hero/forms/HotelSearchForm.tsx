"use client";

// =============================================================================
// HOTEL SEARCH FORM COMPONENT
// =============================================================================

import { MapPin, CalendarDays, UserRound } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { useHotelSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface HotelSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function HotelSearchForm({ onSearch }: HotelSearchFormProps) {
  const { formData, isLoading, submitForm } = useHotelSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      {/* Row 1: Where to */}
      <div style={{ marginBottom: "16px" }}>
        <FormField
          icon={MapPin}
          placeholder={FORM_LABELS.whereTo}
          variant="white"
          iconColor="#374151"
          onClick={() => {
            // TODO: Open location picker
            console.log("Open hotel location picker");
          }}
        />
      </div>

      {/* Row 2: Rooms/Guests, Check-in, Check-out, Search */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "stretch",
        }}
      >
        <FormField
          icon={UserRound}
          value={FORM_LABELS.roomsGuests}
          variant="white"
          iconColor="#6b7280"
          flex={1.2}
          onClick={() => {
            // TODO: Open rooms/guests selector
            console.log("Open rooms/guests selector");
          }}
        />

        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.checkIn}
          sublabel={FORM_LABELS.selectDate}
          variant="white"
          iconColor="#6b7280"
          onClick={() => {
            // TODO: Open date picker
            console.log("Open check-in date picker");
          }}
        />

        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.checkOut}
          sublabel={FORM_LABELS.selectDate}
          variant="white"
          iconColor="#6b7280"
          onClick={() => {
            // TODO: Open date picker
            console.log("Open check-out date picker");
          }}
        />

        <SearchButton onClick={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default HotelSearchForm;
