"use client";

// =============================================================================
// AUTH LAYOUT - Shared layout for login and register pages
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import {
  authSectionStyle,
  authContainerStyle,
  authImageBoxStyle,
  authFormBoxStyle,
  authTitleStyle,
  authSubtitleStyle,
  authAlternateTextStyle,
  authLinkStyle,
} from "@/styles/auth.styles";
import type { AuthPageContent } from "@/types/auth.types";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface AuthLayoutProps {
  content: AuthPageContent;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AuthLayout({ content, children, footer }: AuthLayoutProps) {
  // Handle multi-line title
  const titleLines = content.title.split("\n");

  return (
    <section style={authSectionStyle}>
      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .auth-section {
            padding: 16px !important;
            align-items: flex-start !important;
          }

          .auth-container {
            gap: 32px !important;
            flex-direction: column;
          }

          .auth-image-box {
            width: 100% !important;
            max-width: 100% !important;
            height: 220px !important;
            min-width: unset !important;
            border-radius: 24px !important;
          }

          .auth-form-box {
            width: 100% !important;
            max-width: 100% !important;
            min-width: unset !important;
          }

          .auth-title {
            font-size: 24px !important;
          }
        }
      `}</style>

      <div className="auth-container" style={authContainerStyle}>
        {/* Left Image */}
        <div className="auth-image-box" style={authImageBoxStyle}>
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Right Form */}
        <div className="auth-form-box" style={authFormBoxStyle}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 className="auth-title" style={authTitleStyle}>
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p style={authSubtitleStyle}>{content.subtitle}</p>
          </div>

          {/* Form Content */}
          {children}

          {/* Alternate Link */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={authAlternateTextStyle}>
              {content.alternateText}{" "}
              <Link href={content.alternateLinkHref} style={authLinkStyle}>
                {content.alternateLinkText}
              </Link>
            </p>
          </div>

          {/* Optional Footer (for terms text) */}
          {footer && <div style={{ marginTop: "48px" }}>{footer}</div>}
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
