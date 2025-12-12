// =============================================================================
// USE SEARCH FORM HOOK
// Generic hook for managing search form state with API integration ready
// =============================================================================

import { useState, useCallback, useMemo } from "react";
import type {
  ServiceType,
  FlightSearchParams,
  HotelSearchParams,
  TransferSearchParams,
  CarSearchParams,
  TourSearchParams,
  GuidesSearchParams,
  RestaurantSearchParams,
  MuseumSearchParams,
  PackageSearchParams,
  TravelersInfo,
  LocationField,
  DateRange,
} from "@/types/search.types";
import { DEFAULT_TRAVELERS, DEFAULT_PRICE_RANGE } from "@/constants/hero.constants";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type SearchParams =
  | FlightSearchParams
  | HotelSearchParams
  | TransferSearchParams
  | CarSearchParams
  | TourSearchParams
  | GuidesSearchParams
  | RestaurantSearchParams
  | MuseumSearchParams
  | PackageSearchParams;

interface UseSearchFormReturn<T extends SearchParams> {
  formData: T;
  isLoading: boolean;
  errors: Record<string, string>;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  submitForm: () => Promise<void>;
}

// -----------------------------------------------------------------------------
// Initial State Factories
// -----------------------------------------------------------------------------

export const createInitialFlightState = (): FlightSearchParams => ({
  tripType: "round",
  from: null,
  to: null,
  departDate: null,
  returnDate: null,
  travelers: { ...DEFAULT_TRAVELERS },
});

export const createInitialHotelState = (): HotelSearchParams => ({
  destination: null,
  dates: { checkIn: null, checkOut: null },
  rooms: 1,
  guests: { ...DEFAULT_TRAVELERS },
});

export const createInitialTransferState = (): TransferSearchParams => ({
  from: null,
  to: null,
  travelers: 1,
  luggage: "medium",
  date: null,
  time: null,
});

export const createInitialCarState = (): CarSearchParams => ({
  pickupLocation: null,
  dropoffLocation: null,
  sameDropoff: true,
  pickupDate: null,
  dropoffDate: null,
  pickupTime: null,
  dropoffTime: null,
});

export const createInitialTourState = (): TourSearchParams => ({
  country: null,
  destination: null,
  travelers: 1,
  date: null,
  priceRange: { ...DEFAULT_PRICE_RANGE },
});

export const createInitialGuidesState = (): GuidesSearchParams => ({
  country: null,
  destination: null,
  travelers: 1,
  date: null,
});

export const createInitialRestaurantState = (): RestaurantSearchParams => ({
  query: "",
  location: null,
});

export const createInitialMuseumState = (): MuseumSearchParams => ({
  destination: null,
  date: null,
});

export const createInitialPackageState = (): PackageSearchParams => ({
  destination: null,
  dates: { checkIn: null, checkOut: null },
  selectedServices: ["flight", "hotel", "transfer", "car", "tour", "restaurant", "museum"],
});

// -----------------------------------------------------------------------------
// Factory to get initial state by service type
// -----------------------------------------------------------------------------

export const getInitialStateByService = (serviceType: ServiceType): SearchParams => {
  const stateFactories: Record<ServiceType, () => SearchParams> = {
    flight: createInitialFlightState,
    hotel: createInitialHotelState,
    transfer: createInitialTransferState,
    car: createInitialCarState,
    tour: createInitialTourState,
    guides: createInitialGuidesState,
    restaurant: createInitialRestaurantState,
    museum: createInitialMuseumState,
    package: createInitialPackageState,
  };
  
  return stateFactories[serviceType]();
};

// -----------------------------------------------------------------------------
// Main Hook
// -----------------------------------------------------------------------------

export function useSearchForm<T extends SearchParams>(
  initialState: T,
  onSubmit?: (data: T) => Promise<void>
): UseSearchFormReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update a single field
  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setIsLoading(false);
  }, [initialState]);

  // Validate form (basic validation - extend as needed)
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic required field validation
    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        // Skip optional fields or arrays
        if (key !== "returnDate" && key !== "location" && !Array.isArray(value)) {
          // newErrors[key] = `${key} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit form
  const submitForm = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: log to console (for development)
        console.log("Form submitted:", formData);
        // TODO: Replace with actual API call
        // Example:
        // const response = await searchApi.search(formData);
        // return response;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSubmit, validateForm]);

  return {
    formData,
    isLoading,
    errors,
    updateField,
    resetForm,
    validateForm,
    submitForm,
  };
}

// -----------------------------------------------------------------------------
// Specialized Hooks (Type-safe wrappers)
// -----------------------------------------------------------------------------

export const useFlightSearch = (onSubmit?: (data: FlightSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialFlightState(), onSubmit);
};

export const useHotelSearch = (onSubmit?: (data: HotelSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialHotelState(), onSubmit);
};

export const useTransferSearch = (onSubmit?: (data: TransferSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialTransferState(), onSubmit);
};

export const useCarSearch = (onSubmit?: (data: CarSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialCarState(), onSubmit);
};

export const useTourSearch = (onSubmit?: (data: TourSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialTourState(), onSubmit);
};

export const useGuidesSearch = (onSubmit?: (data: GuidesSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialGuidesState(), onSubmit);
};

export const useRestaurantSearch = (onSubmit?: (data: RestaurantSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialRestaurantState(), onSubmit);
};

export const useMuseumSearch = (onSubmit?: (data: MuseumSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialMuseumState(), onSubmit);
};

export const usePackageSearch = (onSubmit?: (data: PackageSearchParams) => Promise<void>) => {
  return useSearchForm(createInitialPackageState(), onSubmit);
};

// -----------------------------------------------------------------------------
// Export default
// -----------------------------------------------------------------------------

export default useSearchForm;
