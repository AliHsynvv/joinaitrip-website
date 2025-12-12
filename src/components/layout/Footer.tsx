"use client";

// =============================================================================
// FOOTER - Site footer with links and social icons
// =============================================================================

import Link from "next/link";
import {
  FOOTER_LOGO,
  SOCIAL_LINKS,
  FOOTER_COLUMNS,
} from "@/constants/layout.constants";
import {
  footerStyle,
  footerContainerStyle,
  footerTopStyle,
  footerLogoStyle,
  socialIconsStyle,
  socialIconLinkStyle,
  footerGridStyle,
  footerColumnTitleStyle,
  footerLinkStyle,
} from "@/styles/layout.styles";
import type { FooterColumn, SocialLink } from "@/types/layout.types";

// -----------------------------------------------------------------------------
// Sub-Components
// -----------------------------------------------------------------------------

interface SocialIconProps {
  link: SocialLink;
}

function SocialIcon({ link }: SocialIconProps) {
  const Icon = link.icon;

  return (
    <Link href={link.href} style={socialIconLinkStyle} aria-label={link.label}>
      <Icon size={28} strokeWidth={2} />
    </Link>
  );
}

interface FooterColumnComponentProps {
  column: FooterColumn;
}

function FooterColumnComponent({ column }: FooterColumnComponentProps) {
  return (
    <div>
      <h3 style={footerColumnTitleStyle}>{column.title}</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {column.links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} style={footerLinkStyle}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        {/* Top Section: Logo & Socials */}
        <div style={footerTopStyle}>
          {/* Logo */}
          <Link href={FOOTER_LOGO.href} style={{ textDecoration: "none" }}>
            <span style={footerLogoStyle}>{FOOTER_LOGO.text}</span>
          </Link>

          {/* Social Icons */}
          <div style={socialIconsStyle}>
            {SOCIAL_LINKS.map((link) => (
              <SocialIcon key={link.id} link={link} />
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div style={footerGridStyle}>
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumnComponent key={column.id} column={column} />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
