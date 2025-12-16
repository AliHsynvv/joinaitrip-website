"use client";

// =============================================================================
// RESTAURANT SEARCH FORM COMPONENT
// =============================================================================

import { Search } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { useRestaurantSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface RestaurantSearchFormProps {
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function RestaurantSearchForm({ onSearch }: RestaurantSearchFormProps) {
  const { formData, isLoading, submitForm } = useRestaurantSearch();

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  return (
    <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
      <div
        className="form-row form-row-1"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          paddingTop: "8px",
        }}
      >
        <FormField
          icon={Search}
          placeholder={FORM_LABELS.restaurantOrDestination}
          variant="white"
          iconColor="#374151"
          style={{ padding: "16px 20px", borderRadius: "8px", cursor: "text" }}
          onClick={() => {
            console.log("Focus search input");
          }}
        />

        <SearchButton
          onClick={handleSubmit}
          isLoading={isLoading}
          style={{ padding: "16px 48px" }}
        />
      </div>
    </div>
  );
}

export default RestaurantSearchForm;
