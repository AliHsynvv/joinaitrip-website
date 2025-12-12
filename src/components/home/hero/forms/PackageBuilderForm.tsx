"use client";

// =============================================================================
// PACKAGE BUILDER FORM COMPONENT
// Multi-service package creation form
// =============================================================================

import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Plus,
  PlaneTakeoff,
  PlaneLanding,
  Building2,
  ArrowRightLeft,
  Luggage,
  Clock,
  UserRound,
  Search,
  ChevronDown,
} from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SearchButton } from "@/components/ui/SearchButton";
import { usePackageSearch } from "@/hooks/useSearchForm";
import { FORM_LABELS, HERO_CONTENT, PACKAGE_AVAILABLE_SERVICES } from "@/constants/hero.constants";
import { colors, removeButtonStyle, checkboxLabelStyle } from "@/styles/hero.styles";
import type { ServiceType } from "@/types/search.types";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface PackageBuilderFormProps {
  isExpanded: boolean;
  onExpandToggle: () => void;
  onSearch?: () => void;
}

// -----------------------------------------------------------------------------
// Service Section Component
// -----------------------------------------------------------------------------

interface ServiceSectionProps {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}

function ServiceSection({ title, onRemove, children }: ServiceSectionProps) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontWeight: 500, fontSize: "14px" }}>{title}</span>
        <button onClick={onRemove} style={removeButtonStyle}>
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Package Field Styles
// -----------------------------------------------------------------------------

const packageFieldStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  border: `2px solid ${colors.borderPrimary}`,
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function PackageBuilderForm({
  isExpanded,
  onExpandToggle,
  onSearch,
}: PackageBuilderFormProps) {
  const { formData, isLoading, updateField, submitForm } = usePackageSearch();
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([
    "flight", "hotel", "transfer", "car", "tour", "restaurant", "museum"
  ]);

  const removeService = (service: ServiceType) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  const handleSubmit = async () => {
    await submitForm();
    onSearch?.();
  };

  // Initial collapsed view
  if (!isExpanded) {
    return (
      <div className="search-form-content" style={{ padding: "0 24px 24px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            paddingTop: "8px",
          }}
        >
          <FormField
            icon={MapPin}
            placeholder={FORM_LABELS.goingTo}
            variant="white"
            iconColor="#374151"
            style={{ padding: "16px 20px", borderRadius: "8px" }}
          />

          <FormField
            icon={CalendarDays}
            variant="white"
            iconColor="#374151"
            style={{ padding: "16px 20px", borderRadius: "8px" }}
          >
            <div>
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{FORM_LABELS.dates}</p>
              <p style={{ fontSize: "15px", color: "#374151", margin: 0 }}>Aug 20 - Aug 23, 2025</p>
            </div>
          </FormField>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onExpandToggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              color: colors.primary,
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <Plus style={{ width: "18px", height: "18px" }} />
            <span>{HERO_CONTENT.addServicesButton}</span>
          </button>

          <SearchButton
            label={HERO_CONTENT.createTourButton}
            onClick={handleSubmit}
            isLoading={isLoading}
            style={{ width: "240px", padding: "14px 48px" }}
          />
        </div>
      </div>
    );
  }

  // Expanded view with all services
  return (
    <div style={{ padding: "24px", maxHeight: "600px", overflowY: "auto" }}>
      {/* Global Package Settings */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <div style={{ ...packageFieldStyle, flex: 1, padding: "16px 20px" }}>
          <MapPin style={{ width: "20px", height: "20px", color: "#374151" }} />
          <span style={{ fontSize: "15px", color: "#6b7280" }}>{FORM_LABELS.goingTo}</span>
        </div>
        <div style={{ ...packageFieldStyle, flex: 1, padding: "16px 20px" }}>
          <CalendarDays style={{ width: "20px", height: "20px", color: "#374151" }} />
          <div>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{FORM_LABELS.dates}</p>
            <p style={{ fontSize: "15px", color: "#374151", margin: 0 }}>Aug 20 - Aug 23, 2025</p>
          </div>
        </div>
      </div>

      {/* Dynamic Services List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Flight */}
        {selectedServices.includes("flight") && (
          <ServiceSection title="Flight" onRemove={() => removeService("flight")}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <PlaneTakeoff size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.from}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <PlaneLanding size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.to}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <UserRound size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.travelersPerCabin}</span>
              </div>
            </div>
          </ServiceSection>
        )}

        {/* Hotel */}
        {selectedServices.includes("hotel") && (
          <ServiceSection title="Hotel" onRemove={() => removeService("hotel")}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 1.5 }}>
                <Building2 size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.hotel}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <CalendarDays size={16} style={{ color: "#9ca3af" }} />
                <div>
                  <span style={{ fontSize: "14px", color: "#374151", display: "block" }}>Check-in & Check-out</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af", display: "block" }}>{FORM_LABELS.selectDate}</span>
                </div>
              </div>
              <div style={{ ...packageFieldStyle, flex: 0.8 }}>
                <UserRound size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.rooms}</span>
              </div>
            </div>
          </ServiceSection>
        )}

        {/* Transfer */}
        {selectedServices.includes("transfer") && (
          <ServiceSection title="Transfer" onRemove={() => removeService("transfer")}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  <MapPin size={16} style={{ color: "#9ca3af" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.airport}</span>
                </div>
                <ArrowRightLeft size={14} style={{ color: "#9ca3af" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  <MapPin size={16} style={{ color: "#9ca3af" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.hotel}</span>
                </div>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1, justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Luggage size={16} style={{ color: "#9ca3af" }} />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.luggage}</span>
                </div>
                <ChevronDown size={14} style={{ color: "#9ca3af" }} />
              </div>
              <div style={{ ...packageFieldStyle, flex: 0.8 }}>
                <Clock size={16} style={{ color: "#9ca3af" }} />
                <div>
                  <span style={{ fontSize: "14px", color: "#374151", display: "block" }}>{FORM_LABELS.time}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af", display: "block" }}>{FORM_LABELS.selectTime}</span>
                </div>
              </div>
            </div>
          </ServiceSection>
        )}

        {/* Car Rental */}
        {selectedServices.includes("car") && (
          <ServiceSection title="Car Rental" onRemove={() => removeService("car")}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <MapPin size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.pickup}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <MapPin size={16} style={{ color: "#9ca3af" }} />
                <div>
                  <span style={{ fontSize: "10px", color: "#9ca3af", display: "block" }}>{FORM_LABELS.dropoff}</span>
                  <span style={{ fontSize: "14px", color: "#6b7280", display: "block" }}>{FORM_LABELS.sameAsPickup}</span>
                </div>
              </div>
              <div style={{ ...packageFieldStyle, flex: 0.8 }}>
                <CalendarDays size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.dates}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 0.8 }}>
                <Clock size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.pickupTime}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 0.8 }}>
                <Clock size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.dropoffTime}</span>
              </div>
            </div>
          </ServiceSection>
        )}

        {/* Tour */}
        {selectedServices.includes("tour") && (
          <ServiceSection title="Tour" onRemove={() => removeService("tour")}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 2 }}>
                <MapPin size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.whereTo}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <UserRound size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.travelers}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <CalendarDays size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.dates}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" style={{ accentColor: "#f97316" }} /> {FORM_LABELS.needGuide}
              </label>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" style={{ accentColor: "#f97316" }} /> {FORM_LABELS.needCar}
              </label>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" style={{ accentColor: "#f97316" }} /> {FORM_LABELS.needDriver}
              </label>
            </div>
          </ServiceSection>
        )}

        {/* Restaurant */}
        {selectedServices.includes("restaurant") && (
          <ServiceSection title="Restaurant" onRemove={() => removeService("restaurant")}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 2 }}>
                <Search size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.restaurantOrDestination}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <CalendarDays size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.dates}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <Clock size={16} style={{ color: "#9ca3af" }} />
                <div>
                  <span style={{ fontSize: "14px", color: "#374151", display: "block" }}>{FORM_LABELS.time}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af", display: "block" }}>{FORM_LABELS.selectTime}</span>
                </div>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <UserRound size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.guests}</span>
              </div>
            </div>
          </ServiceSection>
        )}

        {/* Museum */}
        {selectedServices.includes("museum") && (
          <ServiceSection title="Museum" onRemove={() => removeService("museum")}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ ...packageFieldStyle, flex: 2 }}>
                <Search size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.restaurantOrDestination}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <CalendarDays size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.dates}</span>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <Clock size={16} style={{ color: "#9ca3af" }} />
                <div>
                  <span style={{ fontSize: "14px", color: "#374151", display: "block" }}>{FORM_LABELS.time}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af", display: "block" }}>{FORM_LABELS.selectTime}</span>
                </div>
              </div>
              <div style={{ ...packageFieldStyle, flex: 1 }}>
                <UserRound size={16} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{FORM_LABELS.guests}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" style={{ accentColor: "#f97316" }} /> {FORM_LABELS.needGuide}
              </label>
            </div>
          </ServiceSection>
        )}
      </div>

      {/* Create Tour Button */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <SearchButton
          label={HERO_CONTENT.createTourButton}
          onClick={handleSubmit}
          isLoading={isLoading}
          style={{ padding: "16px 48px", minWidth: "200px" }}
        />
      </div>
    </div>
  );
}

export default PackageBuilderForm;
