import { Header, Footer, ContactHero, ContactFormSection, TrustedPartnerSection } from "@/components";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactFormSection />
        <TrustedPartnerSection />
      </main>
      <Footer />
    </>
  );
}
