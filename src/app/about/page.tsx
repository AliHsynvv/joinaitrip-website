import { Header, Footer, AboutHero, AboutContent } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | JoinAiTrip",
  description: "Learn more about JoinAiTrip, our mission to revolutionize travel with AI, and the passionate team behind your seamless journeys.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
