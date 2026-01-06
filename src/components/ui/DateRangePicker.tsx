"use client";

// =============================================================================
// DATE RANGE PICKER COMPONENT
// Dual-month calendar picker with "Calendar" and "Flexible dates" tabs
// =============================================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colors, borderRadius, typography, transitions } from "@/styles/hero.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  initialCheckIn?: Date | null;
  initialCheckOut?: Date | null;
  position?: { top: number; left: number };
}

type FlexibleOption = "exact" | "1day" | "3days" | "7days";

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return date > start && date < end;
};

const isDateBeforeToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: colors.bgWhite,
  borderRadius: borderRadius.lg,
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  padding: "0",
  minWidth: "700px",
  maxWidth: "750px",
  overflow: "hidden",
  animation: "fadeIn 0.2s ease-out",
};

const tabContainerStyle: React.CSSProperties = {
  display: "flex",
  borderBottom: "1px solid #e5e7eb",
};

const tabStyle = (isActive: boolean): React.CSSProperties => ({
  flex: 1,
  padding: "16px 24px",
  fontSize: typography.sizes.lg,
  fontWeight: typography.weights.medium,
  color: isActive ? colors.primary : colors.textSecondary,
  backgroundColor: "transparent",
  border: "none",
  borderBottom: isActive ? `2px solid ${colors.primary}` : "2px solid transparent",
  cursor: "pointer",
  transition: `all ${transitions.fast}`,
});

const calendarsContainerStyle: React.CSSProperties = {
  display: "flex",
  padding: "20px 24px",
  gap: "32px",
};

const singleCalendarStyle: React.CSSProperties = {
  flex: 1,
};

const monthHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
};

const monthTitleStyle: React.CSSProperties = {
  fontSize: typography.sizes.lg,
  fontWeight: typography.weights.semibold,
  color: colors.textPrimary,
};

const navButtonStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  borderRadius: borderRadius.sm,
  color: colors.textSecondary,
  transition: `background-color ${transitions.fast}`,
};

const weekdaysStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
  marginBottom: "8px",
};

const weekdayStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: typography.sizes.sm,
  color: colors.textSecondary,
  padding: "8px 0",
  fontWeight: typography.weights.medium,
};

const daysGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
};

const dayStyle = (
  isSelected: boolean,
  isInRange: boolean,
  isToday: boolean,
  isDisabled: boolean,
  isStartDate: boolean,
  isEndDate: boolean
): React.CSSProperties => ({
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: typography.sizes.base,
  fontWeight: isSelected ? typography.weights.semibold : typography.weights.normal,
  color: isDisabled ? "#d1d5db" : isSelected ? colors.textWhite : colors.textPrimary,
  backgroundColor: isSelected ? colors.primary : isInRange ? "rgba(6, 182, 212, 0.1)" : "transparent",
  borderRadius: isStartDate ? "18px 0 0 18px" : isEndDate ? "0 18px 18px 0" : isSelected ? "50%" : "0",
  cursor: isDisabled ? "default" : "pointer",
  border: isToday && !isSelected ? `1px solid ${colors.primary}` : "none",
  transition: `all ${transitions.fast}`,
});

const flexibleOptionsStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  padding: "16px 24px",
  borderTop: "1px solid #e5e7eb",
};

const flexibleOptionStyle = (isActive: boolean): React.CSSProperties => ({
  padding: "10px 20px",
  fontSize: typography.sizes.base,
  fontWeight: typography.weights.medium,
  color: isActive ? colors.primary : colors.textSecondary,
  backgroundColor: "transparent",
  border: `1px solid ${isActive ? colors.primary : "#e5e7eb"}`,
  borderRadius: "20px",
  cursor: "pointer",
  transition: `all ${transitions.fast}`,
});

// -----------------------------------------------------------------------------
// Calendar Component
// -----------------------------------------------------------------------------

interface CalendarProps {
  year: number;
  month: number;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onDateClick: (date: Date) => void;
  showNavigation?: "left" | "right" | "none";
  onNavigate?: (direction: "prev" | "next") => void;
}

function Calendar({
  year,
  month,
  selectedStart,
  selectedEnd,
  onDateClick,
  showNavigation = "none",
  onNavigate,
}: CalendarProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const days: (number | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div style={singleCalendarStyle}>
      <div style={monthHeaderStyle}>
        {showNavigation === "left" ? (
          <button
            style={navButtonStyle}
            onClick={() => onNavigate?.("prev")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div style={{ width: "32px" }} />
        )}
        
        <span style={monthTitleStyle}>
          {MONTHS[month]} {year}
        </span>
        
        {showNavigation === "right" ? (
          <button
            style={navButtonStyle}
            onClick={() => onNavigate?.("next")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ChevronRight size={20} />
          </button>
        ) : (
          <div style={{ width: "32px" }} />
        )}
      </div>

      <div style={weekdaysStyle}>
        {DAYS.map((day, idx) => (
          <span key={idx} style={weekdayStyle}>
            {day}
          </span>
        ))}
      </div>

      <div style={daysGridStyle}>
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={idx} style={{ width: "36px", height: "36px" }} />;
          }

          const date = new Date(year, month, day);
          const isDisabled = isDateBeforeToday(date);
          const isSelectedStart = selectedStart ? isSameDay(date, selectedStart) : false;
          const isSelectedEnd = selectedEnd ? isSameDay(date, selectedEnd) : false;
          const isSelected = isSelectedStart || isSelectedEnd;
          const isInRange = isDateInRange(date, selectedStart, selectedEnd);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={idx}
              style={dayStyle(isSelected, isInRange, isToday, isDisabled, isSelectedStart, isSelectedEnd)}
              onClick={() => !isDisabled && onDateClick(date)}
              onMouseEnter={(e) => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isSelected && !isInRange) {
                  e.currentTarget.style.backgroundColor = "transparent";
                } else if (isInRange && !isSelected) {
                  e.currentTarget.style.backgroundColor = "rgba(6, 182, 212, 0.1)";
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function DateRangePicker({
  isOpen,
  onClose,
  onDateSelect,
  initialCheckIn = null,
  initialCheckOut = null,
}: DateRangePickerProps) {
  const [activeTab, setActiveTab] = useState<"calendar" | "flexible">("calendar");
  const [selectedStart, setSelectedStart] = useState<Date | null>(initialCheckIn);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(initialCheckOut);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [flexibleOption, setFlexibleOption] = useState<FlexibleOption>("exact");
  const containerRef = useRef<HTMLDivElement>(null);

  // Get next month
  const nextMonth = {
    year: currentMonth.month === 11 ? currentMonth.year + 1 : currentMonth.year,
    month: currentMonth.month === 11 ? 0 : currentMonth.month + 1,
  };

  // Handle navigation
  const handleNavigate = useCallback((direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      if (direction === "prev") {
        return {
          year: prev.month === 0 ? prev.year - 1 : prev.year,
          month: prev.month === 0 ? 11 : prev.month - 1,
        };
      } else {
        return {
          year: prev.month === 11 ? prev.year + 1 : prev.year,
          month: prev.month === 11 ? 0 : prev.month + 1,
        };
      }
    });
  }, []);

  // Handle date click
  const handleDateClick = useCallback((date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start new selection
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      // Complete selection
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  }, [selectedStart, selectedEnd]);

  // Apply selection and close
  useEffect(() => {
    if (selectedStart && selectedEnd) {
      onDateSelect(selectedStart, selectedEnd);
    }
  }, [selectedStart, selectedEnd, onDateSelect]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div ref={containerRef} style={containerStyle}>
        {/* Tabs */}
        <div style={tabContainerStyle}>
          <button
            style={tabStyle(activeTab === "calendar")}
            onClick={() => setActiveTab("calendar")}
          >
            Calendar
          </button>
          <button
            style={tabStyle(activeTab === "flexible")}
            onClick={() => setActiveTab("flexible")}
          >
            Flexible dates
          </button>
        </div>

        {/* Calendars */}
        <div style={calendarsContainerStyle}>
          <Calendar
            year={currentMonth.year}
            month={currentMonth.month}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onDateClick={handleDateClick}
            showNavigation="left"
            onNavigate={handleNavigate}
          />
          <Calendar
            year={nextMonth.year}
            month={nextMonth.month}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onDateClick={handleDateClick}
            showNavigation="right"
            onNavigate={handleNavigate}
          />
        </div>

        {/* Flexible Options */}
        <div style={flexibleOptionsStyle}>
          <button
            style={flexibleOptionStyle(flexibleOption === "exact")}
            onClick={() => setFlexibleOption("exact")}
          >
            Exact dates
          </button>
          <button
            style={flexibleOptionStyle(flexibleOption === "1day")}
            onClick={() => setFlexibleOption("1day")}
          >
            ± 1 day
          </button>
          <button
            style={flexibleOptionStyle(flexibleOption === "3days")}
            onClick={() => setFlexibleOption("3days")}
          >
            ± 3 days
          </button>
          <button
            style={flexibleOptionStyle(flexibleOption === "7days")}
            onClick={() => setFlexibleOption("7days")}
          >
            ± 7 days
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default DateRangePicker;
