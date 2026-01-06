"use client";

// =============================================================================
// HOTEL SEARCH FORM COMPONENT
// =============================================================================

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, UserRound, Baby, BedDouble } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { AdvancedSearchButton } from "@/components/ui/AdvancedSearchButton";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { LocationPicker } from "@/components/ui/LocationPicker";
import { useHotelSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types for LocationPicker
// -----------------------------------------------------------------------------

interface Location {
  id: string;
  name: string;
  type: "country" | "city" | "hotel";
  country?: string;
  city?: string;
  rating?: number;
}

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

const formatDate = (date: Date | null): string => {
  if (!date) return FORM_LABELS.selectDate;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };
  return date.toLocaleDateString("en-US", options);
};

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
  const router = useRouter();
  const { formData, isLoading, submitForm } = useHotelSearch();

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  // Location picker state
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Refs for form inputs
  const adultsRef = useRef<HTMLInputElement>(null);
  const childrenRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    // Build search query parameters
    const params = new URLSearchParams();

    if (selectedLocation) {
      const locationText = selectedLocation.city
        ? `${selectedLocation.name}, ${selectedLocation.country}`
        : selectedLocation.name;
      params.set("location", locationText);
    }

    if (checkInDate) {
      params.set("checkIn", checkInDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }));
    }

    if (checkOutDate) {
      params.set("checkOut", checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }));
    }

    params.set("adults", adultsRef.current?.value || "2");
    params.set("children", childrenRef.current?.value || "0");
    params.set("rooms", roomsRef.current?.value || "1");

    // Navigate to search results page
    router.push(`/hotels?${params.toString()}`);

    onSearch?.();
  };

  const handleDatePickerOpen = useCallback(() => {
    setIsDatePickerOpen(true);
  }, []);

  const handleDatePickerClose = useCallback(() => {
    setIsDatePickerOpen(false);
  }, []);

  const handleDateSelect = useCallback((checkIn: Date | null, checkOut: Date | null) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    if (checkIn && checkOut) {
      // Auto-close when both dates are selected
      setTimeout(() => setIsDatePickerOpen(false), 300);
    }
  }, []);

  const handleLocationPickerOpen = useCallback(() => {
    setIsLocationPickerOpen(true);
  }, []);

  const handleLocationPickerClose = useCallback(() => {
    setIsLocationPickerOpen(false);
  }, []);

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    setIsLocationPickerOpen(false);
  }, []);

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      {/* Row 1: Where to */}
      <div className="form-row form-row-1" style={{ marginBottom: "16px" }}>
        <FormField
          icon={MapPin}
          placeholder={selectedLocation ? undefined : FORM_LABELS.whereTo}
          label={selectedLocation?.name}
          sublabel={selectedLocation ? (selectedLocation.city ? `${selectedLocation.city}, ${selectedLocation.country}` : selectedLocation.country) : undefined}
          variant="white"
          iconColor="#374151"
          onClick={handleLocationPickerOpen}
        />
      </div>

      {/* Location Picker Modal */}
      <LocationPicker
        isOpen={isLocationPickerOpen}
        onClose={handleLocationPickerClose}
        onSelect={handleLocationSelect}
        placeholder="Search for countries, cities, or hotels..."
      />

      {/* Row 2: Check-in, Check-out */}
      <div
        className="form-row hotel-dates-row"
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.checkIn}
          sublabel={formatDate(checkInDate)}
          variant="white"
          iconColor="#6b7280"
          onClick={handleDatePickerOpen}
        />

        <FormField
          icon={CalendarDays}
          label={FORM_LABELS.checkOut}
          sublabel={formatDate(checkOutDate)}
          variant="white"
          iconColor="#6b7280"
          onClick={handleDatePickerOpen}
        />
      </div>

      {/* Date Range Picker Modal */}
      <DateRangePicker
        isOpen={isDatePickerOpen}
        onClose={handleDatePickerClose}
        onDateSelect={handleDateSelect}
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
      />

      {/* Row 3: Adults, Children, Rooms - 3 columns on desktop */}
      <div
        className="hotel-guests-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <FormField
          icon={UserRound}
          variant="white"
          iconColor="#6b7280"
          style={{ paddingRight: "8px" }}
        >
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Adults</p>
            <input
              ref={adultsRef}
              type="number"
              min="1"
              defaultValue="2"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#374151",
                padding: 0,
                background: "transparent",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </FormField>

        <FormField
          icon={Baby}
          variant="white"
          iconColor="#6b7280"
          style={{ paddingRight: "8px" }}
        >
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Children</p>
            <input
              ref={childrenRef}
              type="number"
              min="0"
              defaultValue="0"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#374151",
                padding: 0,
                background: "transparent",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </FormField>

        <FormField
          icon={BedDouble}
          variant="white"
          iconColor="#6b7280"
          style={{ paddingRight: "8px" }}
        >
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Rooms</p>
            <input
              ref={roomsRef}
              type="number"
              min="1"
              defaultValue="1"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#374151",
                padding: 0,
                background: "transparent",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
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

export default HotelSearchForm;
