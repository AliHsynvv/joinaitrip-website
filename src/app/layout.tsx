import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JoinAiTrip | Planning your trip is now easier than ever",
  description:
    "All your travel options in one place – anytime, anywhere. AI-powered travel planning with Airen, your personal travel companion.",
  keywords: [
    "AI travel",
    "trip planner",
    "travel planning",
    "flight booking",
    "hotel booking",
    "tour packages",
    "travel assistant",
  ],
  authors: [{ name: "JoinAiTrip" }],
  openGraph: {
    title: "JoinAiTrip | Planning your trip is now easier than ever",
    description: "All your travel options in one place – anytime, anywhere.",
    type: "website",
    locale: "en_US",
    siteName: "JoinAiTrip",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
