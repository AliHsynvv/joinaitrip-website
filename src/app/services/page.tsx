import { Header, Footer, ServicesHero, ServicesList } from "@/components";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
      </main>
      <Footer />
    </>
  );
}
