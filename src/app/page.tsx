import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  DiscoverSection, 
  RecommendedSection,
  TrendingSection,
  PopularSection,
  FeedbackSection,
  ContactSection,
  Footer
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DiscoverSection />
        <RecommendedSection />
        <TrendingSection />
        <PopularSection />
        <FeedbackSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
