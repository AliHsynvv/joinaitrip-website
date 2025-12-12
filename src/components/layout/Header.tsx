"use client";

// =============================================================================
// HEADER - Main navigation header
// =============================================================================

import Link from "next/link";
import { Globe, Sun, Moon, Cloud, Menu, X } from "lucide-react";
import { useMobileMenu, useDarkMode, useWeather } from "@/hooks/useLayout";
import {
  NAV_LINKS,
  DEFAULT_LANGUAGE_CURRENCY,
  AUTH_LINKS,
} from "@/constants/layout.constants";
import {
  headerStyle,
  headerContainerStyle,
  headerInnerStyle,
  logoStyle,
  navLinkStyle,
  languageSelectorStyle,
  darkModeToggleStyle,
  darkModeToggleKnobStyle,
  weatherWidgetStyle,
  weatherTextStyle,
  loginButtonStyle,
  mobileMenuButtonStyle,
  mobileMenuOverlayStyle,
  mobileNavLinkStyle,
  mobileDividerStyle,
  mobileLoginButtonStyle,
  layoutColors,
} from "@/styles/layout.styles";

// -----------------------------------------------------------------------------
// Sub-Components
// -----------------------------------------------------------------------------

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  variant?: "desktop" | "mobile";
}

function DarkModeToggle({ isDarkMode, onToggle, variant = "desktop" }: DarkModeToggleProps) {
  if (variant === "mobile") {
    return (
      <button
        onClick={onToggle}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "9999px",
          backgroundColor: isDarkMode ? "#1e293b" : "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          padding: "2px",
          border: `1px solid ${layoutColors.borderWhiteLight}`,
          cursor: "pointer",
          position: "relative",
          transition: "background-color 0.3s",
        }}
        aria-label="Toggle dark mode"
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: isDarkMode ? layoutColors.toggleMoon : layoutColors.toggleSun,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s, background-color 0.3s",
            transform: isDarkMode ? "translateX(18px)" : "translateX(0)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {isDarkMode ? (
            <Moon style={{ width: "10px", height: "10px", color: "#ffffff" }} />
          ) : (
            <Sun style={{ width: "10px", height: "10px", color: "#ffffff" }} />
          )}
        </div>
      </button>
    );
  }

  return (
    <button onClick={onToggle} style={darkModeToggleStyle(isDarkMode)}>
      <div style={darkModeToggleKnobStyle(isDarkMode)}>
        <div
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            opacity: 0.4,
          }}
        />
      </div>
    </button>
  );
}

function WeatherWidget() {
  const { weather } = useWeather();

  return (
    <div style={weatherWidgetStyle}>
      <div style={{ position: "relative" }}>
        <Cloud
          style={{ width: "16px", height: "16px", color: "#60a5fa", fill: "#60a5fa" }}
        />
        <Sun
          style={{
            width: "10px",
            height: "10px",
            color: "#facc15",
            fill: "#facc15",
            position: "absolute",
            top: "-4px",
            right: "-4px",
          }}
        />
      </div>
      <span style={weatherTextStyle}>
        {weather.city} {weather.temperature}°{weather.unit}
      </span>
    </div>
  );
}

function LanguageSelector() {
  const { languageCode, currencyCode } = DEFAULT_LANGUAGE_CURRENCY;

  return (
    <button style={languageSelectorStyle}>
      <Globe style={{ width: "16px", height: "16px" }} />
      <span>
        {languageCode} • {currencyCode}
      </span>
    </button>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function Header() {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  return (
    <header style={headerStyle}>
      <div style={headerContainerStyle}>
        <div style={headerInnerStyle}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <span style={logoStyle}>JoinAiTrip</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="header-nav"
            style={{ alignItems: "center", gap: "32px", marginLeft: "auto", marginRight: "40px" }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} style={navLinkStyle}>
                {link.label}
              </Link>
            ))}
            <LanguageSelector />
          </nav>

          {/* Right Side Items - Desktop */}
          <div className="header-right" style={{ alignItems: "center", gap: "16px" }}>
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
            <WeatherWidget />
            <Link href={AUTH_LINKS.login.href} style={loginButtonStyle}>
              {AUTH_LINKS.login.label}
            </Link>
          </div>

          {/* Mobile Header Right */}
          <div className="mobile-header-right" style={{ alignItems: "center", gap: "12px" }}>
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} variant="mobile" />
            <button
              onClick={toggleMobileMenu}
              style={mobileMenuButtonStyle}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X style={{ width: "24px", height: "24px" }} />
              ) : (
                <Menu style={{ width: "24px", height: "24px" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={mobileMenuOverlayStyle}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={mobileNavLinkStyle}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}

              <div style={mobileDividerStyle} />

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: layoutColors.textWhite,
                  background: "transparent",
                  border: "none",
                  fontSize: "16px",
                }}
              >
                <Globe style={{ width: "18px", height: "18px" }} />
                <span>
                  {DEFAULT_LANGUAGE_CURRENCY.languageCode} •{" "}
                  {DEFAULT_LANGUAGE_CURRENCY.currencyCode}
                </span>
              </button>

              <Link
                href={AUTH_LINKS.login.href}
                style={mobileLoginButtonStyle}
                onClick={closeMobileMenu}
              >
                {AUTH_LINKS.login.label}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
