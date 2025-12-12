// =============================================================================
// USE LAYOUT HOOKS
// Mobile menu and dark mode state management
// =============================================================================

import { useState, useCallback, useEffect } from "react";

// -----------------------------------------------------------------------------
// Mobile Menu Hook
// -----------------------------------------------------------------------------

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    close,
    open,
  };
}

// -----------------------------------------------------------------------------
// Dark Mode Hook
// -----------------------------------------------------------------------------

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      const isDark = stored === "true";
      setIsDarkMode(isDark);
      updateDocumentClass(isDark);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      updateDocumentClass(prefersDark);
    }
  }, []);

  const updateDocumentClass = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggle = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", String(newValue));
      updateDocumentClass(newValue);
      return newValue;
    });
  }, []);

  const setDark = useCallback(() => {
    setIsDarkMode(true);
    localStorage.setItem("darkMode", "true");
    updateDocumentClass(true);
  }, []);

  const setLight = useCallback(() => {
    setIsDarkMode(false);
    localStorage.setItem("darkMode", "false");
    updateDocumentClass(false);
  }, []);

  return {
    isDarkMode,
    toggle,
    setDark,
    setLight,
  };
}

// -----------------------------------------------------------------------------
// Weather Hook (Placeholder for API integration)
// -----------------------------------------------------------------------------

import { DEFAULT_WEATHER } from "@/constants/layout.constants";
import type { WeatherData } from "@/types/layout.types";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/weather?city=${city || weather.city}`);
      // const data = await response.json();
      // setWeather(data);

      // For now, just return default
      await new Promise((resolve) => setTimeout(resolve, 500));
      setWeather(DEFAULT_WEATHER);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    isLoading,
    error,
    fetchWeather,
  };
}
